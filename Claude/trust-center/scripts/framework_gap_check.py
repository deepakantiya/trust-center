#!/usr/bin/env python3
"""
Framework gap scanner — reports status distribution across all framework assessment files.

Usage:
    python scripts/framework_gap_check.py [--all] [--framework <name>] [--format <text|csv|json>]

Frameworks:
    soc2         SOC 2 Type II  (controls/control-matrix.md)
    iso27001     ISO 27001:2022 (frameworks/iso-27001/annex-a-soa.md)
    iso21434     ISO/SAE 21434  (frameworks/iso-sae-21434/control-mapping.md)
    cmmc1        CMMC Level 1   (frameworks/cmmc/level-1-assessment.md)
    cmmc2        CMMC Level 2   (frameworks/cmmc/level-2-assessment.md)
"""

import argparse
import csv
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent

FRAMEWORK_FILES = {
    "soc2": REPO_ROOT / "controls" / "control-matrix.md",
    "iso27001": REPO_ROOT / "frameworks" / "iso-27001" / "annex-a-soa.md",
    "iso21434": REPO_ROOT / "frameworks" / "iso-sae-21434" / "control-mapping.md",
    "cmmc1": REPO_ROOT / "frameworks" / "cmmc" / "level-1-assessment.md",
    "cmmc2": REPO_ROOT / "frameworks" / "cmmc" / "level-2-assessment.md",
}

FRAMEWORK_LABELS = {
    "soc2": "SOC 2 Type II",
    "iso27001": "ISO 27001:2022",
    "iso21434": "ISO/SAE 21434:2021",
    "cmmc1": "CMMC Level 1",
    "cmmc2": "CMMC Level 2",
}

STATUS_PATTERNS = {
    "implemented": re.compile(r"✅"),
    "partial": re.compile(r"🟡"),
    "gap": re.compile(r"🔴"),
    "na": re.compile(r"⚪"),
}


@dataclass
class FrameworkReport:
    name: str
    label: str
    file: Path
    implemented: int = 0
    partial: int = 0
    gap: int = 0
    na: int = 0
    total: int = 0
    missing_file: bool = False
    gap_lines: list[str] = field(default_factory=list)
    partial_lines: list[str] = field(default_factory=list)

    @property
    def score(self) -> float:
        if self.total == 0:
            return 0.0
        return round(self.implemented / self.total * 100, 1)

    @property
    def actionable(self) -> int:
        return self.partial + self.gap


def scan_file(path: Path) -> dict[str, int | list]:
    counts = {k: 0 for k in STATUS_PATTERNS}
    gap_lines: list[str] = []
    partial_lines: list[str] = []

    if not path.exists():
        return {**counts, "missing": True, "gap_lines": [], "partial_lines": []}

    lines = path.read_text().splitlines()
    for line in lines:
        # Only count status symbols that appear in table rows (lines with |)
        if "|" not in line:
            continue
        for status, pattern in STATUS_PATTERNS.items():
            if pattern.search(line):
                counts[status] += 1
                if status == "gap":
                    gap_lines.append(line.strip())
                elif status == "partial":
                    partial_lines.append(line.strip())
                break  # one status per row

    return {**counts, "missing": False, "gap_lines": gap_lines, "partial_lines": partial_lines}


def build_report(name: str) -> FrameworkReport:
    path = FRAMEWORK_FILES[name]
    label = FRAMEWORK_LABELS[name]
    data = scan_file(path)

    report = FrameworkReport(name=name, label=label, file=path)
    if data.get("missing"):
        report.missing_file = True
        return report

    report.implemented = data["implemented"]
    report.partial = data["partial"]
    report.gap = data["gap"]
    report.na = data["na"]
    report.total = report.implemented + report.partial + report.gap
    report.gap_lines = data["gap_lines"]
    report.partial_lines = data["partial_lines"]
    return report


def render_bar(score: float, width: int = 20) -> str:
    filled = int(score / 100 * width)
    bar = "█" * filled + "░" * (width - filled)
    return f"[{bar}] {score:5.1f}%"


def print_text(reports: list[FrameworkReport], verbose: bool = False) -> None:
    print("\n═══════════════════════════════════════════════════════")
    print("  COMPLIANCE FRAMEWORK GAP REPORT")
    print("═══════════════════════════════════════════════════════\n")

    for r in reports:
        if r.missing_file:
            print(f"  ⚠  {r.label:<25}  FILE NOT FOUND: {r.file.relative_to(REPO_ROOT)}")
            continue

        bar = render_bar(r.score)
        status_icon = "✅" if r.gap == 0 and r.partial == 0 else ("🟡" if r.gap == 0 else "🔴")
        print(f"  {status_icon}  {r.label:<25}  {bar}")
        print(f"      ✅ {r.implemented:3d} implemented  "
              f"🟡 {r.partial:3d} partial  "
              f"🔴 {r.gap:3d} gap  "
              f"⚪ {r.na:3d} N/A  "
              f"(total: {r.total})")

        if verbose and (r.gap_lines or r.partial_lines):
            if r.gap_lines:
                print(f"\n      ── Gaps (🔴) ──")
                for line in r.gap_lines[:10]:
                    # Extract the control ID and description from the table row
                    cols = [c.strip() for c in line.split("|") if c.strip()]
                    summary = " | ".join(cols[:3]) if len(cols) >= 3 else line
                    print(f"         • {summary}")
                if len(r.gap_lines) > 10:
                    print(f"         ... and {len(r.gap_lines) - 10} more")

            if r.partial_lines:
                print(f"\n      ── Partial (🟡) ──")
                for line in r.partial_lines[:10]:
                    cols = [c.strip() for c in line.split("|") if c.strip()]
                    summary = " | ".join(cols[:3]) if len(cols) >= 3 else line
                    print(f"         • {summary}")
                if len(r.partial_lines) > 10:
                    print(f"         ... and {len(r.partial_lines) - 10} more")
        print()

    # Summary totals
    valid = [r for r in reports if not r.missing_file]
    if valid:
        total_actionable = sum(r.actionable for r in valid)
        total_gaps = sum(r.gap for r in valid)
        total_partial = sum(r.partial for r in valid)
        print("───────────────────────────────────────────────────────")
        print(f"  Total actionable items: {total_actionable}  "
              f"(🔴 {total_gaps} gaps · 🟡 {total_partial} partial)")
        if total_actionable > 0:
            print(f"\n  Run with --verbose to see specific controls.")
            print(f"  Open frameworks/cmmc/poam.md to track remediation.")
    print()


def print_csv(reports: list[FrameworkReport]) -> None:
    writer = csv.writer(sys.stdout)
    writer.writerow(["framework", "label", "implemented", "partial", "gap", "na", "total", "score_pct"])
    for r in reports:
        writer.writerow([r.name, r.label, r.implemented, r.partial, r.gap, r.na, r.total, r.score])


def print_json(reports: list[FrameworkReport]) -> None:
    data = []
    for r in reports:
        data.append({
            "framework": r.name,
            "label": r.label,
            "file": str(r.file.relative_to(REPO_ROOT)),
            "missing_file": r.missing_file,
            "implemented": r.implemented,
            "partial": r.partial,
            "gap": r.gap,
            "na": r.na,
            "total": r.total,
            "score_pct": r.score,
            "gap_controls": r.gap_lines,
            "partial_controls": r.partial_lines,
        })
    print(json.dumps(data, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Scan framework assessment files and report control gap status.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--all", action="store_true", help="Scan all frameworks")
    parser.add_argument(
        "--framework",
        choices=list(FRAMEWORK_FILES.keys()),
        help="Scan a specific framework",
    )
    parser.add_argument(
        "--format",
        choices=["text", "csv", "json"],
        default="text",
        help="Output format (default: text)",
    )
    parser.add_argument("--verbose", "-v", action="store_true", help="Show individual gap/partial controls")
    args = parser.parse_args()

    if not args.all and not args.framework:
        parser.print_help()
        sys.exit(1)

    names = list(FRAMEWORK_FILES.keys()) if args.all else [args.framework]
    reports = [build_report(name) for name in names]

    if args.format == "text":
        print_text(reports, verbose=args.verbose)
    elif args.format == "csv":
        print_csv(reports)
    elif args.format == "json":
        print_json(reports)

    # Exit 1 if any framework has gaps
    has_gaps = any(r.gap > 0 for r in reports if not r.missing_file)
    sys.exit(1 if has_gaps else 0)


if __name__ == "__main__":
    main()

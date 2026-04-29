#!/usr/bin/env python3
"""Evidence collection script (skeleton). Customize each section to your environment."""

import hashlib
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

EVIDENCE_DIR = Path(os.environ.get("EVIDENCE_DIR", "./evidence"))
now = datetime.now(timezone.utc)
quarter = (now.month - 1) // 3 + 1
PERIOD = os.environ.get("PERIOD", f"{now.year}-Q{quarter}")
TIMESTAMP = now.strftime("%Y%m%d_%H%M%S")
OUT = EVIDENCE_DIR / f"_collection_{PERIOD}_{TIMESTAMP}"
OUT.mkdir(parents=True, exist_ok=True)


def log(msg: str) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    print(f"[{ts}] {msg}")


def run(cmd: str, output_file: str | None = None, allow_fail: bool = False) -> subprocess.CompletedProcess:
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0 and not allow_fail:
        raise subprocess.CalledProcessError(result.returncode, cmd, result.stdout, result.stderr)
    if output_file:
        (OUT / output_file).write_text(result.stdout)
    return result


log(f"Collecting evidence into {OUT}")

# ----- Access Reviews -----
# Example: pull users + group memberships from your IdP via API
# run("okta-cli users list --json", "okta_users.json")
log("TODO: implement IdP user export")

# ----- Change Management -----
# Example: GitHub PRs merged to main with reviewers
# run(
#     "gh pr list --state merged --base main "
#     "--json number,author,reviews,mergedAt --limit 200",
#     "github_prs.json",
# )
log("TODO: implement code-host PR export")

# ----- Vulnerability Scans -----
# Example: dependency scan summary
# run(f"snyk test --json", f"snyk_{PERIOD}.json", allow_fail=True)
log("TODO: implement vulnerability scan export")

# ----- Backups -----
# Example: list recent successful snapshots
# run("aws ec2 describe-snapshots --owner-ids self ...", "aws_snapshots.json")
log("TODO: implement backup status export")

# ----- Logging Coverage -----
# Example: confirm CloudTrail enabled in all regions
# run("aws cloudtrail describe-trails", "aws_cloudtrail.json")
log("TODO: implement logging coverage export")

# ----- Hash & manifest -----
log("Generating manifest")
lines = []
for f in sorted(OUT.rglob("*")):
    if f.is_file() and f.name != "MANIFEST.sha256":
        digest = hashlib.sha256(f.read_bytes()).hexdigest()
        lines.append(f"{digest}  {f.relative_to(OUT)}")
(OUT / "MANIFEST.sha256").write_text("\n".join(lines) + "\n")

log("Done. Review and commit relevant non-sensitive outputs.")

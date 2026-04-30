# Trust Center

A public-facing Trust Center and internal GRC (Governance, Risk, and Compliance) repository covering **SOC 2 Type II**, **ISO 27001:2022**, **ISO/SAE 21434:2021**, and **CMMC Level 1 & 2** — with a unified cross-framework control map, assessment workbooks, and a static Trust Center website.

## Compliance Status

| Framework | Status | Coverage | Notes |
|---|---|---|---|
| **SOC 2 Type II** | 🟡 Audit in Progress | CC, A1, C1 in scope | Type II audit period active; report available under NDA |
| **ISO 27001:2022** | 🟡 Implementing | 87 / 93 controls (93.5%) | SoA complete; 6 partial gaps on track for certification |
| **ISO/SAE 21434:2021** | 🟡 Implementing | 22 / 49 requirements (45%) | TARA template and CSG register live; vehicle-level pen test Q4 |
| **CMMC Level 1** | 🟢 Self-Assessed | 16 / 17 practices (94%) | SPRS score submitted; 1 POA&M item (PE.1.136) |
| **CMMC Level 2** | 🟡 C3PAO Pending | 91 / 110 practices (83%) | No hard gaps; 13 partial items tracked in POA&M |
| **GDPR** | 🟢 Compliant | — | DPAs, DSR portal, DPIAs in place |
| **CCPA / CPRA** | 🟢 Compliant | — | DSR portal; data minimisation enforced |

---

## Repository Structure

```text
trust-center/
│
├── frameworks/                      # Per-framework onboarding and assessment workbooks
│   ├── README.md                    # Framework index and quick-start by role
│   ├── cross-framework-map.md       # Unified control map across all 5 frameworks
│   │
│   ├── iso-27001/
│   │   ├── annex-a-soa.md           # Statement of Applicability — all 93 Annex A controls
│   │   ├── isms-scope.md            # ISMS scope, context, interested parties
│   │   └── risk-treatment-plan.md   # Risk treatment plans linked to risk register
│   │
│   ├── iso-sae-21434/
│   │   ├── control-mapping.md       # Clause-by-clause mapping (Clauses 5–15)
│   │   ├── tara-template.md         # TARA template with damage scenarios and attack paths
│   │   └── cybersecurity-goals.md   # CSG register with claims and CAL levels
│   │
│   ├── soc2/
│   │   ├── type2-readiness.md       # Type I → Type II differences, timeline, exceptions
│   │   └── testing-procedures.md    # 11 internal test procedures with pass criteria
│   │
│   └── cmmc/
│       ├── level-1-assessment.md    # All 17 Level 1 practices (FAR 52.204-21)
│       ├── level-2-assessment.md    # All 110 Level 2 practices (NIST SP 800-171)
│       └── poam.md                  # Plan of Action & Milestones (multi-framework)
│
├── controls/
│   └── control-matrix.md            # SOC 2 TSC control matrix (CC1–CC9, A1, C1, PI1, P1-P8)
│
├── policies/                        # 11 information security policies
│   ├── information-security-policy.md
│   ├── access-control-policy.md
│   ├── acceptable-use-policy.md
│   ├── change-management-policy.md
│   ├── cryptography-policy.md
│   ├── data-classification-policy.md
│   ├── incident-response-policy.md
│   ├── business-continuity-policy.md
│   ├── risk-management-policy.md
│   ├── secure-development-policy.md
│   └── vendor-management-policy.md
│
├── risk-management/
│   └── risk-register.md             # Quarterly risk register
│
├── vendor-management/
│   └── vendor-register.md           # Tier 1 / Tier 2 vendor risk register
│
├── incident-response/
│   └── runbook-account-compromise.md
│
├── evidence/                        # Audit evidence (sensitive files gitignored)
│   └── README.md                    # Evidence naming conventions and folder structure
│
├── soc2/                            # SOC 2 TSC folder structure
│   ├── security/
│   ├── availability/
│   ├── confidentiality/
│   ├── processing-integrity/
│   └── privacy/
│
├── website/                         # Public Trust Center static site
│   ├── index.html                   # Main page (SOC 2, ISO 27001, CMMC, privacy)
│   ├── security.html                # Vulnerability disclosure policy
│   ├── subprocessors.html           # Subprocessor list
│   ├── css/styles.css
│   ├── js/site.js
│   └── .well-known/security.txt
│
├── scripts/                         # Python automation scripts
│   ├── collect_evidence.py          # Evidence collection skeleton
│   ├── init_and_push.py             # Git init and push helper
│   ├── pii_guard.py                 # PII pattern scanner (used in CI)
│   ├── policy_version_check.py      # Policy version field validator (used in CI)
│   └── framework_gap_check.py       # Multi-framework gap scanner (text / CSV / JSON)
│
├── docs/
│   └── auditor-guide.md
│
├── training/
└── .github/
    ├── workflows/
    │   └── compliance-checks.yml    # CI: markdown lint, link check, secret scan, PII guard
    ├── CODEOWNERS
    └── pull_request_template.md
```

---

## Quick Start

### Run the gap scanner

```bash
# All frameworks — text output
python3 scripts/framework_gap_check.py --all

# Single framework with control-level detail
python3 scripts/framework_gap_check.py --framework iso27001 --verbose

# Machine-readable output for dashboards
python3 scripts/framework_gap_check.py --all --format json > gap-report.json
```

Sample output:

```text
  ✅  SOC 2 Type II         [████████████████████] 100.0%   46 implemented
  🟡  ISO 27001:2022         [██████████████████░░]  92.6%   87 ✅  7 🟡
  🟡  ISO/SAE 21434:2021    [█████████░░░░░░░░░░░]  48.0%   24 ✅  26 🟡
  🟡  CMMC Level 1          [██████████████████░░]  94.1%   16 ✅  1 🟡
  🟡  CMMC Level 2          [██████████████████░░]  91.6%   87 ✅  8 🟡
```

### Preview the Trust Center website

```bash
cd website && python3 -m http.server 8080
# Open http://localhost:8080
```

The site shows framework status badges, per-framework progress bars, and a document request form for SOC 2 reports, ISO 27001 SoA, and CMMC assessment workbooks.

---

## Getting Started by Role

### GRC / Compliance Team

1. **Cross-framework map** — start at [`frameworks/cross-framework-map.md`](./frameworks/cross-framework-map.md) to identify shared controls and shared evidence opportunities.
2. **Active POA&M** — [`frameworks/cmmc/poam.md`](./frameworks/cmmc/poam.md) tracks all open gaps across all frameworks; review monthly.
3. **SOC 2 testing** — run the procedures in [`frameworks/soc2/testing-procedures.md`](./frameworks/soc2/testing-procedures.md) quarterly.
4. **Policies** — every policy in [`policies/`](./policies/) must be reviewed and approved annually.
5. **Risk register** — update [`risk-management/risk-register.md`](./risk-management/risk-register.md) at least quarterly.

### Engineering / Security

1. **Secure development** — [`policies/secure-development-policy.md`](./policies/secure-development-policy.md) and the SDLC checklist.
2. **Change management** — all production changes require evidence per [`policies/change-management-policy.md`](./policies/change-management-policy.md).
3. **Evidence collection** — run `python3 scripts/collect_evidence.py` quarterly; outputs land in `evidence/`.
4. **CI checks** — push triggers markdown lint, link check, secret scan (Gitleaks), PII guard, and policy version check automatically.

### Auditors / Assessors

- Start at [`docs/auditor-guide.md`](./docs/auditor-guide.md) for navigation, sample selection, and walkthroughs.
- Framework-specific assessment workbooks are in [`frameworks/<framework>/`](./frameworks/).
- Evidence artifacts are in [`evidence/`](./evidence/) — see naming conventions in [`evidence/README.md`](./evidence/README.md).

### Automotive / CMMC Teams (ISO/SAE 21434 / CMMC)

- **TARA** — use [`frameworks/iso-sae-21434/tara-template.md`](./frameworks/iso-sae-21434/tara-template.md) for each new item or programme.
- **Cybersecurity goals** — register new CSGs in [`frameworks/iso-sae-21434/cybersecurity-goals.md`](./frameworks/iso-sae-21434/cybersecurity-goals.md).
- **CMMC Level 1** — [`frameworks/cmmc/level-1-assessment.md`](./frameworks/cmmc/level-1-assessment.md) is the self-assessment workbook; re-run annually.
- **CMMC Level 2** — [`frameworks/cmmc/level-2-assessment.md`](./frameworks/cmmc/level-2-assessment.md) contains all 110 practices; keep current ahead of C3PAO engagement.

---

## CI / Automation

Every pull request runs:

| Check | Tool | Blocks merge? |
|---|---|---|
| Markdown lint | `markdownlint-cli2` | Yes |
| Link check | `lychee` | Warn only |
| Secret scan | `gitleaks` | Yes |
| PII guard | `scripts/pii_guard.py` | Yes |
| Policy version check | `scripts/policy_version_check.py` | Warn only |

---

## Contributing

This repository contains sensitive compliance information. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the branch and review process. All changes to policies, controls, and assessment workbooks require approval from the Security Officer / CISO.

## License

Internal use only — not licensed for external distribution unless explicitly published in `website/`.

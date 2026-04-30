# Evidence Repository

This directory holds artifacts that demonstrate controls operate as designed for the SOC 2 audit period. Evidence supports the [Control Matrix](../controls/control-matrix.md).

## ⚠️ Sensitivity

Some evidence contains personally identifiable information, security configurations, or other sensitive material. Treat per the [Data Classification Policy](../policies/data-classification-policy.md):

- **Public:** May be in the public Trust Center.
- **Internal/Confidential:** This repository — gated to authorized personnel.
- **Restricted (raw logs, forensics, customer data samples):** **NOT stored here.** Reference by location and access procedure only. See `.gitignore`.

## Folder Layout

```text
evidence/
├── access-reviews/          # Quarterly access review attestations
├── change-management/       # Sample PRs, CI runs, deploy logs (sampled)
├── training/                # Completion reports, course materials index
├── vulnerability-mgmt/      # Scan summaries, remediation evidence
├── pen-tests/               # Annual external pentest reports (often Restricted)
├── bcdr/                    # DR/restore test reports
├── incidents/               # Per-incident folder INC-YYYY-NNNN/
├── policies/                # Signed policy approvals, acknowledgments
├── access-provisioning/     # New hire / role change tickets (sampled)
└── monitoring/              # SIEM coverage, alert tuning records
```

## Naming Convention

`YYYY-MM-DD_<system>_<artifact-type>.<ext>`

Examples:
- `2026-01-15_okta_access-review-q4-2025.pdf`
- `2026-02-03_aws_cloudtrail-coverage-report.png`

## Sampling Approach for Audit

For populations (e.g., terminations, changes, new hires), sample sizes follow auditor guidance — typical:

| Population Size | Sample Size |
|---|:---:|
| 1–25 | 100% |
| 26–250 | 25 |
| 251–2,500 | 40 |
| > 2,500 | 60 |

Sampled items get the suffix `_sampled-NNN` to distinguish from full-population exports.

## Retention

Evidence is retained for the audit period **plus 7 years** (default) or per legal hold.

## What NOT to commit here

- Raw customer data
- Production secrets or credentials
- Unredacted PII
- Full pentest reports without sanitization (link to secure storage instead)

`.gitignore` excludes common sensitive patterns. Use `git secret` or external secure storage for the rest.

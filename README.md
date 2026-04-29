# Trust Center

A public-facing Trust Center and internal GRC (Governance, Risk, and Compliance) repository for managing SOC 2 compliance, security policies, controls, and evidence collection.

## Purpose

This repository serves two audiences:

1. **External (customers, auditors, prospects):** Demonstrates our security posture, compliance certifications, and trust commitments via the published Trust Center website.
2. **Internal (engineering, security, GRC teams):** Centralizes policies, control documentation, evidence artifacts, risk registers, and audit workpapers.

## Repository Structure

```
trust-center/
├── policies/                    # Information security policies
├── controls/                    # Control matrix and implementations
├── evidence/                    # Audit evidence (gitignored where sensitive)
├── soc2/                        # SOC 2 Trust Services Criteria mapping
│   ├── security/                # CC1-CC9 (Common Criteria)
│   ├── availability/            # A1.x
│   ├── confidentiality/         # C1.x
│   ├── processing-integrity/    # PI1.x
│   └── privacy/                 # P1-P8
├── risk-management/             # Risk register, treatment plans
├── vendor-management/           # Third-party risk assessments
├── incident-response/           # IR plans, runbooks, postmortems
├── training/                    # Security awareness materials
├── docs/                        # Internal documentation
├── website/                     # Public Trust Center static site
├── scripts/                     # Automation (evidence collection, etc.)
└── .github/workflows/           # CI/CD for compliance checks
```

## SOC 2 Trust Services Criteria (TSC)

This repository is structured around the AICPA's Trust Services Criteria:

| Category | Description | Required for SOC 2 Type 2 |
|----------|-------------|---------------------------|
| **Security (CC)** | Common Criteria — protection against unauthorized access | ✅ Required |
| **Availability (A)** | System availability for operation and use | Optional |
| **Confidentiality (C)** | Information designated as confidential is protected | Optional |
| **Processing Integrity (PI)** | System processing is complete, valid, accurate, timely | Optional |
| **Privacy (P)** | Personal information collection, use, retention, disclosure | Optional |

> **Note:** Security is mandatory for any SOC 2 report. The other four categories are included based on commitments to customers and the nature of services provided.

## Getting Started

### For GRC / Compliance Team

1. Review [`policies/`](./policies/) — every policy must be reviewed annually.
2. Maintain the [Control Matrix](./controls/control-matrix.md).
3. Update the [Risk Register](./risk-management/risk-register.md) quarterly.
4. Track evidence in [`evidence/`](./evidence/) — see naming conventions in [`evidence/README.md`](./evidence/README.md).

### For Engineering

1. Read the [Engineering Handbook](./docs/engineering-handbook.md) for security requirements.
2. All production changes require evidence per [Change Management Policy](./policies/change-management-policy.md).
3. Run `scripts/collect-evidence.sh` quarterly (or per CI schedule).

### For Auditors

See [`docs/auditor-guide.md`](./docs/auditor-guide.md) for navigating evidence, sample selections, and walkthroughs.

## Trust Center Website

The public-facing Trust Center is in [`website/`](./website/) and is published via GitHub Pages / your hosting platform.

```bash
# Preview locally
cd website && python3 -m http.server 8000
# Open http://localhost:8000
```

## Compliance Status

| Framework | Status | Last Audit | Next Review |
|-----------|--------|------------|-------------|
| SOC 2 Type 2 | 🟡 In Progress | TBD | TBD |
| ISO 27001 | ⚪ Planned | — | — |
| GDPR | 🟢 Compliant | Continuous | Quarterly |
| CCPA | 🟢 Compliant | Continuous | Quarterly |

## Contributing

This repository contains sensitive compliance information. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the review process. All changes to policies require approval from the Security Officer and CISO (or equivalent).

## License

Internal use only — not licensed for external distribution unless explicitly published in `website/`.

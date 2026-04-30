# Secure Software Development Policy

| Field | Value |
|---|---|
| **Owner** | VP Engineering + CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose
Embed security throughout the software development lifecycle (SDLC).

## 2. Requirements by Phase

### 2.1 Design
- Threat modeling for new services or major changes (STRIDE or equivalent).
- Privacy review for changes to personal data handling.
- Security review for changes touching authn/authz, encryption, payment, or admin surfaces.

### 2.2 Develop
- Coding standards published per language (no eval of untrusted input, parameterized queries, output encoding, etc.).
- Pre-commit hooks: secret scanning, linting.
- Developer training on OWASP Top 10 annually.

### 2.3 Build / CI
- **SAST** on every PR (e.g., Semgrep, CodeQL).
- **Dependency scanning** (e.g., Dependabot, Snyk) — Critical/High vulns block merge.
- **Container/IaC scanning** for production images.
- **Secret scanning** on every push.

### 2.4 Test
- Automated test suite must pass.
- Security regression tests for previously found vulnerabilities.
- DAST for production-bound builds (where applicable).

### 2.5 Deploy
- See [Change Management Policy](./change-management-policy.md).
- Production deploys via signed, automated pipelines.

### 2.6 Operate
- **Penetration test** annually by an external qualified firm. Findings tracked to closure with severity-based SLAs:
  - Critical: 7 days
  - High: 30 days
  - Medium: 90 days
  - Low: 180 days
- **Vulnerability management:**

| Severity (CVSS) | Internet-facing SLA | Internal SLA |
|---|---|---|
| Critical (9.0–10.0) | 7 days | 14 days |
| High (7.0–8.9) | 30 days | 60 days |
| Medium (4.0–6.9) | 90 days | 90 days |
| Low (< 4.0) | Best effort | Best effort |

- **Bug bounty / responsible disclosure** program at [`/website/security.html`](../website/security.html).

## 3. Environments
- Production, staging, development are logically separated.
- Production data is **not** copied to lower environments. Synthetic or anonymized data only.

## 4. SOC 2 Mapping
| Requirement | TSC |
|---|---|
| Secure SDLC | CC8.1 |
| Vulnerability management | CC7.1 |
| Penetration testing | CC4.1 |

## 4.1 NIST SP 800-53 Rev 5 Mapping

| Requirement | NIST 800-53 |
|---|---|
| System development life cycle | SA-3 |
| Security and privacy engineering principles | SA-8 |
| Developer testing and evaluation | SA-11 |
| Development process, standards, and tools | SA-15 |
| Flaw remediation | SI-2 |
| Vulnerability monitoring and scanning | RA-5 |
| Penetration testing | CA-8 |
| Configuration change control | CM-3 |

## 5. Revision History
| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

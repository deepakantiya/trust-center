# Risk Management Policy

| Field | Value |
|---|---|
| **Owner** | CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose
Establish a consistent process to identify, assess, treat, monitor, and communicate information security and privacy risks.

## 2. Scope
All information assets, business processes, third parties, and technologies in scope of the security program.

## 3. Process

### 3.1 Risk Identification
Sources: threat intelligence, vulnerability scans, penetration tests, audit findings, incident postmortems, change reviews, vendor assessments, business unit input.

### 3.2 Risk Assessment

**Likelihood × Impact = Inherent Risk**

| Scale | Likelihood | Impact |
|---|---|---|
| 1 — Very Low | < 5% / year | Negligible |
| 2 — Low | 5–25% | Minor: < $10k loss, no customer impact |
| 3 — Moderate | 25–50% | Moderate: < $100k, limited customer impact |
| 4 — High | 50–75% | Major: < $1M, multiple customers, regulatory notice |
| 5 — Critical | > 75% | Severe: > $1M, material breach, existential |

| Score | Tier | Treatment Required |
|---|---|---|
| 1–4 | Low | Accept or monitor |
| 5–9 | Moderate | Treat within 6 months |
| 10–16 | High | Treat within 90 days; CISO approval to accept |
| 17–25 | Critical | Treat immediately; CEO approval to accept |

### 3.3 Treatment Options
- **Mitigate** — implement controls
- **Transfer** — insurance, contractual
- **Avoid** — discontinue activity
- **Accept** — formal sign-off, time-bounded

### 3.4 Risk Register
Maintained in [`risk-management/risk-register.md`](../risk-management/risk-register.md). Updated on identification of new risks; reviewed quarterly.

### 3.5 Reporting
- Quarterly review with executive leadership.
- Top risks reported annually to the Board.
- Material risks reported to customers when contractually required.

## 4. SOC 2 Mapping
| Requirement | TSC |
|---|---|
| Risk identification | CC3.1, CC3.2 |
| Risk assessment | CC3.2, CC3.3 |
| Risk mitigation | CC3.4, CC9.1 |
| Vendor risk | CC9.2 |

## 4.1 NIST SP 800-53 Rev 5 Mapping

| Requirement | NIST 800-53 |
|---|---|
| Risk assessment policy and procedures | RA-1 |
| Security categorization | RA-2 |
| Risk assessment | RA-3 |
| Vulnerability monitoring and scanning | RA-5 |
| Risk response | RA-7 |
| Risk management strategy | PM-9 |
| Control assessments | CA-2 |
| Continuous monitoring | CA-7 |

## 5. Revision History
| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

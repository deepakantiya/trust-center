# Vendor / Third-Party Risk Management Policy

| Field | Value |
|---|---|
| **Owner** | CISO + Procurement |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose
Manage risks introduced by third parties (subprocessors, SaaS vendors, contractors) that access, store, process, or transmit Company or customer data.

## 2. Scope
Any vendor with access to: customer data, production systems, source code, employee PII, or critical business processes.

## 3. Lifecycle

### 3.1 Inherent Risk Tiering
| Tier | Criteria | Examples |
|---|---|---|
| **Critical** | Processes customer data at scale; cannot be replaced quickly | Cloud IaaS, primary database |
| **High** | Accesses customer data or prod systems | Auth provider, SIEM |
| **Medium** | Accesses internal systems / employee data | HRIS, payroll |
| **Low** | No sensitive data | Office supplies |

### 3.2 Due Diligence (Pre-Contract)
| Tier | Required Artifacts |
|---|---|
| Critical / High | SOC 2 Type 2 (or ISO 27001), pen test summary, DPA, security questionnaire, financial review, BCP/DR review |
| Medium | SOC 2 (any) or security questionnaire, DPA |
| Low | Standard contract review |

### 3.3 Contracting
All vendors handling Company data must have:
- A signed Data Processing Agreement (DPA) — for processors of personal data
- Security addendum aligned to our minimum requirements
- Right-to-audit clause (Critical/High)
- Breach notification clause (≤ 72 hours)
- Subprocessor disclosure obligation

### 3.4 Ongoing Monitoring
| Tier | Reassessment | Activities |
|---|---|---|
| Critical | Annually | Re-review SOC 2, monitor breach feeds, review subprocessor changes |
| High | Annually | Re-review SOC 2, security questionnaire updates |
| Medium | Every 2 years | Lightweight review |
| Low | At renewal | Contract check |

### 3.5 Termination / Offboarding
- Revoke access on Day 0 of contract end.
- Obtain attestation of data destruction.
- Update vendor inventory.

## 4. Subprocessors
A current list of subprocessors handling customer data is published at [`/website/subprocessors.html`](../website/subprocessors.html). Customers receive notice **30 days** before adding a new subprocessor.

## 5. SOC 2 Mapping
| Requirement | TSC |
|---|---|
| Vendor selection | CC9.2 |
| Vendor monitoring | CC9.2 |
| Vendor agreements | CC9.2 |

## 6. Revision History
| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

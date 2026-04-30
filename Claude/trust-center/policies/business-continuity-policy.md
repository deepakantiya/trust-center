# Business Continuity & Disaster Recovery Policy

| Field | Value |
|---|---|
| **Owner** | CTO + CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual; tested ≥ annually |
| **Version** | 1.0 |

## 1. Purpose
Ensure the Company can continue critical operations and recover systems within defined objectives following a disruption.

## 2. Objectives

| Tier | System Type | RTO | RPO |
|---|---|---|---|
| 1 | Customer-facing production services | ≤ 4 hours | ≤ 15 min |
| 2 | Internal critical systems (auth, code repos) | ≤ 8 hours | ≤ 1 hour |
| 3 | Supporting business systems | ≤ 24 hours | ≤ 24 hours |
| 4 | Non-critical | Best effort | ≤ 7 days |

> **RTO** = Recovery Time Objective; **RPO** = Recovery Point Objective.

## 3. Strategy
- **Resilience by design:** multi-AZ deployment for Tier 1; multi-region for critical components.
- **Backups:** automated, encrypted, tested. Retention per [Data Retention Schedule](./data-retention-schedule.md). Backups stored in a separate account/region.
- **Restore tests:** quarterly for Tier 1; annual for Tier 2.
- **Workforce continuity:** remote-capable workforce; documented succession for key roles.

## 4. Plan Components
1. Business Impact Analysis (BIA) — refreshed annually
2. DR runbooks per critical system in [`incident-response/runbooks/`](../incident-response/runbooks/)
3. Communications plan (employee, customer, vendor, regulator)
4. Crisis management team roster

## 5. Testing
| Test Type | Frequency | Scope |
|---|---|---|
| Backup restore | Quarterly | Sample restore of customer data backup |
| Tabletop | Annually | Executive scenario walkthrough |
| Functional / failover | Annually | Tier 1 region failover |
| Full simulation | Every 2 years | End-to-end |

Results stored in [`evidence/bcdr/`](../evidence/bcdr/). Gaps tracked in risk register.

## 6. SOC 2 Mapping
| Requirement | TSC |
|---|---|
| Backups | A1.2 |
| BCDR plan | A1.3, CC7.5 |
| Testing | A1.3 |

## 7. Revision History
| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

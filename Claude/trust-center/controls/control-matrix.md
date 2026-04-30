# SOC 2 Control Matrix

This matrix maps each AICPA Trust Services Criterion to the implemented control(s), the policy/process owner, the system(s) where it operates, and the evidence collected.

**Legend**
- **TSC** = Trust Services Criterion reference
- **Status:** ✅ Operating · 🟡 Partial · 🔴 Gap · ⚪ Not in scope
- **Frequency:** how often the control runs
- **Test type:** Inquiry (I), Observation (O), Inspection (Insp), Re-performance (R)

---

## Common Criteria — Security (CC)

### CC1 — Control Environment

| ID | Criterion | Control Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC1.1 | Demonstrates commitment to integrity and ethical values | Code of Conduct signed at hire and annually; whistleblower channel; disciplinary process | HR / Legal | ✅ | Signed acknowledgments; hotline reports |
| CC1.2 | Board exercises oversight | Board reviews security program ≥ annually; minutes documented | Board / CISO | ✅ | Board minutes |
| CC1.3 | Establishes structure, authority, responsibility | Org chart; documented role descriptions; CISO charter | CISO / HR | ✅ | Org chart; role docs |
| CC1.4 | Demonstrates commitment to competence | Background checks; annual security training; role-based training | HR / Security | ✅ | Training completion reports |
| CC1.5 | Enforces accountability | Performance reviews include security objectives; disciplinary actions documented | HR | ✅ | HR records |

### CC2 — Communication and Information

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC2.1 | Obtains/uses relevant, quality information | Threat intel feeds; vendor risk data; vulnerability scanners | Security | ✅ | Tooling configs; reports |
| CC2.2 | Communicates internally | Policies in central repo; quarterly all-hands security update; new-hire orientation | CISO | ✅ | Wiki, training records |
| CC2.3 | Communicates externally | Trust Center website; customer breach notification process; subprocessor list | CISO / Legal | ✅ | Website; DPA templates |

### CC3 — Risk Assessment

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC3.1 | Specifies objectives | Annual security objectives in OKRs | CISO | ✅ | OKR doc |
| CC3.2 | Identifies risks | Risk identification quarterly; ad-hoc on changes | Security | ✅ | Risk register |
| CC3.3 | Considers fraud | Fraud risk assessment included in risk process | CISO + Finance | ✅ | Risk register |
| CC3.4 | Identifies and assesses changes | Change risk assessment in CR process | Eng Leads | ✅ | PRs / CR records |

### CC4 — Monitoring Activities

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC4.1 | Selects/develops/performs evaluations | Quarterly internal control testing; annual external pen test; annual SOC 2 audit | GRC / CISO | ✅ | Test workpapers |
| CC4.2 | Communicates deficiencies | Findings tracked in JIRA; reviewed monthly with leadership | CISO | ✅ | Issue tracker |

### CC5 — Control Activities

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC5.1 | Selects/develops control activities | Control matrix maintained (this doc) | GRC | ✅ | This document |
| CC5.2 | Selects/develops technology controls | Documented in [`controls/technical-controls.md`](./technical-controls.md) | Security | ✅ | Tooling inventory |
| CC5.3 | Deploys controls through policies | Policy library; annual review/approval | CISO | ✅ | Policy approvals |

### CC6 — Logical and Physical Access

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC6.1 | Restricts logical access | SSO + MFA; RBAC; least privilege; encryption | Security / IT | ✅ | IdP config; access matrix |
| CC6.2 | Manages access provisioning/changes | Ticketed access requests; manager approval; quarterly access review | IT | ✅ | Tickets; review evidence |
| CC6.3 | Removes access | Offboarding within 24h; deprovisioning checklist | IT / HR | ✅ | Offboarding logs |
| CC6.4 | Restricts physical access | Badge access; visitor logs; data center via vendor SOC 2 | Facilities | ✅ | Badge logs |
| CC6.5 | Disposes of physical assets | Asset disposal procedure; certificates of destruction | IT | ✅ | Disposal records |
| CC6.6 | Protects against external threats | Firewall, WAF, DDoS protection, EDR | Security | ✅ | Tool configs |
| CC6.7 | Restricts data movement | DLP (where applicable); encryption in transit; data egress controls | Security | ✅ | DLP reports |
| CC6.8 | Prevents/detects malicious software | EDR on endpoints; container image scanning | Security | ✅ | EDR reports |

### CC7 — System Operations

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC7.1 | Detects vulnerabilities and anomalies | Continuous vuln scanning; SAST/DAST/SCA in CI; threat detection | Security | ✅ | Scan reports |
| CC7.2 | Monitors for security events | SIEM; centralized logging; alerting | Security | ✅ | SIEM dashboards |
| CC7.3 | Evaluates security events | Triage runbook; severity scoring | Security | ✅ | IR tickets |
| CC7.4 | Responds to incidents | IR plan tested annually; post-incident reviews | Security | ✅ | Postmortems |
| CC7.5 | Recovers from incidents | DR procedures; backup tested quarterly | Eng / Security | ✅ | DR test reports |

### CC8 — Change Management

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC8.1 | Authorizes/designs/develops/tests/approves/implements changes | Branch protection; peer review; CI; deployment pipeline | Engineering | ✅ | PR samples; CI logs |

### CC9 — Risk Mitigation

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC9.1 | Identifies/develops risk mitigation activities | Treatment plans in risk register; cyber insurance | CISO / Finance | ✅ | Insurance binder |
| CC9.2 | Assesses/manages vendors | Vendor due diligence; annual reassessment; subprocessor list | GRC / Procurement | ✅ | Vendor register |

---

## Availability (A)

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| A1.1 | Maintains/monitors availability | SLA monitoring; multi-AZ; status page | SRE | ✅ | Uptime reports |
| A1.2 | Authorizes/develops/tests recovery procedures | Backups encrypted, off-region, tested quarterly | SRE | ✅ | Restore test logs |
| A1.3 | Tests recovery plan | Annual DR exercise; tabletop | SRE / CISO | ✅ | DR exercise reports |

---

## Confidentiality (C)

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| C1.1 | Identifies/maintains confidential information | Data classification; data inventory | DPO | ✅ | Inventory |
| C1.2 | Disposes of confidential information | Retention schedule; cryptographic erasure | DPO | ✅ | Retention logs |

---

## Processing Integrity (PI) *(if in scope)*

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| PI1.1 | Definitions of processed data | Data dictionary; API contracts | Eng | ⚪ | TBD |
| PI1.2 | System inputs are complete/accurate | Input validation; schema enforcement | Eng | ⚪ | TBD |
| PI1.3 | Processing is complete/accurate | Reconciliation jobs; error queues | Eng | ⚪ | TBD |
| PI1.4 | Outputs are complete/accurate | Output validation; audit trails | Eng | ⚪ | TBD |
| PI1.5 | Stored info is complete/accurate | Database integrity checks | Eng | ⚪ | TBD |

---

## Privacy (P) *(if in scope)*

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| P1 | Notice | Privacy notice published | DPO / Legal | ✅ | Privacy page |
| P2 | Choice and consent | Cookie banner; consent records | DPO | ✅ | CMP logs |
| P3 | Collection | Data minimization in design reviews | DPO / Eng | ✅ | DPIAs |
| P4 | Use, retention, disposal | Retention schedule; auto-deletion | DPO | ✅ | Retention jobs |
| P5 | Access | DSR portal; verification | DPO | ✅ | DSR logs |
| P6 | Disclosure to third parties | Subprocessor list; DPAs | DPO / Legal | ✅ | Vendor register |
| P7 | Quality | Update mechanisms; data correction | DPO | ✅ | DSR logs |
| P8 | Monitoring and enforcement | Privacy audits; breach process | DPO | ✅ | Audit reports |

---

## Maintenance

- This matrix is reviewed at least quarterly and after any material change.
- Status changes from ✅ trigger a corrective action plan with owner and target date.
- The auditor uses this matrix as a starting point — actual testing requires evidence walk-throughs documented in [`evidence/`](../evidence/).

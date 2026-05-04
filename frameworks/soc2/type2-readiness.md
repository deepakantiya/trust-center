# SOC 2 Type II — Readiness Guide

| Field | Value |
|---|---|
| **Standard** | AICPA Trust Services Criteria (2017, updated 2022) |
| **Owner** | CISO / GRC Lead |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Annual (pre-audit) |
| **Related** | [`../../controls/control-matrix.md`](../../controls/control-matrix.md) |

---

## 1. Type I vs. Type II: What Changes

| Dimension | Type I | Type II |
|---|---|---|
| **Opinion covers** | Design of controls as of a specific date | Design *and* operating effectiveness over an audit period |
| **Audit period** | Point in time (one day) | 6–12 months (most auditors require ≥6 months) |
| **Testing** | Auditor inspects control design only | Auditor tests controls operated throughout the period (sampling) |
| **Evidence volume** | Moderate (policies, configurations) | High (tickets, logs, screenshots, access review records for each sample) |
| **Sampling** | Not applicable | Required — auditor selects samples from the population |

---

## 2. Trust Services Criteria to Trust Center Control Mapping

| TSC Category | Criteria | Trust Center Controls | Count |
|---|---|---|---|
| **CC — Security (Common Criteria)** | CC1–CC9 | OM-*, CM-*, AS-*, NS-*, VM-*, IR-*, RA-* | 47 |
| **A — Availability** | A1 | AV-01 to AV-04 | 4 |
| **C — Confidentiality** | C1 | CF-01 to CF-04 | 4 |
| **PI — Processing Integrity** | PI1 | (Scoped out — see exclusions) | 0 |
| **P — Privacy** | P1–P8 | CO-06 (Privacy Policy) | 1 |

---

## 3. Control Testing by Category

### Change Management (CC8)
| Control ID | Control | Sampling Approach |
|---|---|---|
| CM-01 | Segregation of Environments | Inspect architecture diagrams, network configs |
| CM-02 | Secure Development Policy | Review policy document and approval records |
| CM-03 | Production Data Use Restricted | Sample dev/staging environments for production data |
| CM-04 | Software Change Testing | Sample 25 deployments, verify test evidence |
| CM-05 | Baseline Configurations | Inspect configuration management tool |
| CM-06 | Configuration & Asset Management Policy | Review policy document |
| CM-07 | Approval for System Changes | Sample 25 change requests, verify approvals |
| CM-08 | Change Management Policy | Review policy document |

### Availability (A1)
| Control ID | Control | Sampling Approach |
|---|---|---|
| AV-01 | Testing BC/DR Plan | Review latest BC/DR test report |
| AV-02 | BC/DR Policy | Review policy document |
| AV-03 | Uptime & Availability Monitoring | Inspect monitoring dashboards, alert history |
| AV-04 | Backup Restoration Testing | Review restoration test report |

### Access Security (CC6)
| Control ID | Control | Sampling Approach |
|---|---|---|
| AS-01 | Admin Access Restricted | Sample admin user lists, verify justifications |
| AS-02 | Product Access Restricted | Review access key inventory |
| AS-03 | Removal of Access | Sample 25 terminations, verify access revoked |
| AS-04 | Encryption-at-Rest | Inspect encryption configurations |
| AS-05 | Asset Inventory | Review asset inventory document |
| AS-06 | User Access Reviews | Sample 2 quarterly access reviews |
| AS-07 | Least Privilege in Use | Sample 25 access requests, verify least privilege |
| AS-08 | Access Control & Termination Policy | Review policy document |
| AS-09 | Unique Access IDs | Inspect IdP user list for duplicates |
| AS-10 | Encryption & Key Management Policy | Review policy document |

### Incident Response (CC7)
| Control ID | Control | Sampling Approach |
|---|---|---|
| IR-01 | Tracking Security Incidents | Sample incident tickets |
| IR-02 | Lessons Learned | Review post-incident documentation |
| IR-03 | IR Plan Testing | Review IR test report |
| IR-04 | Incident Response Plan | Review IR plan document |

### Risk Assessment (CC3, CC9)
| Control ID | Control | Sampling Approach |
|---|---|---|
| RA-01 | Vendor Due Diligence Review | Sample 25 vendors, verify SOC 2 reports collected |
| RA-02 | Risk Assessment | Review annual risk assessment |
| RA-03 | Risk Assessment & Treatment Policy | Review policy document |
| RA-04 | Vendor Risk Assessment | Sample new vendor assessments |
| RA-05 | Risk Register | Review risk register |
| RA-06 | Vendor Risk Management Policy | Review policy document |

### Vulnerability Management (CC7)
| Control ID | Control | Sampling Approach |
|---|---|---|
| VM-01 | Vuln & Patch Management Policy | Review policy, sample patch tickets |
| VM-02 | Third-Party Penetration Test | Review pen test report and remediation tracking |

### Network Security (CC6, CC7)
| Control ID | Control | Sampling Approach |
|---|---|---|
| NS-01 | Network Security Policy | Review policy document |
| NS-02 | Endpoint Security | Review MDM/EDR compliance reports |
| NS-03 | Automated Alerting | Inspect alert configurations, test alerts |

### Organizational Management (CC1, CC4, CC5)
| Control ID | Control | Sampling Approach |
|---|---|---|
| OM-01 | Security Program Review | Review annual policy review records |
| OM-02 | Organizational Chart | Inspect current org chart |
| OM-03 | Performance Reviews | Sample HR records |
| OM-04 | New Hire Screening | Sample 25 hires, verify background checks |
| OM-05 | Disciplinary Action | Review policy |
| OM-06 | Performance Review Policy | Review policy |
| OM-07 | Cybersecurity Insurance | Review insurance certificate |
| OM-08 | Roles & Responsibilities | Review job descriptions, RACI |
| OM-09 | Information Security Policy | Review policy document |
| OM-10 | Acceptable Use Policy | Review policy and acknowledgements |
| OM-11 | Internal Control Policy | Review policy document |
| OM-12 | Code of Conduct | Review document and acknowledgements |

### Confidentiality (C1)
| Control ID | Control | Sampling Approach |
|---|---|---|
| CF-01 | Data Classification Policy | Review policy document |
| CF-02 | Disposal of Customer Data | Sample deletion requests |
| CF-03 | Data Retention & Disposal Policy | Review policy document |
| CF-04 | Customer Data Access Restricted | Sample access lists |

### Communications (CC2, P)
| Control ID | Control | Sampling Approach |
|---|---|---|
| CO-01 | Terms of Service | Verify ToS published |
| CO-02 | Communication of Critical Info | Review status page, communications |
| CO-03 | Confidential Reporting Channel | Verify channel exists |
| CO-04 | Security Commitments Communication | Verify security page |
| CO-05 | Description of Services | Verify service descriptions |
| CO-06 | Privacy Policy | Verify Privacy Policy published |

---

## 4. Evidence Folder Structure

```
evidence/
├── policies/                    # All policy documents
├── change-management/           # CM-01 to CM-08 evidence
├── availability/                # AV-01 to AV-04 evidence
├── access-security/             # AS-01 to AS-10 evidence
├── incident-response/           # IR-01 to IR-04 evidence
├── risk-assessment/             # RA-01 to RA-06 evidence
├── vulnerability-management/    # VM-01 to VM-02 evidence
├── network-security/            # NS-01 to NS-03 evidence
├── organizational-management/   # OM-01 to OM-12 evidence
├── confidentiality/             # CF-01 to CF-04 evidence
├── communications/              # CO-01 to CO-06 evidence
└── sampling-workpapers/         # Auditor sampling selections
```

---

## 5. Pre-Audit Checklist

- [ ] All 58 controls documented in control matrix
- [ ] Evidence folder structure populated
- [ ] Quarterly testing completed per [`testing-procedures.md`](testing-procedures.md)
- [ ] All policies reviewed within last 12 months
- [ ] Access reviews completed for audit period
- [ ] Penetration test completed within last 12 months
- [ ] BC/DR test completed within last 12 months
- [ ] Risk assessment completed within last 12 months

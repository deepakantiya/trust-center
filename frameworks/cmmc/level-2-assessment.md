# CMMC Level 2 — Assessment Workbook

| Field | Value |
|---|---|
| **Framework** | CMMC 2.0, Level 2 |
| **Basis** | NIST SP 800-171 Rev 2 (110 practices across 14 domains) |
| **Assessment Type** | Third-party C3PAO or annual self-assessment |
| **Owner** | CISO / GRC Lead |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Tri-annual (C3PAO) or Annual (self-assessment) |
| **Scope** | All systems processing CUI |

> Level 2 includes **all 17 Level 1 practices** plus **93 additional practices**. Reference [`level-1-assessment.md`](level-1-assessment.md) for Level 1.

**Legend:** ✅ MET · 🟡 Partial · 🔴 NOT MET · ⚪ N/A

---

## Trust Center Control Mapping by Domain

| Domain | CMMC Practices | Trust Center Controls |
|---|---|---|
| AC — Access Control | AC.2.* | AS-01 to AS-10 |
| AT — Awareness & Training | AT.2.* | OM-10, OM-12 |
| AU — Audit & Accountability | AU.2.* | NS-03 |
| CA — Assessment | CA.2.* | OM-01, VM-02 |
| CM — Configuration Mgmt | CM.2.* | CM-01 to CM-08, AS-05 |
| CP — Contingency Planning | CP.2.* | AV-01, AV-02, AV-04 |
| IA — Identification | IA.2.* | AS-02, AS-09 |
| IR — Incident Response | IR.2.* | IR-01 to IR-04, CO-02 |
| MA — Maintenance | MA.2.* | — |
| MP — Media Protection | MP.2.*, MP.3.* | CF-02, CF-03 |
| PS — Personnel Security | PS.2.* | OM-03 to OM-06 |
| PE — Physical Protection | PE.2.* | — |
| RA — Risk Assessment | RA.2.* | RA-02, RA-03, RA-05 |
| SA — System Acquisition | SA.3.* | CM-02, RA-06 |
| SC — System & Comm | SC.2.*, SC.3.* | AS-04, AS-10, NS-01, NS-02 |
| SI — System Integrity | SI.2.* | AV-03, NS-03, VM-01 |
| SR — Supply Chain | SR.2.* | RA-01, RA-04, RA-06 |

---

## Sample Level 2 Practices with Trust Center Mapping

### AC.2.006 — Limit Unsuccessful Logon Attempts
| Field | Detail |
|---|---|
| **Practice** | Limit unsuccessful logon attempts |
| **Trust Center Controls** | AS-08 (Access Control Policy), AS-09 (Unique Access IDs) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Account lockout configuration |

### AC.2.007 — Use Cryptographic Mechanisms for Remote Access
| Field | Detail |
|---|---|
| **Practice** | Use cryptographic mechanisms to protect confidentiality of remote access sessions |
| **Trust Center Controls** | AS-02 (Product Access Restricted), AS-10 (Encryption Policy) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | VPN/SSH configuration |

### AC.2.013 — User Access Reviews
| Field | Detail |
|---|---|
| **Practice** | Periodically review user privileges |
| **Trust Center Controls** | AS-06 (User Access Reviews) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Access review records |

### CM.2.061 — Baseline Configuration
| Field | Detail |
|---|---|
| **Practice** | Establish and maintain baseline configurations |
| **Trust Center Controls** | CM-05 (Baseline Configurations), AS-05 (Asset Inventory) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Configuration management tool |

### CM.2.062 — Security Configuration Enforcement
| Field | Detail |
|---|---|
| **Practice** | Employ the principle of least functionality |
| **Trust Center Controls** | CM-01 (Segregation), CM-03 (Prod Data Restricted), CM-04 (Testing), CM-07 (Approvals) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Hardening guides, security configs |

### IR.2.092 — Incident Response Capability
| Field | Detail |
|---|---|
| **Practice** | Establish operational incident-handling capability |
| **Trust Center Controls** | IR-02 (Lessons Learned), IR-04 (IR Plan), CO-02 (Communication) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | IR plan, incident records |

### IR.2.093 — Incident Tracking & Reporting
| Field | Detail |
|---|---|
| **Practice** | Track, document, and report incidents |
| **Trust Center Controls** | IR-01 (Tracking Incidents), IR-03 (IR Plan Testing), IR-04 (IR Plan) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Incident log, reporting procedures |

### RA.2.141 — Risk Assessments
| Field | Detail |
|---|---|
| **Practice** | Periodically assess organizational risk |
| **Trust Center Controls** | RA-02 (Risk Assessment), RA-03 (Risk Policy), RA-05 (Risk Register) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Risk assessment report |

### SI.2.214 — Monitor System Security Alerts
| Field | Detail |
|---|---|
| **Practice** | Monitor organizational systems |
| **Trust Center Controls** | VM-01 (Vuln Management) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Vulnerability scan reports |

### SR.2.137 — Supply Chain Risk Management
| Field | Detail |
|---|---|
| **Practice** | Develop supply chain risk management plan |
| **Trust Center Controls** | RA-01 (Vendor Due Diligence), RA-04 (Vendor Risk Assessment), RA-06 (Vendor Policy) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Vendor assessments, contracts |

---

## Assessment Summary

| Domain | Practices | Trust Center Coverage |
|---|---|---|
| AC | 22 | AS-01 to AS-10 |
| AT | 3 | OM-10, OM-12 |
| AU | 9 | NS-03 |
| CA | 4 | OM-01, VM-02 |
| CM | 9 | CM-01 to CM-08, AS-05 |
| CP | 3 | AV-01, AV-02, AV-04 |
| IA | 11 | AS-02, AS-09 |
| IR | 3 | IR-01 to IR-04, CO-02 |
| MA | 6 | — |
| MP | 7 | CF-02, CF-03 |
| PS | 5 | OM-03 to OM-06 |
| PE | 6 | — |
| RA | 3 | RA-02, RA-03, RA-05 |
| SA | 4 | CM-02, RA-06 |
| SC | 11 | AS-04, AS-10, NS-01, NS-02 |
| SI | 4 | AV-03, NS-03, VM-01 |
| **Total** | **110** | **Full Trust Center Coverage** |

---

## Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Assessor | | | |
| CISO | | | |
| Executive Sponsor | | | |

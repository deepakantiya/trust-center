# CMMC Level 1 — Self-Assessment Workbook

| Field | Value |
|---|---|
| **Framework** | CMMC 2.0, Level 1 |
| **Basis** | FAR 52.204-21 (17 practices across 6 domains) |
| **Assessment type** | Annual self-assessment (no C3PAO required) |
| **Owner** | CISO / GRC Lead |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Annual |
| **Scope** | All systems processing Federal Contract Information (FCI) |

> **Level 1 covers 17 practices** across 6 domains. All practices must be MET for compliance.

**Legend:** ✅ MET · 🟡 Partial · 🔴 NOT MET · ⚪ N/A

---

## Trust Center Control Mapping

| Domain | CMMC Practices | Trust Center Controls |
|---|---|---|
| AC — Access Control | AC.1.001–AC.1.004 | AS-01, AS-03, AS-06, AS-07, CF-04 |
| IA — Identification | IA.1.076–IA.1.077 | AS-09 |
| MP — Media Protection | MP.1.118 | CF-02, CF-03 |
| PE — Physical Protection | PE.1.131–PE.1.133 | — |
| SC — System & Comm | SC.1.175–SC.1.176 | AS-04, NS-01 |
| SI — System & Info Integrity | SI.1.210–SI.1.213 | VM-01, NS-03 |

---

## Domain AC — Access Control (4 practices)

### AC.1.001 — Limit System Access
| Field | Detail |
|---|---|
| **Practice** | Limit information system access to authorized users |
| **Trust Center Controls** | CF-04 (Customer Data Access Restricted), AS-06 (User Access Reviews) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Access control lists, IdP configuration |
| **Owner** | Security Team |

### AC.1.002 — Limit Access to Functions
| Field | Detail |
|---|---|
| **Practice** | Limit system access to the types of transactions and functions authorized users are permitted to execute |
| **Trust Center Controls** | AS-01 (Admin Access Restricted), AS-07 (Least Privilege) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | RBAC configuration, privilege matrices |
| **Owner** | Security Team |

### AC.1.003 — Verify External Connections
| Field | Detail |
|---|---|
| **Practice** | Verify and control connections to and use of external information systems |
| **Trust Center Controls** | NS-01 (Network Security Policy) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Network diagrams, firewall rules |
| **Owner** | DevOps Lead |

### AC.1.004 — Control Public Information
| Field | Detail |
|---|---|
| **Practice** | Control information posted to publicly accessible systems |
| **Trust Center Controls** | AS-03 (Removal of Access), AS-08 (Access Control Policy) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Content review process, approval records |
| **Owner** | Security Team |

---

## Domain IA — Identification & Authentication (2 practices)

### IA.1.076 — Identify Users
| Field | Detail |
|---|---|
| **Practice** | Identify information system users and processes acting on behalf of users |
| **Trust Center Controls** | AS-09 (Unique Access IDs) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | IdP user list, service account inventory |
| **Owner** | IT Manager |

### IA.1.077 — Authenticate Users
| Field | Detail |
|---|---|
| **Practice** | Authenticate identities of users before allowing access |
| **Trust Center Controls** | AS-09 (Unique Access IDs), AS-02 (Product Access Restricted) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Authentication logs, MFA configuration |
| **Owner** | Security Team |

---

## Domain MP — Media Protection (1 practice)

### MP.1.118 — Sanitize Media
| Field | Detail |
|---|---|
| **Practice** | Sanitize or destroy information system media before disposal or reuse |
| **Trust Center Controls** | CF-02 (Disposal of Customer Data), CF-03 (Data Retention Policy) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Media destruction certificates, disposal procedures |
| **Owner** | IT Manager |

---

## Domain PE — Physical Protection (3 practices)

### PE.1.131 — Limit Physical Access
| Field | Detail |
|---|---|
| **Practice** | Limit physical access to organizational systems, equipment, and operating environments |
| **Trust Center Controls** | (Physical controls — cloud provider responsibility) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Cloud provider SOC 2, physical security policy |
| **Owner** | IT Manager |

### PE.1.132 — Escort Visitors
| Field | Detail |
|---|---|
| **Practice** | Escort visitors and monitor visitor activity |
| **Trust Center Controls** | (Physical controls — cloud provider responsibility) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Visitor logs, escort procedures |
| **Owner** | IT Manager |

### PE.1.133 — Maintain Audit Logs
| Field | Detail |
|---|---|
| **Practice** | Maintain audit logs of physical access |
| **Trust Center Controls** | (Physical controls — cloud provider responsibility) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Access logs, badge reader reports |
| **Owner** | IT Manager |

---

## Domain SC — System & Communications Protection (2 practices)

### SC.1.175 — Monitor Communications
| Field | Detail |
|---|---|
| **Practice** | Monitor, control, and protect organizational communications at external boundaries and key internal boundaries |
| **Trust Center Controls** | NS-01 (Network Security Policy), NS-03 (Automated Alerting) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Network diagrams, firewall configurations |
| **Owner** | Security Team |

### SC.1.176 — Implement Subnetworks
| Field | Detail |
|---|---|
| **Practice** | Implement subnetworks for publicly accessible system components |
| **Trust Center Controls** | NS-01 (Network Security Policy), CM-01 (Segregation of Environments) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Network architecture, VPC/subnet configurations |
| **Owner** | DevOps Lead |

---

## Domain SI — System & Information Integrity (4 practices)

### SI.1.210 — Identify & Report Flaws
| Field | Detail |
|---|---|
| **Practice** | Identify, report, and correct information system flaws in a timely manner |
| **Trust Center Controls** | VM-01 (Vuln & Patch Management Policy) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Vulnerability scan reports, patch tickets |
| **Owner** | Security Team |

### SI.1.211 — Malicious Code Protection
| Field | Detail |
|---|---|
| **Practice** | Provide protection from malicious code at appropriate locations |
| **Trust Center Controls** | NS-02 (Endpoint Security) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | EDR/AV deployment reports |
| **Owner** | IT Manager |

### SI.1.212 — Update Malicious Code Protection
| Field | Detail |
|---|---|
| **Practice** | Update malicious code protection mechanisms when new releases are available |
| **Trust Center Controls** | NS-02 (Endpoint Security), VM-01 (Vuln & Patch Management) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Automatic update configuration, version reports |
| **Owner** | IT Manager |

### SI.1.213 — Perform System Scans
| Field | Detail |
|---|---|
| **Practice** | Perform periodic scans and real-time scans when files are downloaded, opened, or executed |
| **Trust Center Controls** | NS-02 (Endpoint Security), NS-03 (Automated Alerting) |
| **Status** | ⬜ MET / ⬜ NOT MET |
| **Evidence** | Scan schedules, scan reports |
| **Owner** | Security Team |

---

## Assessment Summary

| Domain | Practices | MET | NOT MET |
|---|---|---|---|
| AC — Access Control | 4 | ⬜ | ⬜ |
| IA — Identification | 2 | ⬜ | ⬜ |
| MP — Media Protection | 1 | ⬜ | ⬜ |
| PE — Physical Protection | 3 | ⬜ | ⬜ |
| SC — System & Comm | 2 | ⬜ | ⬜ |
| SI — System Integrity | 4 | ⬜ | ⬜ |
| **Total** | **17** | **⬜/17** | **⬜/17** |

---

## Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Assessor | | | |
| CISO | | | |
| Executive Sponsor | | | |

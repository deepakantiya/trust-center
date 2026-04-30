# NIST SP 800-53 Rev 5 — Control Mapping

Maps NIST SP 800-53 Revision 5 control families to all compliance frameworks covered in this Trust Center. Use this document to satisfy federal, FedRAMP, and enterprise customer requirements that reference 800-53, while reusing evidence already collected for SOC 2, ISO 27001, CMMC, and ISO/SAE 21434.

**Frameworks:** SOC 2 Type II · ISO 27001:2022 · ISO/SAE 21434:2021 · CMMC Level 1 · CMMC Level 2

**Legend:** ✅ covered · 🟡 partial · 🔴 gap · ⚪ N/A · — not required by this framework

---

## AC — Access Control

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| AC-1 | Policy and Procedures | CC5.3 | 5.15 | — | AC.1.001 | AC.1.001 |
| AC-2 | Account Management | CC6.2, CC6.3 | 5.16, 5.18 | 8.6 | AC.1.001 | AC.2.006, AC.2.013 |
| AC-3 | Access Enforcement | CC6.1 | 5.15, 8.3 | 8.6 | AC.1.002 | AC.1.002 |
| AC-4 | Information Flow Enforcement | CC6.7 | 8.20, 8.22 | 8.7 | SC.1.175 | SC.1.175 |
| AC-5 | Separation of Duties | CC6.1 | 5.3 | — | — | AC.2.006 |
| AC-6 | Least Privilege | CC6.1, CC6.2 | 8.2 | 8.6 | AC.1.001 | AC.2.006 |
| AC-11 | Device Lock | CC6.6 | 8.1 | — | — | AC.2.006 |
| AC-17 | Remote Access | CC6.6 | 6.7, 8.20 | — | — | AC.2.006 |
| AC-20 | Use of External Systems | CC9.2 | 5.19, 5.23 | 7.1 | — | SR.2.150 |

---

## AT — Awareness and Training

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| AT-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | AT.2.056 |
| AT-2 | Literacy Training and Awareness | CC1.4 | 6.3 | 5.4.2 | — | AT.2.056 |
| AT-3 | Role-Based Training | CC1.4 | 6.3 | 5.4.2 | — | AT.3.058 |
| AT-4 | Training Records | CC1.4 | 6.3 | 5.4.2 | — | AT.2.056 |

---

## AU — Audit and Accountability

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| AU-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | AU.2.041 |
| AU-2 | Event Logging | CC7.2 | 8.15 | — | — | AU.2.041 |
| AU-3 | Content of Audit Records | CC7.2 | 8.15 | — | — | AU.2.041 |
| AU-6 | Audit Record Review, Analysis, and Reporting | CC7.2, CC7.3 | 8.15, 8.17 | — | — | AU.2.042 |
| AU-8 | Time Stamps | CC7.2 | 8.17 | — | — | AU.2.042 |
| AU-9 | Protection of Audit Information | CC7.2 | 8.15 | — | — | AU.2.042 |
| AU-12 | Audit Record Generation | CC7.2 | 8.15 | — | — | AU.2.041 |

---

## CA — Assessment, Authorization, and Monitoring

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| CA-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | CA.2.157 |
| CA-2 | Control Assessments | CC4.1 | 5.35, 5.36 | 8.3 | — | CA.2.157 |
| CA-7 | Continuous Monitoring | CC4.1, CC7.2 | 5.35, 8.15 | 8.3 | — | CA.2.157 |
| CA-8 | Penetration Testing | CC4.1, CC7.1 | 8.29 | 11.1 | — | SA.3.072 |
| CA-9 | Internal System Connections | CC6.6 | 8.20 | 8.7 | SC.1.175 | SC.1.175 |

---

## CM — Configuration Management

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| CM-1 | Policy and Procedures | CC5.3 | 5.1, 8.1 | — | — | CM.2.061 |
| CM-2 | Baseline Configuration | CC5.2 | 8.9 | 10.4.2 | — | CM.2.061 |
| CM-3 | Configuration Change Control | CC8.1 | 8.32 | 9.3 | — | CM.3.068 |
| CM-6 | Configuration Settings | CC5.2 | 8.9 | — | — | CM.2.061 |
| CM-7 | Least Functionality | CC6.8 | 8.19 | — | — | CM.2.064 |
| CM-8 | System Component Inventory | CC5.2 | 5.9 | — | — | CM.2.061 |
| CM-10 | Software Usage Restrictions | CC6.8 | 5.10 | — | — | CM.2.064 |
| CM-11 | User-Installed Software | CC6.8 | 8.19 | — | — | CM.2.064 |

---

## CP — Contingency Planning

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| CP-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | RE.2.137 |
| CP-2 | Contingency Plan | A1.3 | 5.29, 5.30 | — | — | RE.2.137 |
| CP-4 | Contingency Plan Testing | A1.3 | 5.30 | — | — | RE.3.139 |
| CP-7 | Alternate Processing Site | A1.1 | 8.14 | — | — | — |
| CP-8 | Telecommunications Services | A1.1 | 7.11, 8.14 | — | — | — |
| CP-9 | System Backup | A1.2 | 8.13 | — | — | RE.2.137 |
| CP-10 | System Recovery and Reconstitution | A1.3, CC7.5 | 5.30 | — | — | RE.3.139 |

---

## IA — Identification and Authentication

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| IA-1 | Policy and Procedures | CC5.3 | 5.1 | — | IA.1.076 | IA.1.076 |
| IA-2 | Identification and Authentication (Org. Users) | CC6.1 | 5.17, 8.5 | 8.6 | IA.1.076 | IA.1.076, IA.3.083 |
| IA-4 | Identifier Management | CC6.1 | 5.16 | — | AC.1.002 | AC.1.002 |
| IA-5 | Authenticator Management | CC6.1 | 5.17 | — | IA.1.077 | IA.1.077 |
| IA-8 | Identification and Authentication (Non-Org. Users) | CC6.1 | 5.17 | — | — | IA.1.076 |

---

## IR — Incident Response

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| IR-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | IR.2.092 |
| IR-4 | Incident Handling | CC7.3, CC7.4 | 5.24, 5.26 | 15.5 | — | IR.2.092, IR.2.093 |
| IR-5 | Incident Monitoring | CC7.3 | 5.25 | 15.4 | — | IR.2.092 |
| IR-6 | Incident Reporting | CC7.3, CC2.3 | 5.24, 6.8 | 15.4 | — | IR.2.092 |
| IR-8 | Incident Response Plan | CC7.3 | 5.24 | 15.1 | — | IR.2.092 |

---

## MA — Maintenance

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| MA-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | — |
| MA-2 | Controlled Maintenance | A1.1 | 7.13 | 14.1 | — | — |
| MA-4 | Nonlocal Maintenance | CC6.6 | 7.13 | — | — | — |

---

## MP — Media Protection

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| MP-1 | Policy and Procedures | CC5.3 | 5.1 | — | MP.1.001 | MP.1.001 |
| MP-2 | Media Access | CC6.5 | 7.10 | — | MP.1.001 | MP.1.001 |
| MP-4 | Media Storage | CC6.5 | 7.10 | — | MP.1.001 | MP.1.001 |
| MP-5 | Media Transport | CC6.7 | 5.14 | — | — | MP.3.122 |
| MP-6 | Media Sanitization | CC6.5 | 7.14 | — | MP.1.001 | MP.1.001 |
| MP-7 | Media Use | CC6.5 | 5.10 | — | MP.1.001 | MP.1.001 |

---

## PE — Physical and Environmental Protection

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| PE-1 | Policy and Procedures | CC5.3 | 5.1 | — | PE.1.131 | PE.1.131 |
| PE-2 | Physical Access Authorizations | CC6.4 | 7.2 | — | PE.1.131 | PE.1.131 |
| PE-3 | Physical Access Control | CC6.4 | 7.2, 7.3 | — | PE.1.131 | PE.1.131 |
| PE-5 | Access Control for Output Devices | CC6.4 | 7.5, 7.7 | — | PE.1.131 | PE.2.135 |
| PE-6 | Monitoring Physical Access | CC6.4 | 7.4 | — | PE.1.131 | PE.1.131 |
| PE-9 | Power Equipment and Cabling | A1.1 | 7.11, 7.12 | — | — | — |
| PE-11 | Emergency Power | A1.1 | 7.11 | — | — | — |
| PE-13 | Fire Protection | CC6.4 | 7.8 | — | PE.1.131 | PE.1.131 |
| PE-17 | Alternate Work Site | CC6.6 | 6.7 | — | — | PE.2.135 |

---

## PL — Planning

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| PL-1 | Policy and Procedures | CC5.3 | 5.1 | 5.4.1 | — | CA.2.157 |
| PL-2 | System Security and Privacy Plans | CC5.1 | 6.1.3 | — | — | CA.2.157 |
| PL-4 | Rules of Behavior | CC5.3 | 5.10, 6.2 | — | — | AT.2.056 |
| PL-10 | Baseline Selection | CC5.2 | 8.9 | — | — | CM.2.061 |

---

## PM — Program Management

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| PM-1 | Information Security Program Plan | CC1.2, CC5.1 | 5.1, 5.2 | 5.4.1 | — | CA.2.157 |
| PM-2 | Information Security Program Leadership Roles | CC1.3 | 5.2 | 5.4.2 | — | CA.2.157 |
| PM-9 | Risk Management Strategy | CC3.2, CC9.1 | 6.1.2, 6.1.3 | 9.4 | — | RM.2.141 |
| PM-15 | Security and Privacy Groups and Associations | CC2.2 | 5.5, 5.6 | 5.4.4 | — | IR.2.092 |

---

## PS — Personnel Security

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| PS-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | PS.2.127 |
| PS-3 | Personnel Screening | CC1.4 | 6.1 | 5.4.2 | — | PS.2.127 |
| PS-4 | Personnel Termination | CC6.3 | 5.11, 6.5 | — | AC.1.001 | AC.1.001, PS.2.127 |
| PS-5 | Personnel Transfer | CC6.2 | 5.18 | — | — | AC.2.006 |
| PS-6 | Access Agreements | CC1.4 | 6.2, 6.6 | — | — | PS.2.127 |
| PS-7 | External Personnel Security | CC9.2 | 5.19, 5.20 | 7.1 | — | SR.2.150 |
| PS-8 | Personnel Sanctions | CC1.5 | 6.4 | — | — | PS.2.127 |

---

## PT — PII Processing and Transparency

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| PT-1 | Policy and Procedures | P1 | 5.34 | — | — | — |
| PT-2 | Authority to Process PII | P2 | 5.34 | — | — | — |
| PT-3 | Personally Identifiable Information Processing Purposes | P3 | 5.34 | — | — | — |
| PT-4 | Consent Management | P2 | 5.34 | — | — | — |
| PT-5 | Privacy Notice | P1 | 5.34 | — | — | — |

---

## RA — Risk Assessment

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| RA-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | RM.2.141 |
| RA-2 | Security Categorization | C1.1 | 5.12, 5.13 | — | — | MP.2.119 |
| RA-3 | Risk Assessment | CC3.2 | 6.1.2 | 9.4 | — | RM.2.141 |
| RA-5 | Vulnerability Monitoring and Scanning | CC7.1 | 8.8 | — | — | RM.2.141 |
| RA-7 | Risk Response | CC9.1 | 6.1.3 | 9.5 | — | RM.2.142 |
| RA-9 | Criticality Analysis | CC3.2 | 6.1.2 | 9.4 | — | RM.2.141 |

---

## SA — System and Services Acquisition

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| SA-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | SA.2.068 |
| SA-3 | System Development Life Cycle | CC8.1 | 8.25 | 10.4 | — | SA.2.068 |
| SA-5 | System Documentation | CC5.2 | 8.26 | — | — | — |
| SA-8 | Security and Privacy Engineering Principles | CC8.1 | 8.25, 8.26 | 10.4 | — | SA.2.068 |
| SA-9 | External System Services | CC9.2 | 5.19, 5.22 | 7.1, 7.4 | — | SR.2.150 |
| SA-10 | Developer Configuration Management | CC8.1 | 8.32 | 9.3 | — | CM.3.068 |
| SA-11 | Developer Testing and Evaluation | CC7.1, CC4.1 | 8.29 | 11.1 | — | SA.3.072 |
| SA-15 | Development Process, Standards, and Tools | CC8.1 | 8.25, 8.28 | 10.4.2 | — | SA.2.068 |

---

## SC — System and Communications Protection

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| SC-1 | Policy and Procedures | CC5.3 | 5.1 | — | SC.1.175 | SC.1.175 |
| SC-7 | Boundary Protection | CC6.6 | 8.20, 8.22 | 8.7 | SC.1.175 | SC.1.175 |
| SC-8 | Transmission Confidentiality and Integrity | CC6.7 | 8.24 | 8.9 | SC.1.175 | SC.1.175 |
| SC-12 | Cryptographic Key Establishment and Management | CC6.1 | 5.31 | 8.9 | — | SC.3.187 |
| SC-13 | Cryptographic Protection | CC6.1, CC6.7 | 5.31, 8.24 | 8.9 | — | SC.3.177 |
| SC-17 | Public Key Infrastructure Certificates | CC6.1 | 5.31 | — | — | SC.3.187 |
| SC-28 | Protection of Information at Rest | CC6.1 | 8.24 | 8.9 | — | SC.3.177 |
| SC-39 | Process Isolation | CC6.1 | 8.22 | 8.7 | SC.1.175 | SC.1.175 |

---

## SI — System and Information Integrity

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| SI-1 | Policy and Procedures | CC5.3 | 5.1 | — | SI.1.210 | SI.1.210 |
| SI-2 | Flaw Remediation | CC7.1 | 8.8 | 14.1 | SI.1.211 | SI.1.211 |
| SI-3 | Malicious Code Protection | CC6.8 | 8.7 | — | SI.1.210 | SI.1.210 |
| SI-4 | System Monitoring | CC7.2, CC7.3 | 8.15, 8.16 | — | — | AU.2.041 |
| SI-5 | Security Alerts, Advisories, and Directives | CC2.1, CC7.1 | 8.8 | — | — | RM.2.141 |
| SI-7 | Software, Firmware, and Information Integrity | CC7.1, CC8.1 | 8.8, 8.32 | — | — | SI.1.211 |
| SI-12 | Information Management and Retention | C1.2 | 5.33 | — | — | AU.2.042 |

---

## SR — Supply Chain Risk Management

| NIST 800-53 Control | Control Name | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|---|
| SR-1 | Policy and Procedures | CC5.3 | 5.1 | — | — | SR.2.150 |
| SR-2 | Supply Chain Risk Management Plan | CC9.2 | 5.21 | 7.1 | — | SR.2.150 |
| SR-3 | Supply Chain Controls and Processes | CC9.2 | 5.19, 5.21 | 7.1, 7.3 | — | SR.3.169 |
| SR-5 | Acquisition Strategies, Tools, and Methods | CC9.2 | 5.19 | 7.1 | — | SR.2.150 |
| SR-6 | Supplier Assessments and Reviews | CC9.2 | 5.22 | 7.4 | — | SR.2.150 |
| SR-8 | Notification Agreements | CC9.2 | 5.20 | 7.3 | — | SR.2.150 |

---

## Coverage Summary

| Control Family | Controls Mapped | SOC 2 Coverage | ISO 27001 Coverage | CMMC L2 Coverage |
|---|---|---|---|---|
| AC — Access Control | 9 | ✅ | ✅ | ✅ |
| AT — Awareness & Training | 4 | ✅ | ✅ | ✅ |
| AU — Audit & Accountability | 7 | ✅ | ✅ | ✅ |
| CA — Assessment, Auth, Monitoring | 5 | ✅ | ✅ | ✅ |
| CM — Configuration Management | 8 | ✅ | ✅ | ✅ |
| CP — Contingency Planning | 7 | ✅ | ✅ | 🟡 |
| IA — Identification & Authentication | 5 | ✅ | ✅ | ✅ |
| IR — Incident Response | 5 | ✅ | ✅ | ✅ |
| MA — Maintenance | 3 | 🟡 | ✅ | ⚪ |
| MP — Media Protection | 6 | ✅ | ✅ | ✅ |
| PE — Physical & Environmental | 9 | ✅ | ✅ | ✅ |
| PL — Planning | 4 | ✅ | ✅ | ✅ |
| PM — Program Management | 4 | ✅ | ✅ | ✅ |
| PS — Personnel Security | 7 | ✅ | ✅ | ✅ |
| PT — PII Processing & Transparency | 5 | ✅ | 🟡 | ⚪ |
| RA — Risk Assessment | 6 | ✅ | ✅ | ✅ |
| SA — System & Services Acquisition | 8 | ✅ | ✅ | ✅ |
| SC — System & Comms Protection | 8 | ✅ | ✅ | ✅ |
| SI — System & Information Integrity | 7 | ✅ | ✅ | ✅ |
| SR — Supply Chain Risk Mgmt | 6 | ✅ | ✅ | ✅ |

**Total controls mapped:** 122 across 20 control families

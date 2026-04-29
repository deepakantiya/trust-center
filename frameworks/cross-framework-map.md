# Cross-Framework Control Map

Maps every major control domain to specific requirements across all five frameworks. A single well-implemented control can satisfy multiple auditors — this map makes that explicit.

**Frameworks:** SOC 2 Type II · ISO 27001:2022 · ISO/SAE 21434:2021 · CMMC Level 1 · CMMC Level 2

**Legend:** ✅ covered · 🟡 partial · 🔴 gap · ⚪ N/A · — not required by this framework

---

## 1. Governance & Policy

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Information security policy published & approved | CC1.3, CC5.3 | 5.1 | 5.4.1 | — | CA.2.157 |
| Security roles & responsibilities defined | CC1.3 | 5.2 | 5.4.2 | — | CA.2.157 |
| Policy review cadence (≥ annual) | CC5.3 | 5.1 | 5.4.1 | — | CA.2.157 |
| Acceptable use policy | CC5.3 | 5.10 | — | — | AT.2.056 |
| Contact with authorities & special interest groups | CC2.2 | 5.5, 5.6 | 5.4.4 | — | IR.2.092 |

---

## 2. Human Resources & Training

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Background screening | CC1.4 | 6.1 | 5.4.2 | — | PS.2.127 |
| Security awareness training (annual) | CC1.4 | 6.3 | 5.4.2 | — | AT.2.056 |
| Role-based cybersecurity training | CC1.4 | 6.3 | 5.4.2 | — | AT.3.058 |
| Terms of employment including security responsibilities | CC1.4, CC1.5 | 6.2 | — | — | PS.2.127 |
| Disciplinary process | CC1.5 | 6.4 | — | — | PS.2.127 |
| Return of assets on termination | CC6.3 | 6.5 | — | — | MP.1.001 |
| Confidentiality / NDA agreements | CC1.4 | 6.6 | — | — | — |
| Remote working policy | CC6.6 | 6.7 | — | — | AC.2.006 |
| Reporting of information security events | CC7.3 | 6.8 | 15.4 | — | IR.2.092 |

---

## 3. Asset Management

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Inventory of information assets | CC5.2 | 5.9 | — | — | CM.2.061 |
| Acceptable use of assets | CC5.3 | 5.10 | — | — | AC.1.001 |
| Return of assets | CC6.3 | 5.11 | — | — | MP.1.001 |
| Data classification scheme | C1.1 | 5.12 | — | — | MP.2.119 |
| Labelling of information | C1.1 | 5.13 | — | — | MP.2.119 |
| Transfer of assets | CC6.7 | 5.14 | — | — | MP.3.122 |

---

## 4. Access Control

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Access control policy | CC6.1 | 5.15 | — | AC.1.001 | AC.1.001 |
| Identity management | CC6.1 | 5.16 | 8.6 | AC.1.002 | AC.1.002 |
| Authentication (MFA for privileged) | CC6.1 | 5.17, 8.5 | 8.6 | IA.1.076 | IA.1.076, IA.3.083 |
| Access rights management | CC6.2 | 5.18 | — | — | AC.2.006 |
| Privileged access management | CC6.1, CC6.2 | 8.2 | 8.6 | — | AC.2.006 |
| Secret authentication information (passwords) | CC6.1 | 5.17 | — | IA.1.077 | IA.1.077 |
| Access review (quarterly) | CC6.2 | 5.18 | — | — | AC.2.013 |
| Removal of access rights (offboarding ≤24h) | CC6.3 | 5.18 | — | AC.1.001 | AC.1.001 |
| Segregation of duties | CC6.1 | 5.3 | — | — | AC.2.006 |

---

## 5. Cryptography

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Cryptography policy | CC6.1, CC6.7 | 5.31 | 8.9 | — | SC.3.177 |
| Key management | CC6.1 | 5.31 | 8.9 | — | SC.3.187 |
| Encryption of data at rest | CC6.1 | 8.24 | 8.9 | — | SC.3.177 |
| Encryption of data in transit | CC6.7 | 8.24 | 8.9 | SC.1.175 | SC.1.175 |

---

## 6. Physical & Environmental Security

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Physical security perimeters | CC6.4 | 7.1 | — | PE.1.131 | PE.1.131 |
| Physical entry controls (badge/biometric) | CC6.4 | 7.2 | — | PE.1.131 | PE.1.131 |
| Protection of offices, rooms, facilities | CC6.4 | 7.3 | — | PE.1.131 | PE.1.132 |
| Monitoring physical access (CCTV/logs) | CC6.4 | 7.4 | — | PE.1.131 | PE.1.131 |
| Working in secure areas | CC6.4 | 7.5 | — | PE.1.131 | PE.1.131 |
| Clear desk / clear screen | CC6.4 | 7.7 | — | — | PE.2.135 |
| Equipment siting and protection | CC6.4 | 7.8 | — | PE.1.131 | PE.1.131 |
| Security of assets off-premises | CC6.5 | 7.9 | — | — | MP.1.001 |
| Storage media management | CC6.5 | 7.10 | — | MP.1.001 | MP.1.001 |
| Supporting utilities (UPS, HVAC) | A1.1 | 7.11 | — | — | — |
| Cabling security | A1.1 | 7.12 | — | — | — |
| Equipment maintenance | A1.1 | 7.13 | — | — | — |
| Secure disposal / repurposing of equipment | CC6.5 | 7.14 | — | MP.1.001 | MP.1.001 |

---

## 7. Operations Security

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Documented operating procedures | CC5.3 | 8.1 | — | — | CM.2.061 |
| Change management | CC8.1 | 8.32 | 9.3 | — | CM.3.068 |
| Capacity management | A1.1 | 8.6 | — | — | — |
| Separation of dev/test/prod | CC8.1 | 8.31 | 10.4.2 | — | CM.2.062 |
| Malware protection (EDR/AV) | CC6.8 | 8.7 | — | SI.1.210 | SI.1.210 |
| Vulnerability management (scanning ≤30 days) | CC7.1 | 8.8 | — | — | RM.2.141 |
| Patch management | CC7.1 | 8.8 | 14.1 | SI.1.211 | SI.1.211 |
| Audit logging (SIEM) | CC7.2 | 8.15, 8.17 | — | — | AU.2.041 |
| Log protection (immutable, ≥90 day retention) | CC7.2 | 8.15 | — | — | AU.2.042 |
| Clock synchronisation (NTP) | CC7.2 | 8.17 | — | — | AU.2.042 |
| Install controls (allowlisting / app control) | CC6.8 | 8.19 | — | — | CM.2.064 |
| Network management | CC6.6 | 8.20 | 8.7 | SC.1.175 | SC.1.175 |
| Web filtering | CC6.6 | 8.23 | — | — | SC.3.192 |
| Backup and restore (tested quarterly) | A1.2 | 8.13 | — | — | RE.2.137 |

---

## 8. Communications Security

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Network segregation | CC6.6 | 8.22 | 8.7 | SC.1.175 | SC.1.175 |
| Information transfer policies | CC6.7 | 5.14 | — | MP.3.122 | MP.3.122 |
| Confidentiality / NDA agreements | CC1.4 | 6.6 | — | — | — |
| Secure messaging / email controls | CC6.7 | 5.14, 8.24 | — | — | SC.3.177 |

---

## 9. System Acquisition, Development & Maintenance

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Secure development policy | CC8.1 | 8.25 | 10.4 | — | SA.2.068 |
| Security requirements in SDLC | CC8.1 | 8.26 | 9.1 | — | SA.2.068 |
| Secure coding practices | CC8.1 | 8.28 | 10.4.2 | — | SA.2.068 |
| Security testing (SAST/DAST/pen test) | CC7.1 | 8.29 | 11.1 | — | SA.3.072 |
| Security in DevOps | CC8.1 | 8.30 | 10.4.2 | — | SA.2.068 |
| System configuration standards (hardening) | CC5.2 | 8.9 | — | — | CM.2.061 |
| Deletion of test data | CC6.5 | 8.33 | — | — | MP.2.119 |

---

## 10. Supplier / Third-Party Risk

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Supplier security policy | CC9.2 | 5.19 | 7.1 | — | SR.2.150 |
| Security in supplier agreements | CC9.2 | 5.20 | 7.3 | — | SR.2.150 |
| ICT supply chain management | CC9.2 | 5.21 | 7.1 | — | SR.3.169 |
| Monitoring/review of supplier services | CC9.2 | 5.22 | 7.4 | — | SR.2.150 |
| Managing changes to supplier services | CC9.2, CC8.1 | 5.23 | 7.4 | — | SR.2.150 |

---

## 11. Incident Management

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Incident management plan / policy | CC7.3 | 5.24 | 15.1 | — | IR.2.092 |
| Detection and reporting of events | CC7.3 | 5.25, 6.8 | 15.4 | — | IR.2.092 |
| Assessment and decision on events | CC7.3 | 5.25 | 15.4 | — | IR.2.092 |
| Response to security incidents | CC7.4 | 5.26 | 15.5 | — | IR.2.093 |
| Learning from security incidents | CC7.4 | 5.27 | 15.6 | — | IR.2.093 |
| Collection of evidence (chain of custody) | CC7.4 | 5.28 | 15.5 | — | IR.3.098 |

---

## 12. Business Continuity & Resilience

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| ICT continuity planning | A1.3 | 5.29, 5.30 | — | — | RE.2.137 |
| Disaster recovery plan (tested annually) | A1.3 | 5.30 | — | — | RE.3.139 |
| Redundancy of infrastructure | A1.1 | 8.14 | — | — | — |

---

## 13. Risk Management

| Control | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Risk identification and assessment | CC3.2 | 6.1.2 | 9.4 (TARA) | — | RM.2.141 |
| Risk treatment | CC9.1 | 6.1.3 | 9.5 | — | RM.2.142 |
| Statement of Applicability | CC5.1 | 6.1.3d | — | — | — |
| Risk monitoring and review | CC4.1 | 8.2 | 8.3 | — | RM.2.141 |
| Compliance monitoring | CC4.1 | 5.35, 5.36 | 8.3 | — | CA.2.157 |

---

## 14. Automotive-Specific (ISO/SAE 21434 only)

| Control | ISO/SAE 21434 Clause | Nearest Cross-Framework Analog |
|---|---|---|
| Cybersecurity management system (CSMS) | 5.4 | ISO 27001 § 4–6 (ISMS) |
| Threat Analysis & Risk Assessment (TARA) | 9.4, 15.3 | ISO 27001 6.1.2; SOC 2 CC3.2 |
| Cybersecurity concept / goals | 9.5, 9.6 | ISO 27001 6.1.3; SOC 2 CC5.1 |
| Product development security requirements | 10.4 | ISO 27001 8.25–8.26; SOC 2 CC8.1 |
| Cybersecurity testing (vehicle level) | 11.1 | ISO 27001 8.29; SOC 2 CC7.1 |
| Post-production monitoring | 13.3 | ISO 27001 8.8; SOC 2 CC7.2 |
| End of cybersecurity support notification | 14.1 | ISO 27001 5.14 |
| Vulnerability disclosure for vehicles | 15.3 | ISO 27001 5.8; SOC 2 CC7.1 |

---

## Shared Evidence Register

The following evidence artifacts satisfy **multiple frameworks simultaneously**. Collect once, cite everywhere.

| Evidence Artifact | SOC 2 | ISO 27001 | ISO/SAE 21434 | CMMC L1 | CMMC L2 |
|---|---|---|---|---|---|
| Access review records (quarterly) | CC6.2 | 5.18 | — | — | AC.2.013 |
| Security awareness training completion | CC1.4 | 6.3 | 5.4.2 | — | AT.2.056 |
| Vulnerability scan reports | CC7.1 | 8.8 | — | — | RM.2.141 |
| Penetration test report (annual) | CC4.1, CC7.1 | 8.8, 8.29 | 11.1 | — | SA.3.072 |
| Incident response records / postmortems | CC7.4 | 5.24–5.27 | 15.5 | — | IR.2.093 |
| Backup / restore test logs | A1.2 | 8.13 | — | — | RE.2.137 |
| Vendor risk assessments | CC9.2 | 5.19–5.22 | 7.1–7.4 | — | SR.2.150 |
| Change management records (PRs, tickets) | CC8.1 | 8.32 | 9.3 | — | CM.3.068 |
| MFA / SSO configuration screenshots | CC6.1 | 8.5 | 8.6 | IA.1.076 | IA.1.076 |
| Risk register (quarterly updates) | CC3.2, CC9.1 | 6.1.2 | 9.4 (TARA) | — | RM.2.141 |
| DR exercise reports | A1.3 | 5.30 | — | — | RE.3.139 |
| Policy approval records (signed) | CC5.3 | 5.1 | 5.4.1 | — | CA.2.157 |

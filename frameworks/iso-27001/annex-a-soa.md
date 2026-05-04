# ISO 27001:2022 — Statement of Applicability (SoA)

| Field | Value |
|---|---|
| **Standard** | ISO/IEC 27001:2022 |
| **Owner** | CISO |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Annual |
| **Scope** | See [`isms-scope.md`](isms-scope.md) |

**Legend**
- **Status:** ✅ Implemented · 🟡 Partial · 🔴 Gap · ⚪ Excluded
- Trust Center controls are mapped to show implementation evidence

---

## 5. Organizational Controls

| ID | Control | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 5.1 | Policies for information security | ✅ | OM-09 | Information Security Policy |
| 5.2 | Information security roles | ✅ | OM-02, OM-08 | Org chart, RACI matrix |
| 5.3 | Segregation of duties | ✅ | AS-01, AS-07 | RBAC matrix |
| 5.4 | Management responsibilities | ✅ | OM-12 | Code of Conduct |
| 5.5 | Contact with authorities | ✅ | CO-02, CO-03 | Contact list, reporting channel |
| 5.6 | Contact with special interest groups | ✅ | OM-01 | Security program review |
| 5.7 | Threat intelligence | ✅ | RA-03 | Risk Assessment Policy |
| 5.8 | Information security in project management | ✅ | CM-02 | Secure Development Policy |
| 5.9 | Inventory of assets | ✅ | AS-05, CM-06 | Asset inventory |
| 5.10 | Acceptable use of assets | ✅ | OM-10 | Acceptable Use Policy |
| 5.11 | Return of assets | ✅ | AS-08 | Access Control Policy |
| 5.12 | Classification of information | ✅ | CF-01 | Data Classification Policy |
| 5.13 | Labelling of information | 🟡 | CF-01 | Classification procedures |
| 5.14 | Information transfer | ✅ | NS-01 | Network Security Policy |
| 5.15 | Access control | ✅ | AS-01, AS-07, CF-04 | Access policies |
| 5.16 | Identity management | ✅ | AS-09 | IdP configuration |
| 5.17 | Authentication information | ✅ | AS-02 | Authentication procedures |
| 5.18 | Access rights | ✅ | AS-03, AS-06 | Access reviews |
| 5.19 | Information security in supplier relationships | ✅ | RA-01, RA-06 | Vendor policies |
| 5.20 | Addressing information security within supplier agreements | ✅ | RA-06 | Contract templates |
| 5.21 | Managing information security in the ICT supply chain | ✅ | RA-04 | Vendor assessments |
| 5.22 | Monitoring, review and change management of supplier services | ✅ | RA-01 | Vendor due diligence |
| 5.23 | Information security for use of cloud services | ✅ | RA-04 | Cloud vendor assessments |
| 5.24 | Information security incident management planning and preparation | ✅ | IR-04 | Incident Response Plan |
| 5.25 | Assessment and decision on information security events | ✅ | IR-01 | Incident tracking procedures |
| 5.26 | Response to information security incidents | ✅ | IR-01, IR-04 | IR procedures |
| 5.27 | Learning from information security incidents | ✅ | IR-02 | Lessons learned process |
| 5.28 | Collection of evidence | ✅ | IR-01 | Evidence procedures |
| 5.29 | Information security during disruption | ✅ | AV-02 | BC/DR Policy |
| 5.30 | ICT readiness for business continuity | ✅ | AV-01 | BC/DR testing |
| 5.31 | Legal, statutory, regulatory and contractual requirements | ✅ | OM-11 | Compliance matrix |
| 5.32 | Intellectual property rights | ✅ | OM-09 | IP procedures |
| 5.33 | Protection of records | ✅ | CF-03 | Data Retention Policy |
| 5.34 | Privacy and protection of PII | ✅ | CO-06 | Privacy Policy |
| 5.35 | Independent review of information security | ✅ | OM-01, VM-02 | Audits, pen tests |
| 5.36 | Compliance with policies, rules and standards | ✅ | OM-01 | Compliance monitoring |
| 5.37 | Documented operating procedures | ✅ | CM-08 | Change Management Policy |

---

## 6. People Controls

| ID | Control | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 6.1 | Screening | ✅ | OM-04 | Background check procedures |
| 6.2 | Terms and conditions of employment | ✅ | OM-04 | Employment agreements |
| 6.3 | Information security awareness, education and training | ✅ | OM-10 | Training records |
| 6.4 | Disciplinary process | ✅ | OM-05 | Disciplinary policy |
| 6.5 | Responsibilities after termination or change of employment | ✅ | AS-03 | Offboarding procedures |
| 6.6 | Confidentiality or non-disclosure agreements | ✅ | OM-04 | NDA templates |
| 6.7 | Remote working | ✅ | AS-02 | Remote access policy |
| 6.8 | Information security event reporting | ✅ | IR-01 | Reporting procedures |

---

## 7. Physical Controls

| ID | Control | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 7.1 | Physical security perimeters | ✅ | — | Cloud provider SOC 2 |
| 7.2 | Physical entry | ✅ | — | Cloud provider SOC 2 |
| 7.3 | Securing offices, rooms and facilities | ✅ | — | Cloud provider SOC 2 |
| 7.4 | Physical security monitoring | ✅ | — | Cloud provider SOC 2 |
| 7.5 | Protecting against physical and environmental threats | ✅ | — | Cloud provider SOC 2 |
| 7.6 | Working in secure areas | ✅ | — | Cloud provider SOC 2 |
| 7.7 | Clear desk and clear screen | ✅ | NS-02 | Endpoint policy |
| 7.8 | Equipment siting and protection | ✅ | — | Cloud provider SOC 2 |
| 7.9 | Security of assets off-premises | ✅ | NS-02 | Endpoint encryption |
| 7.10 | Storage media | ✅ | CF-02, CF-03 | Media handling |
| 7.11 | Supporting utilities | ✅ | — | Cloud provider SOC 2 |
| 7.12 | Cabling security | ✅ | — | Cloud provider SOC 2 |
| 7.13 | Equipment maintenance | ✅ | — | Cloud provider SOC 2 |
| 7.14 | Secure disposal or re-use of equipment | ✅ | CF-02 | Disposal procedures |

---

## 8. Technological Controls

| ID | Control | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 8.1 | User endpoint devices | ✅ | NS-02 | Endpoint Security |
| 8.2 | Privileged access rights | ✅ | AS-01 | Admin access controls |
| 8.3 | Information access restriction | ✅ | AS-02, CF-04 | Access matrices |
| 8.4 | Access to source code | ✅ | CM-01, CM-02 | Repository access |
| 8.5 | Secure authentication | ✅ | AS-09 | Authentication config |
| 8.6 | Capacity management | ✅ | AV-03 | Monitoring dashboards |
| 8.7 | Protection against malware | ✅ | NS-02 | EDR deployment |
| 8.8 | Management of technical vulnerabilities | ✅ | VM-01, VM-02 | Vuln management |
| 8.9 | Configuration management | ✅ | CM-05 | Baseline configurations |
| 8.10 | Information deletion | ✅ | CF-02, CF-03 | Deletion procedures |
| 8.11 | Data masking | ✅ | CM-03 | Production data policy |
| 8.12 | Data leakage prevention | ✅ | CF-04 | DLP controls |
| 8.13 | Information backup | ✅ | AV-04 | Backup procedures |
| 8.14 | Redundancy of information processing facilities | ✅ | AV-02, AV-03 | HA architecture |
| 8.15 | Logging | ✅ | NS-03 | Logging configuration |
| 8.16 | Monitoring activities | ✅ | AV-03, NS-03 | Monitoring tools |
| 8.17 | Clock synchronization | ✅ | — | NTP configuration |
| 8.18 | Use of privileged utility programs | ✅ | AS-01 | Privileged access |
| 8.19 | Installation of software on operational systems | ✅ | CM-04, CM-07 | Change management |
| 8.20 | Networks security | ✅ | NS-01 | Network security |
| 8.21 | Security of network services | ✅ | NS-01 | Network controls |
| 8.22 | Segregation of networks | ✅ | CM-01 | Network segmentation |
| 8.23 | Web filtering | ✅ | NS-01 | Web filters |
| 8.24 | Use of cryptography | ✅ | AS-04, AS-10 | Encryption policies |
| 8.25 | Secure development life cycle | ✅ | CM-02 | SDLC procedures |
| 8.26 | Application security requirements | ✅ | CM-02 | Security requirements |
| 8.27 | Secure system architecture and engineering principles | ✅ | CM-05 | Architecture docs |
| 8.28 | Secure coding | ✅ | CM-02 | Coding standards |
| 8.29 | Security testing in development and acceptance | ✅ | CM-04 | Testing procedures |
| 8.30 | Outsourced development | ✅ | RA-04, RA-06 | Vendor assessments |
| 8.31 | Separation of development, test and production environments | ✅ | CM-01 | Environment separation |
| 8.32 | Change management | ✅ | CM-07, CM-08 | Change procedures |
| 8.33 | Test information | ✅ | CM-03 | Test data policy |
| 8.34 | Protection of information systems during audit testing | ✅ | VM-02 | Audit procedures |

---

## Summary

| Section | Controls | Implemented | Partial | Gap |
|---|---|---|---|---|
| 5. Organizational | 37 | 36 | 1 | 0 |
| 6. People | 8 | 8 | 0 | 0 |
| 7. Physical | 14 | 14 | 0 | 0 |
| 8. Technological | 34 | 34 | 0 | 0 |
| **Total** | **93** | **92** | **1** | **0** |

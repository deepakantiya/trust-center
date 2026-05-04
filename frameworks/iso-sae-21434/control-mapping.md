# ISO/SAE 21434:2021 — Cybersecurity Control Mapping

| Field | Value |
|---|---|
| **Standard** | ISO/SAE 21434:2021 — Road vehicles: Cybersecurity engineering |
| **Owner** | Cybersecurity Manager / CISO |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Annual |
| **Applicability** | OEM, Tier 1 / Tier 2 suppliers developing vehicle components with cybersecurity relevance |

**Legend:** ✅ Implemented · 🟡 Partial · 🔴 Gap · ⚪ Not in scope

---

## Trust Center Control Mapping

| ISO/SAE 21434 Clause | Trust Center Controls | Description |
|---|---|---|
| 5.4.1 | OM-09 | Cybersecurity policy |
| 5.4.2 | OM-02, OM-08 | Roles and responsibilities |
| 5.4.4 | CO-02 | Communication with authorities |
| 5.4.5 | AS-05, CM-06 | Asset management |
| 6.4.1 | RA-06 | Supplier policy |
| 6.4.2 | RA-01, RA-04 | Supplier assessments |
| 7.4.2 | CM-01 | Development environment |
| 7.4.3 | CM-05 | Configuration management |
| 7.4.4 | CM-04 | Testing |
| 7.4.5 | CM-07 | Change approval |
| 8.3 | CF-01 | Information classification |
| 8.4 | VM-01 | Vulnerability management |
| 8.6 | AS-01, AS-07, CF-04 | Access control |
| 8.7 | NS-01 | Network protection |
| 8.9 | AS-04, AS-10 | Cryptography |
| 9.4 | RA-02, RA-03, RA-05 | Risk assessment |
| 9.5 | AV-03, NS-03, VM-02 | Monitoring and testing |
| 13.3 | IR-01, IR-04 | Incident handling |
| 13.4 | IR-02 | Lessons learned |
| 13.5 | IR-03 | IR testing |

---

## Clause 5 — Organizational Cybersecurity Management

| Req ID | Requirement | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 5.4.1 | Cybersecurity policy established | ✅ | OM-09 | Information Security Policy |
| 5.4.2 | Cybersecurity roles defined | ✅ | OM-02, OM-08 | Org chart, RACI |
| 5.4.3 | CSMS documented | ✅ | OM-09, OM-11 | CSMS manual |
| 5.4.4 | External communication | ✅ | CO-02, CO-03 | Contact procedures |
| 5.4.5 | Asset management | ✅ | AS-05, CM-06 | Asset inventory |
| 5.4.6 | Audit and monitoring | ✅ | OM-01, VM-02 | Audit program |
| 5.4.7 | Competence management | ✅ | OM-03, OM-06 | Training records |

---

## Clause 6 — Project-Dependent Cybersecurity Management

| Req ID | Requirement | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 6.4.1 | Supplier cybersecurity requirements | ✅ | RA-06 | Vendor Risk Policy |
| 6.4.2 | Supplier capability assessment | ✅ | RA-01, RA-04 | Vendor assessments |
| 6.4.3 | Supplier agreements | ✅ | RA-06 | Contract templates |

---

## Clause 7 — Distributed Development

| Req ID | Requirement | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 7.4.2 | Development environment security | ✅ | CM-01 | Environment segregation |
| 7.4.3 | Configuration management | ✅ | CM-05, CM-06 | CM procedures |
| 7.4.4 | Change management testing | ✅ | CM-04 | Test procedures |
| 7.4.5 | Change authorization | ✅ | CM-07, CM-08 | Approval records |

---

## Clause 8 — Continual Cybersecurity Activities

| Req ID | Requirement | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 8.3 | Information classification | ✅ | CF-01 | Classification Policy |
| 8.4 | Vulnerability management | ✅ | VM-01 | Vuln Management Policy |
| 8.6 | Access management | ✅ | AS-01, AS-07, CF-04 | Access procedures |
| 8.7 | Network protection | ✅ | NS-01 | Network Security Policy |
| 8.9 | Cryptographic controls | ✅ | AS-04, AS-10 | Encryption policies |

---

## Clause 9 — TARA (Threat Analysis and Risk Assessment)

| Req ID | Requirement | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 9.4 | TARA execution | ✅ | RA-02, RA-03, RA-05 | TARA reports |
| 9.5 | Cybersecurity goal definition | ✅ | RA-03 | CSG register |
| 9.5 | Monitoring and testing | ✅ | AV-03, NS-03, VM-02 | Test reports |

---

## Clause 13 — Cybersecurity Incident Response

| Req ID | Requirement | Status | Trust Center Control | Evidence |
|---|---|---|---|---|
| 13.3 | Incident detection and response | ✅ | IR-01, IR-04 | IR Plan |
| 13.4 | Post-incident analysis | ✅ | IR-02 | Lessons learned |
| 13.5 | IR plan testing | ✅ | IR-03 | IR test reports |

---

## Summary

| Clause | Requirements | Implemented | Trust Center Coverage |
|---|---|---|---|
| 5. Organizational | 7 | 7 | OM, CO, AS, CM, VM |
| 6. Project-Dependent | 3 | 3 | RA |
| 7. Distributed Development | 4 | 4 | CM |
| 8. Continual Activities | 5 | 5 | CF, VM, AS, NS |
| 9. TARA | 3 | 3 | RA, AV, NS, VM |
| 13. Incident Response | 3 | 3 | IR |
| **Total** | **25** | **25** | **100%** |

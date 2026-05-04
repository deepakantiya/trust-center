# ISO/SAE 21434 — Cybersecurity Goals & Claims Register

| Field | Value |
|---|---|
| **Standard** | ISO/SAE 21434:2021, Clauses 9.5 – 9.6 |
| **Owner** | Cybersecurity Manager |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Per programme and after any field incident or TARA update |

> This register records cybersecurity goals (CSGs) derived from TARAs. Each goal maps to Trust Center controls for implementation evidence.

---

## Trust Center Control Alignment

| Goal Category | Trust Center Controls |
|---|---|
| Authentication & Access | AS-01, AS-02, AS-07, AS-09 |
| Data Protection | AS-04, AS-10, CF-01, CF-04 |
| Network Security | NS-01, NS-03 |
| Monitoring | AV-03, NS-03, VM-02 |
| Incident Response | IR-01, IR-02, IR-03, IR-04 |

---

## Cybersecurity Goals Register

### CSG-01 — OTA Update Integrity

| Field | Detail |
|---|---|
| **Goal** | OTA software updates shall only accept authentically signed firmware |
| **Source Risk** | R-01 (Malicious firmware via compromised OTA) |
| **CAL** | 4 |
| **Trust Center Controls** | AS-04 (Encryption-at-Rest), AS-10 (Encryption Policy), CM-04 (Software Testing) |
| **Verification** | Code signing validation, penetration test |

### CSG-02 — Diagnostic Access Control

| Field | Detail |
|---|---|
| **Goal** | Diagnostic interfaces shall require authenticated access |
| **Source Risk** | R-03 (Unauthorized diagnostic access) |
| **CAL** | 3 |
| **Trust Center Controls** | AS-01 (Admin Access), AS-09 (Unique IDs), AS-07 (Least Privilege) |
| **Verification** | Access control testing |

### CSG-03 — Data Confidentiality

| Field | Detail |
|---|---|
| **Goal** | Personal and safety-critical data shall be encrypted in transit and at rest |
| **Source Risk** | R-04 (Data exfiltration) |
| **CAL** | 3 |
| **Trust Center Controls** | AS-04 (Encryption-at-Rest), AS-10 (Key Management), CF-01 (Classification) |
| **Verification** | Encryption configuration review |

### CSG-04 — Incident Detection

| Field | Detail |
|---|---|
| **Goal** | Security events shall be detected within defined timeframes |
| **Source Risk** | R-05 (Delayed incident response) |
| **CAL** | 3 |
| **Trust Center Controls** | NS-03 (Automated Alerting), IR-01 (Incident Tracking), IR-04 (IR Plan) |
| **Verification** | Alert testing, incident simulation |

### CSG-05 — Vulnerability Remediation

| Field | Detail |
|---|---|
| **Goal** | Known vulnerabilities shall be remediated per defined SLAs |
| **Source Risk** | R-06 (Exploitation of known vulnerabilities) |
| **CAL** | 4 |
| **Trust Center Controls** | VM-01 (Vuln Management Policy), VM-02 (Penetration Testing) |
| **Verification** | Vulnerability scan reports, patch records |

---

## Claim Template

### CSG-XX — [Goal Name]

| Field | Detail |
|---|---|
| **Goal** | [Cybersecurity goal statement] |
| **Source Risk** | [Risk ID from TARA] |
| **CAL** | [1-4] |
| **Trust Center Controls** | [Control IDs] |
| **Verification** | [Verification method] |

---

## Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Cybersecurity Manager | | | |
| Programme Manager | | | |

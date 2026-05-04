# ISO/SAE 21434 — TARA Template
## Threat Analysis and Risk Assessment

| Field | Value |
|---|---|
| **Standard** | ISO/SAE 21434:2021, Clause 9.4 |
| **Item / System** | [ECU name / System name] |
| **Programme** | [Vehicle programme] |
| **TARA ID** | TARA-[PROGRAMME]-[SEQ] |
| **Author** | [Cybersecurity Engineer] |
| **Version** | 2.0 |
| **Date** | YYYY-MM-DD |
| **Review** | [Cybersecurity Manager sign-off] |

---

## Trust Center Control Integration

TARAs reference Trust Center controls for control implementation evidence:

| TARA Element | Trust Center Controls |
|---|---|
| Risk Assessment Process | RA-02, RA-03, RA-05 |
| Access Control Mitigations | AS-01, AS-07, AS-09 |
| Encryption Mitigations | AS-04, AS-10 |
| Monitoring Mitigations | AV-03, NS-03 |
| Incident Response | IR-01 to IR-04 |

---

## 1. Item Definition (Clause 9.3)

### 1.1 Item Description

[Describe the item under analysis: function, operational environment, interfaces]

### 1.2 Security Properties

| Property | Requirement |
|---|---|
| Confidentiality | [Required / Not Required] |
| Integrity | [Required / Not Required] |
| Availability | [Required / Not Required] |
| Authenticity | [Required / Not Required] |

---

## 2. Asset Identification

| Asset ID | Asset | Criticality | Trust Center Control Reference |
|---|---|---|---|
| A-01 | [Asset name] | [High/Med/Low] | AS-05 (Asset Inventory) |

---

## 3. Threat Scenarios

| TS ID | Threat | Attack Vector | Target Asset | Impact |
|---|---|---|---|---|
| TS-01 | [Threat description] | [Attack method] | [Asset ID] | [S/F/O/P] |

---

## 4. Risk Assessment

| Risk ID | Threat Scenario | Impact | Feasibility | Risk Level | Treatment |
|---|---|---|---|---|---|
| R-01 | TS-01 | [1-4] | [1-4] | [1-16] | [Mitigate/Accept/Avoid/Transfer] |

---

## 5. Risk Treatment

| Risk ID | Trust Center Controls | Residual Risk |
|---|---|---|
| R-01 | [Control IDs from control-matrix.md] | [Risk level] |

---

## 6. Cybersecurity Goals

| CSG ID | Goal | Risk ID | CAL | Trust Center Controls |
|---|---|---|---|---|
| CSG-01 | [Goal statement] | R-01 | [1-4] | [Control IDs] |

---

## Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Author | | | |
| Cybersecurity Manager | | | |
| Programme Manager | | | |

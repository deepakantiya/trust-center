# ISO/SAE 21434 — TARA Template
## Threat Analysis and Risk Assessment

| Field | Value |
|---|---|
| **Standard** | ISO/SAE 21434:2021, Clause 9.4 |
| **Item / System** | [ECU name / System name, e.g., "Telematics Control Unit (TCU)"] |
| **Programme** | [Vehicle programme, e.g., "Model Year 2026 Platform X"] |
| **TARA ID** | TARA-[PROGRAMME]-[SEQ] |
| **Author** | [Cybersecurity Engineer name] |
| **Version** | 1.0 |
| **Date** | YYYY-MM-DD |
| **Review** | [Cybersecurity Manager + cross-functional sign-off] |

---

## 1. Item Definition (Clause 9.3)

### 1.1 Item Description

Provide a brief description of the item under analysis, including:
- Primary function(s)
- Operational environment (in-vehicle, backend, both)
- Interfaces with other systems

**Example:**
> The Telematics Control Unit (TCU) provides cellular-based remote connectivity for OTA software updates, remote diagnostics, emergency call (eCall), and navigation data services. It interfaces with the vehicle gateway ECU via CAN/Ethernet and communicates with the OEM backend over cellular (LTE/5G).

### 1.2 Item Boundary

Describe what is in scope:
- ECU hardware and embedded software
- OTA update client
- Cellular modem firmware
- Backend server interfaces

Describe what is out of scope:
- Backend server infrastructure (separate TARA or addressed by IT security)
- Adjacent ECUs (addressed in their own TARAs)

### 1.3 Interfaces

| Interface | Counterpart | Protocol | Direction | Trust Level |
|---|---|---|---|---|
| Vehicle bus | Gateway ECU | CAN FD | Bidirectional | Internal (semi-trusted) |
| OTA backend | OEM cloud | HTTPS/TLS 1.3 | Bidirectional | External (untrusted) |
| Diagnostic port | OBD-II dongle | UDS over CAN | Bidirectional | External (untrusted) |
| GPS receiver | GNSS module | UART | Receive only | Internal (trusted) |
| Cellular antenna | Carrier network | LTE/5G | Bidirectional | External (untrusted) |

---

## 2. Damage Scenarios and Impact Rating (Clause 9.4.2)

> Damage scenarios describe adverse consequences to road users, third parties, or the organization.

| DS ID | Damage Scenario | Safety (S) | Financial (F) | Operational (O) | Privacy (P) | Impact (I) |
|---|---|---|---|---|---|---|
| DS-01 | Vehicle remotely commanded to unsafe state (sudden braking/acceleration) | S3 — life-threatening | F2 | O3 | P0 | I4 — Severe |
| DS-02 | OTA update delivers malicious firmware to production fleet | S2 — serious injury possible | F3 | O3 | P1 | I4 — Severe |
| DS-03 | Driver location / trip data exfiltrated at scale | S0 | F2 | O1 | P3 — severe PII breach | I3 — Major |
| DS-04 | TCU used as pivot point to attack gateway / CAN bus | S2 | F2 | O2 | P1 | I3 — Major |
| DS-05 | OTA service disrupted — fleet unable to receive critical safety patches | S1 | F2 | O3 | P0 | I2 — Moderate |
| DS-06 | Diagnostic interface used to disable safety systems | S3 | F1 | O2 | P0 | I4 — Severe |

**Impact scale:** I0 Negligible · I1 Minor · I2 Moderate · I3 Major · I4 Severe

**Safety scale (ISO 26262):** S0 No injury · S1 Minor · S2 Serious · S3 Life-threatening / fatal

---

## 3. Threat Scenarios and Attack Path Analysis (Clause 9.4.3)

| TS ID | Threat Scenario | STRIDE | Threat Agent | Attack Vector | Attack Path |
|---|---|---|---|---|---|
| TS-01 | Remote code execution via OTA update mechanism | T/E | Nation state, cybercriminal | Network (cellular) | Compromise OTA signing key → push malicious firmware → RCE on TCU |
| TS-02 | Man-in-the-Middle on OTA channel | T/E | Cybercriminal | Network (cellular) | Downgrade TLS → intercept update → replay/modify firmware |
| TS-03 | GPS spoofing for navigation manipulation | S | Targeted attacker | Wireless (RF proximity) | Broadcast stronger fake GPS signal → false positioning |
| TS-04 | CAN bus injection via compromised TCU | T/R | Insider, cybercriminal | Adjacent component | Exploit TCU → send unauthorized CAN frames to gateway |
| TS-05 | Exfiltration of location/PII via cellular interface | I/D | Cybercriminal | Network (cellular) | Exploit TCU app layer → exfiltrate stored telemetry |
| TS-06 | Physical access via OBD-II port for firmware extraction | I/T | Targeted attacker | Physical (local) | Connect OBD tool → exploit UDS → dump firmware / keys |
| TS-07 | DoS on TCU cellular interface | D | Competitor, hacktivist | Network (cellular) | Flood cellular interface → disrupt OTA / eCall availability |

**STRIDE:** S Spoofing · T Tampering · R Repudiation · I Info Disclosure · D Denial of Service · E Elevation of Privilege

---

## 4. Attack Feasibility Assessment (Clause 9.4.4)

> Evaluate each threat scenario for attack feasibility using the ISO/SAE 21434 method.

| TS ID | Elapsed Time | Specialist Expertise | Knowledge of Item | Window of Opportunity | Equipment | Feasibility Score | Feasibility Level |
|---|---|---|---|---|---|---|---|
| TS-01 | ≥6 months (4) | Expert (4) | Restricted (3) | Easy (1) | Custom (4) | 16 | High |
| TS-02 | 1–3 months (3) | Proficient (3) | Restricted (3) | Easy (1) | Standard (2) | 12 | Medium |
| TS-03 | <1 week (1) | Layperson (0) | Public (0) | Easy (1) | Standard (2) | 4 | Low |
| TS-04 | 1–6 months (3) | Expert (4) | Restricted (3) | Easy (1) | Custom (4) | 15 | High |
| TS-05 | 1–3 months (3) | Proficient (3) | Restricted (3) | Easy (1) | Standard (2) | 12 | Medium |
| TS-06 | <1 day (1) | Proficient (3) | Public (1) | Difficult (4) | Specialized (3) | 12 | Medium |
| TS-07 | <1 week (1) | Layperson (0) | Public (0) | Easy (1) | Standard (2) | 4 | Low |

*Feasibility Level:* Low (0–9) · Medium (10–13) · High (14–20) · Very High (>20)

---

## 5. Risk Determination (Clause 9.4.5)

> Risk = Impact × Attack Feasibility

| TS ID | Damage Scenarios | Impact | Feasibility | Risk Value | Risk Level |
|---|---|---|---|---|---|
| TS-01 | DS-01, DS-02 | I4 | High | R-01 | Critical |
| TS-02 | DS-02 | I4 | Medium | R-02 | High |
| TS-03 | DS-03 | I3 | Low | R-03 | Medium |
| TS-04 | DS-01, DS-04 | I4 | High | R-04 | Critical |
| TS-05 | DS-03 | I3 | Medium | R-05 | High |
| TS-06 | DS-01, DS-06 | I4 | Medium | R-06 | High |
| TS-07 | DS-05 | I2 | Low | R-07 | Low |

*Risk Level:* Negligible · Low · Medium · High · Critical

---

## 6. Cybersecurity Goals (Clause 9.5)

| Goal ID | Cybersecurity Goal | Risk IDs Addressed | CAL | Allocation |
|---|---|---|---|---|
| CSG-01 | The OTA update mechanism shall only accept firmware signed by the OEM's root certificate authority | R-01, R-02 | CAL 4 | TCU software |
| CSG-02 | All communication between TCU and OEM backend shall be mutually authenticated and encrypted using TLS 1.3 or later | R-01, R-02, R-05 | CAL 3 | TCU + backend |
| CSG-03 | The TCU shall enforce CAN bus filtering to prevent unauthorized frame injection to safety-critical domains | R-04 | CAL 4 | TCU software + gateway |
| CSG-04 | Access to diagnostic services (UDS) shall require authenticated sessions with privilege levels | R-06 | CAL 3 | TCU firmware |
| CSG-05 | Stored PII and telemetry data shall be encrypted at rest with keys stored in a hardware security module (HSM/TEE) | R-05 | CAL 2 | TCU hardware + software |
| CSG-06 | The OTA update mechanism shall implement rate-limiting and integrity checks to resist DoS attacks | R-07 | CAL 2 | Backend + TCU |

**CAL (Cybersecurity Assurance Level):** 1 (low) → 4 (highest rigor required)

---

## 7. Cybersecurity Requirements (Clause 10.4.1 — derived from Goals)

| Req ID | Requirement | Parent Goal | Verification Method |
|---|---|---|---|
| CSR-01 | OTA client shall verify firmware signature using ECDSA P-256 before applying any update | CSG-01 | Code review + test case |
| CSR-02 | OTA client shall reject any update where the signature chain does not terminate at the OEM root CA | CSG-01 | Penetration test |
| CSR-03 | All external connections shall use TLS 1.3; TLS 1.2 shall only be permitted with explicit allow-listing | CSG-02 | Configuration audit |
| CSR-04 | TCU shall perform mutual TLS authentication with the OEM backend using device-unique certificates | CSG-02 | Pen test + inspection |
| CSR-05 | UDS session authentication shall require a seed-key exchange before enabling extended diagnostic sessions | CSG-04 | Test case + pen test |
| CSR-06 | CAN frames from the telematics domain shall not be forwarded to the safety domain without explicit allow-listing | CSG-03 | Fuzz test + inspection |
| CSR-07 | Private keys and certificates shall be stored in an on-chip TEE or HSM; keys shall never be stored in plaintext flash | CSG-01, CSG-05 | Hardware inspection + code review |

---

## 8. Residual Risk Sign-off

| Risk ID | Residual Level After Controls | Accepted By | Date | Justification |
|---|---|---|---|---|
| R-01 | Medium (CAL 4 controls reduce feasibility) | Cybersecurity Manager | YYYY-MM-DD | Multi-layer controls (signing + TLS mTLS) sufficiently reduce risk |
| R-02 | Low | Cybersecurity Manager | YYYY-MM-DD | TLS 1.3 + pinning mitigates MitM risk |
| R-03 | Low | Cybersecurity Manager | YYYY-MM-DD | GPS spoofing low feasibility; position plausibility check mitigates |
| R-04 | Medium | Cybersecurity Manager | YYYY-MM-DD | CAN filtering reduces; firewall between domains required |
| R-05 | Low | Cybersecurity Manager | YYYY-MM-DD | Encryption at rest + mTLS reduces exfiltration risk |
| R-06 | Medium | Cybersecurity Manager | YYYY-MM-DD | Seed-key UDS auth; physical access required limits exposure |
| R-07 | Negligible | Cybersecurity Manager | YYYY-MM-DD | Low impact; rate limiting mitigates |

---

## 9. Review and Approval

| Role | Name | Signature | Date |
|---|---|---|---|
| Cybersecurity Engineer (Author) | | | |
| Cybersecurity Manager | | | |
| System Engineer | | | |
| Safety Manager | | | |
| Programme Manager | | | |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | | Initial TARA |

# ISO/SAE 21434 — Cybersecurity Goals & Claims Register

| Field | Value |
|---|---|
| **Standard** | ISO/SAE 21434:2021, Clauses 9.5 – 9.6 |
| **Owner** | Cybersecurity Manager |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Per programme and after any field incident or TARA update |

> This register records all cybersecurity goals (CSGs) and cybersecurity claims derived from TARAs across all active programmes. Each goal must be traceable to a damage scenario and risk, and must have at least one corresponding cybersecurity claim demonstrating that controls are sufficient.

---

## Goal and Claim Register

### CSG-01 — OTA Update Integrity

| Field | Detail |
|---|---|
| **Goal** | The OTA software update mechanism shall ensure that only authentically signed firmware from the OEM root CA is accepted and applied |
| **Source Risk** | R-01 (TS-01: Malicious firmware via compromised OTA), R-02 (TS-02: MitM on OTA channel) |
| **CAL** | 4 |
| **Applicable Programmes** | All programmes with OTA capability |
| **Claim (CSC-01a)** | The TCU OTA client implements ECDSA P-256 signature verification against the OEM root CA before applying any update package |
| **Claim (CSC-01b)** | OTA signing keys are stored in an HSM with access restricted to the OEM release signing process; no private keys exist outside the HSM |
| **Claim (CSC-01c)** | Rollback attacks are prevented by monotonic version counter enforced in secure boot |
| **Evidence** | Code review; pen test report; HSM audit; boot log inspection |
| **Status** | 🟡 Partial — ECDSA verification done; HSM integration in progress Q2 |

---

### CSG-02 — External Channel Authentication and Encryption

| Field | Detail |
|---|---|
| **Goal** | All communication between vehicle components and external services shall be mutually authenticated and encrypted to prevent interception and impersonation |
| **Source Risk** | R-01, R-02, R-05 |
| **CAL** | 3 |
| **Applicable Programmes** | All programmes with cellular or V2X connectivity |
| **Claim (CSC-02a)** | All connections to OEM backend use TLS 1.3 with mutual certificate authentication |
| **Claim (CSC-02b)** | Device certificates are provisioned at manufacturing time and stored in the on-chip TEE; certificate rotation is supported via OTA |
| **Claim (CSC-02c)** | The TCU does not accept connections from servers presenting certificates not anchored to the OEM PKI |
| **Evidence** | TLS configuration inspection; certificate provisioning records; pen test (cert pinning bypass attempt) |
| **Status** | 🟡 Partial — TLS 1.3 done; mTLS certificate deployment in progress |

---

### CSG-03 — CAN Bus Domain Isolation

| Field | Detail |
|---|---|
| **Goal** | The telematics domain shall not be able to inject unauthorized CAN frames into safety-critical vehicle domains |
| **Source Risk** | R-04 (TS-04: CAN injection via TCU) |
| **CAL** | 4 |
| **Applicable Programmes** | All programmes where TCU is connected to vehicle CAN/Ethernet bus |
| **Claim (CSC-03a)** | The gateway ECU implements a CAL 4-verified CAN firewall that blocks all frames from the telematics domain unless explicitly allow-listed |
| **Claim (CSC-03b)** | The allow-list is stored in a read-only memory region protected by secure boot and can only be updated via authenticated OTA |
| **Claim (CSC-03c)** | Fuzz testing of the CAN gateway interface demonstrates no safety-domain frame injection possible from the telematics domain |
| **Evidence** | Gateway firewall config; fuzz test report; penetration test; hardware inspection |
| **Status** | 🔴 Gap — CAN firewall rule set exists; formal CAL 4 verification required Q4 |

---

### CSG-04 — Diagnostic Service Access Control

| Field | Detail |
|---|---|
| **Goal** | Extended and privileged diagnostic services shall only be accessible to authenticated and authorized sessions |
| **Source Risk** | R-06 (TS-06: Physical OBD-II diagnostic attack) |
| **CAL** | 3 |
| **Applicable Programmes** | All programmes with UDS diagnostic services |
| **Claim (CSC-04a)** | Level 0x27 (SecurityAccess) seed-key challenge is required before enabling any diagnostic session beyond DefaultSession |
| **Claim (CSC-04b)** | Failed authentication attempts are rate-limited (max 3 attempts; 10-minute lockout) |
| **Claim (CSC-04c)** | Security Access seed keys are derived from a cryptographically random nonce per session; static keys are not used |
| **Evidence** | UDS configuration; code review; pen test (OBD-II brute-force attempt) |
| **Status** | ✅ Implemented |

---

### CSG-05 — Data Confidentiality at Rest

| Field | Detail |
|---|---|
| **Goal** | PII and sensitive telemetry data stored on the TCU shall be protected against disclosure in the event of physical device compromise |
| **Source Risk** | R-05 (TS-05: Exfiltration of PII) |
| **CAL** | 2 |
| **Applicable Programmes** | All programmes storing location or driver PII |
| **Claim (CSC-05a)** | Stored telemetry and PII is encrypted using AES-256-GCM with keys derived from a device-unique root key in the TEE |
| **Claim (CSC-05b)** | Data retention on device does not exceed 72 hours; data is purged on successful upload confirmation |
| **Evidence** | Code review; hardware inspection; data retention test |
| **Status** | 🟡 Partial — encryption done; automatic purge mechanism in review |

---

### CSG-06 — OTA Availability (Anti-DoS)

| Field | Detail |
|---|---|
| **Goal** | The OTA update service shall remain available for critical security patches despite targeted denial-of-service attempts |
| **Source Risk** | R-07 (TS-07: DoS on OTA service) |
| **CAL** | 2 |
| **Applicable Programmes** | All programmes with OTA |
| **Claim (CSC-06a)** | The OTA backend is deployed behind a CDN with DDoS mitigation (rate-limiting, traffic scrubbing) |
| **Claim (CSC-06b)** | The TCU implements exponential back-off on connection failure to prevent self-inflicted DDoS on reconnect storms |
| **Evidence** | Cloud infrastructure config; DDoS mitigation provider reports; load test results |
| **Status** | ✅ Implemented |

---

## Summary

| Goal ID | Goal Summary | CAL | Status | Blocking for Release |
|---|---|---|---|---|
| CSG-01 | OTA update integrity | 4 | 🟡 Partial | Yes — HSM integration |
| CSG-02 | External channel security | 3 | 🟡 Partial | Yes — mTLS cert deployment |
| CSG-03 | CAN domain isolation | 4 | 🔴 Gap | Yes — CAL 4 verification |
| CSG-04 | Diagnostic access control | 3 | ✅ | No |
| CSG-05 | Data confidentiality at rest | 2 | 🟡 Partial | No — minor gap |
| CSG-06 | OTA availability | 2 | ✅ | No |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | Cybersecurity Manager | Initial goals register |

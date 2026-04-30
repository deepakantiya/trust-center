# Plan of Action & Milestones (POA&M)

| Field | Value |
|---|---|
| **Owner** | CISO |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Monthly |
| **Applicable Frameworks** | CMMC Level 1 & 2 · ISO 27001 · SOC 2 Type II · ISO/SAE 21434 |

> The POA&M documents all security control gaps and partial implementations, with owner accountability, milestones, and target dates. It is a living document — items are added after any assessment and closed when remediation is verified.

**Status Legend:** 🔴 Not Started · 🟡 In Progress · ✅ Completed · ⏸ Deferred (with justification)

---

## Active POA&M Items

### POAM-L1-001 — Physical Safeguarding at Alternate Work Sites (PE.1.136)

| Field | Detail |
|---|---|
| **Framework(s)** | CMMC Level 1, ISO 27001 6.7 |
| **Practice / Control** | PE.1.136 — Safeguarding measures for FCI at alternate work sites |
| **Finding** | Remote work policy exists and VPN is enforced; however, physical safeguarding of FCI at home offices is policy-based only with no verification mechanism |
| **Risk Level** | Medium |
| **Compensating Control** | VPN + encrypted endpoints reduce exposure; no FCI printed or stored locally per policy |
| **Remediation Plan** | 1. Draft remote worker security attestation form (Q2) · 2. Deploy DLP rule blocking local save of CUI-tagged documents (Q2) · 3. Annual remote workspace self-certification (Q3) |
| **Owner** | IT + CISO |
| **Milestones** | M1: Attestation form drafted — [date] · M2: DLP rule deployed — [date] · M3: First annual attestation completed — [date] |
| **Target Completion** | Q3 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | |

---

### POAM-L2-001 — Endpoint DLP for CUI (AC.2.016 / SC.3.182)

| Field | Detail |
|---|---|
| **Framework(s)** | CMMC Level 2, ISO 27001 8.12 |
| **Practice / Control** | AC.2.016 — Control CUI flow; SC.3.182 — Prevent unauthorized information transfer |
| **Finding** | DLP is deployed for email and cloud storage; endpoint DLP (blocking local copy of CUI to USB / unapproved apps) is not yet implemented |
| **Risk Level** | Medium |
| **Compensating Control** | USB storage blocked by MDM; manual DLP policy enforced through training and audit |
| **Remediation Plan** | 1. Evaluate endpoint DLP tools (Microsoft Purview / Forcepoint / Digital Guardian) — Q1 · 2. Pilot on 10% of endpoints — Q2 · 3. Full rollout — Q3 · 4. Tune rules and close false-positives — Q4 |
| **Owner** | Security Engineering |
| **Milestones** | M1: Tool selected — [date] · M2: Pilot complete — [date] · M3: Full rollout — [date] |
| **Target Completion** | Q3 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | |

---

### POAM-L2-002 — FIPS-Validated Cryptography for Internal Service Mesh (SC.3.177)

| Field | Detail |
|---|---|
| **Framework(s)** | CMMC Level 2 |
| **Practice / Control** | SC.3.177 — FIPS-validated cryptography for CUI |
| **Finding** | External communications use FIPS-validated TLS 1.3; internal service-to-service communication uses mTLS but not all cipher suites are FIPS 140-2 validated |
| **Risk Level** | Medium |
| **Compensating Control** | Internal traffic is within AWS VPC; network-layer encryption; only TLS 1.2+ permitted |
| **Remediation Plan** | 1. Inventory all internal service connections — Q1 · 2. Configure service mesh (Envoy/Istio) to enforce FIPS cipher suite profile — Q2 · 3. Validate with tool scan — Q2 |
| **Owner** | Platform Engineering |
| **Milestones** | M1: Inventory complete — [date] · M2: FIPS profile configured — [date] · M3: Validation scan complete — [date] |
| **Target Completion** | Q2 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | AWS FIPS endpoints available for GovCloud; standard regions require custom configuration |

---

### POAM-L2-003 — Software Bill of Materials (SBOM) (SR.3.169)

| Field | Detail |
|---|---|
| **Framework(s)** | CMMC Level 2, ISO 27001 5.21, ISO/SAE 21434 7.4.3 |
| **Practice / Control** | SR.3.169 — SBOM for software components |
| **Finding** | SCA scanning in CI identifies known vulnerable packages but does not generate a formal SBOM artifact per SPDX or CycloneDX standard |
| **Risk Level** | Low |
| **Compensating Control** | SCA (Snyk / Dependabot) identifies and alerts on CVEs in dependencies; manual inventory for critical components |
| **Remediation Plan** | 1. Integrate Syft or CycloneDX plugin into CI pipeline — Q2 · 2. Publish SBOM artifacts to artifact registry alongside releases — Q2 · 3. Validate SBOM format compliance (SPDX 2.3 / CycloneDX 1.4) — Q3 |
| **Owner** | Engineering / Security |
| **Milestones** | M1: Tool integrated — [date] · M2: SBOM artifacts publishing — [date] · M3: Format validation — [date] |
| **Target Completion** | Q3 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | |

---

### POAM-27001-001 — Data Masking in Dev/Test (ISO 27001 8.11)

| Field | Detail |
|---|---|
| **Framework(s)** | ISO 27001 |
| **Control** | 8.11 — Data masking |
| **Finding** | Production data (including PII) is occasionally used in dev/test environments for debugging without consistent masking |
| **Risk Level** | High |
| **Compensating Control** | Dev/test environments have restricted access; data not extracted outside environment; access logged |
| **Remediation Plan** | 1. Define data masking requirements for each PII data type — Q1 · 2. Implement masking pipeline using Faker / database anonymization tool — Q2 · 3. Enforce via pre-commit hook and CI check — Q2 · 4. Audit dev/test environments for residual prod data — Q3 |
| **Owner** | Engineering / DPO |
| **Milestones** | M1: Requirements defined — [date] · M2: Masking pipeline — [date] · M3: CI enforcement — [date] · M4: Audit complete — [date] |
| **Target Completion** | Q3 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | GDPR / CCPA implications make this High priority |

---

### POAM-21434-001 — CAN Bus Domain Isolation CAL 4 Verification (CSG-03)

| Field | Detail |
|---|---|
| **Framework(s)** | ISO/SAE 21434 |
| **Requirement** | Clause 9.5 / CSG-03 — CAN bus domain isolation verified to CAL 4 |
| **Finding** | CAN firewall rules exist but have not been formally verified to CAL 4 assurance level (independent testing, fault injection, boundary analysis) |
| **Risk Level** | Critical (Safety implications — potential for remote CAN injection) |
| **Compensating Control** | Defense-in-depth: TCU software validation; gateway hardware isolation; limited exposed services |
| **Remediation Plan** | 1. Engage qualified independent verification lab for CAL 4 testing — Q2 · 2. Complete CAL 4 boundary analysis and fault injection testing — Q3 · 3. Obtain verification evidence and update cybersecurity case — Q4 |
| **Owner** | Product Security / Cybersecurity Manager |
| **Milestones** | M1: Lab engaged — [date] · M2: Testing complete — [date] · M3: Evidence documented — [date] |
| **Target Completion** | Q4 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | This is a release-blocking item for the programme. Escalate to Programme Manager if milestone slips. |

---

### POAM-21434-002 — CSMS Manual (Clause 5.4.3)

| Field | Detail |
|---|---|
| **Framework(s)** | ISO/SAE 21434 |
| **Requirement** | Clause 5.4.3 — Documented Cybersecurity Management System |
| **Finding** | CSMS policies and processes exist but are not consolidated into a formal CSMS manual as required by clause 5.4.3 |
| **Risk Level** | Medium |
| **Compensating Control** | Individual policies and procedures are documented; CSMS elements auditable |
| **Remediation Plan** | 1. Appoint CSMS document owner — Q1 · 2. Draft CSMS manual consolidating all clause 5 artefacts — Q2 · 3. Review and approve — Q2 · 4. Implement version control — Q2 |
| **Owner** | Cybersecurity Manager |
| **Milestones** | M1: Owner appointed — [date] · M2: Draft complete — [date] · M3: Approved and published — [date] |
| **Target Completion** | Q2 YYYY |
| **Status** | 🟡 In Progress |
| **Notes** | |

---

## Completed Items

| POAM ID | Finding | Completed Date | Verified By |
|---|---|---|---|
| *(none yet)* | | | |

---

## Deferred Items

| POAM ID | Finding | Deferral Reason | Deferred Until | Approved By |
|---|---|---|---|---|
| *(none yet)* | | | | |

---

## Monthly Review Record

| Review Date | Items Reviewed | New Items | Closed Items | Overall Status | Reviewed By |
|---|---|---|---|---|---|
| YYYY-MM-DD | | | | | |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | CISO | Initial POA&M |

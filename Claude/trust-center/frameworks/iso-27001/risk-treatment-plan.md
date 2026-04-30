# ISO 27001:2022 — Risk Treatment Plan

| Field | Value |
|---|---|
| **Standard** | ISO/IEC 27001:2022, Clause 6.1.3 |
| **Owner** | CISO |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Quarterly (aligned to risk register) |
| **Input** | [`../../risk-management/risk-register.md`](../../risk-management/risk-register.md) |

---

## 1. Risk Treatment Options

Per ISO 27001 § 6.1.3, each identified risk is addressed using one or more of:

| Option | Definition |
|---|---|
| **Modify** (Mitigate) | Apply controls to reduce likelihood or impact below the accepted threshold |
| **Retain** (Accept) | Consciously accept the residual risk (documented sign-off required) |
| **Avoid** | Eliminate the risk source (cease the activity) |
| **Share** (Transfer) | Transfer risk to a third party (insurance, contract, outsourcing) |

---

## 2. Risk Acceptance Criteria

| Residual Risk Level | Score Range | Treatment Required |
|---|---|---|
| Critical | 20–25 | Must mitigate — no acceptance without CISO + CEO sign-off |
| High | 12–19 | Treatment plan required; CISO sign-off on any acceptance |
| Medium | 6–11 | Treatment plan preferred; CISO may accept with justification |
| Low | 1–5 | May retain; document rationale |

*Score = Likelihood (1–5) × Impact (1–5)*

---

## 3. Treatment Plans

### RTP-001 — Ransomware / Destructive Malware

| Field | Detail |
|---|---|
| **Risk ID** | RR-003 (see risk register) |
| **Inherent Risk** | Critical (5×5 = 25) |
| **Treatment Option** | Modify + Share |
| **Annex A Controls** | 8.7 (malware protection), 8.13 (backups), 8.15 (logging), 5.24–5.27 (IR) |
| **Actions** | 1. EDR deployed and tuned (done) · 2. Immutable off-site backups with quarterly restore test (done) · 3. Tabletop ransomware exercise annually · 4. Cyber insurance policy with ransomware rider |
| **Owner** | CISO / IT |
| **Target Date** | Ongoing |
| **Residual Risk** | High (4×3 = 12) — accepted with CISO sign-off |
| **Accepted By** | CISO — YYYY-MM-DD |

---

### RTP-002 — Credential Compromise / Account Takeover

| Field | Detail |
|---|---|
| **Risk ID** | RR-001 |
| **Inherent Risk** | High (4×4 = 16) |
| **Treatment Option** | Modify |
| **Annex A Controls** | 5.17 (authentication), 8.5 (secure auth), 8.2 (privileged access) |
| **Actions** | 1. MFA enforced for all users (done) · 2. Phishing-resistant FIDO2 for privileged accounts (Q2 YYYY) · 3. PAM for production access (done) · 4. Quarterly access review (done) |
| **Owner** | IT / Security |
| **Target Date** | Q2 YYYY (FIDO2) |
| **Residual Risk** | Medium (3×3 = 9) |

---

### RTP-003 — Data Breach via Third-Party / Supply Chain

| Field | Detail |
|---|---|
| **Risk ID** | RR-005 |
| **Inherent Risk** | High (4×5 = 20) |
| **Treatment Option** | Modify + Share |
| **Annex A Controls** | 5.19–5.23 (supplier), 5.21 (ICT supply chain) |
| **Actions** | 1. Vendor security questionnaire for Tier 1 vendors (done) · 2. Annual vendor review (done) · 3. SBOM generation for software components (Q3 YYYY) · 4. Subprocessor DPAs (done) · 5. Cyber insurance covers 3rd-party breach |
| **Owner** | GRC / Procurement |
| **Target Date** | Q3 YYYY (SBOM) |
| **Residual Risk** | Medium (3×4 = 12) |

---

### RTP-004 — Insider Threat (Malicious or Negligent)

| Field | Detail |
|---|---|
| **Risk ID** | RR-007 |
| **Inherent Risk** | Medium (3×4 = 12) |
| **Treatment Option** | Modify |
| **Annex A Controls** | 5.3 (SoD), 6.1 (screening), 6.4 (disciplinary), 8.2 (PAM), 8.15 (logging) |
| **Actions** | 1. Background checks at hire (done) · 2. Least-privilege / RBAC (done) · 3. SIEM user behaviour analytics (UBA) for privileged accounts (Q3 YYYY) · 4. Offboarding checklist with immediate access revocation (done) |
| **Owner** | HR / IT / Security |
| **Target Date** | Q3 YYYY (UBA) |
| **Residual Risk** | Low (2×3 = 6) |

---

### RTP-005 — Availability Incident (DDoS / Infrastructure Failure)

| Field | Detail |
|---|---|
| **Risk ID** | RR-002 |
| **Inherent Risk** | High (4×4 = 16) |
| **Treatment Option** | Modify + Share |
| **Annex A Controls** | 8.14 (redundancy), 8.20 (network security), 5.30 (ICT continuity) |
| **Actions** | 1. Multi-AZ deployment (done) · 2. CDN + DDoS mitigation service (done) · 3. DR plan with annual exercise (done) · 4. SLA-backed cloud provider; uptime SLA in customer contracts |
| **Owner** | SRE |
| **Target Date** | Ongoing |
| **Residual Risk** | Low (2×3 = 6) |

---

### RTP-006 — Unpatched Vulnerability Exploited

| Field | Detail |
|---|---|
| **Risk ID** | RR-004 |
| **Inherent Risk** | High (4×4 = 16) |
| **Treatment Option** | Modify |
| **Annex A Controls** | 8.8 (vulnerability management), 8.29 (security testing) |
| **Actions** | 1. Continuous CVE scanning in CI and production (done) · 2. Patch SLAs: Critical ≤48h, High ≤7 days, Medium ≤30 days (done) · 3. Annual external pen test (done) · 4. Bug bounty programme (done) |
| **Owner** | Security / Engineering |
| **Target Date** | Ongoing |
| **Residual Risk** | Medium (3×3 = 9) |

---

### RTP-007 — Non-compliance with Data Protection Regulations (GDPR/CCPA)

| Field | Detail |
|---|---|
| **Risk ID** | RR-006 |
| **Inherent Risk** | High (3×5 = 15) |
| **Treatment Option** | Modify + Share |
| **Annex A Controls** | 5.34 (PII protection), 5.31 (legal requirements), 5.12–5.13 (classification) |
| **Actions** | 1. DPIAs for new data processing activities (done) · 2. DSR portal and process (done) · 3. Data retention and deletion schedule (done) · 4. External DPO review annually · 5. Cyber/privacy liability insurance |
| **Owner** | DPO / Legal |
| **Target Date** | Ongoing |
| **Residual Risk** | Medium (2×4 = 8) |

---

## 4. Residual Risk Summary

| Risk ID | Risk Name | Inherent Score | Residual Score | Accepted By | Acceptance Date |
|---|---|---|---|---|---|
| RTP-001 | Ransomware | 25 | 12 | CISO | YYYY-MM-DD |
| RTP-002 | Credential Compromise | 16 | 9 | CISO | YYYY-MM-DD |
| RTP-003 | Third-Party Breach | 20 | 12 | CISO | YYYY-MM-DD |
| RTP-004 | Insider Threat | 12 | 6 | CISO | YYYY-MM-DD |
| RTP-005 | Availability Incident | 16 | 6 | CISO | YYYY-MM-DD |
| RTP-006 | Unpatched Vulnerability | 16 | 9 | CISO | YYYY-MM-DD |
| RTP-007 | Regulatory Non-compliance | 15 | 8 | CISO + DPO | YYYY-MM-DD |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | CISO | Initial risk treatment plan |

# CMMC Level 1 — Self-Assessment Workbook

| Field | Value |
|---|---|
| **Framework** | CMMC 2.0, Level 1 |
| **Basis** | FAR 52.204-21 (15 practices) + NIST SP 800-171 basic safeguarding (17 practices total) |
| **Assessment type** | Annual self-assessment (no third-party C3PAO required at Level 1) |
| **Owner** | CISO / Compliance Manager |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual (required for DoD contract maintenance) |
| **Scope** | All systems processing Federal Contract Information (FCI) |

> **Level 1 covers 17 practices** across 6 domains. All practices must be implemented ("MET") for a Level 1 self-assessment score of 17/17. Any "NOT MET" requires a Plan of Action & Milestones (POA&M) — see [`poam.md`](poam.md).

**Legend:** ✅ MET · 🟡 Partially Implemented · 🔴 NOT MET · ⚪ Not Applicable

---

## Domain AC — Access Control (4 practices)

### AC.1.001
| Field | Detail |
|---|---|
| **Practice** | Limit information system access to authorized users, processes acting on behalf of authorized users, and devices (including other information systems) |
| **NIST 800-171 Ref** | 3.1.1 |
| **Status** | ✅ MET |
| **Implementation** | SSO (Okta/Azure AD) enforces identity-based access; RBAC limits access to FCI systems by role; default-deny firewall rules. New user access requires manager ticket approval. |
| **Evidence** | IdP user list with roles; firewall ACL export; access provisioning tickets |
| **Gaps / Notes** | None |

### AC.1.002
| Field | Detail |
|---|---|
| **Practice** | Limit information system access to the types of transactions and functions that authorized users are permitted to execute |
| **NIST 800-171 Ref** | 3.1.2 |
| **Status** | ✅ MET |
| **Implementation** | Application-layer RBAC enforces function-level permissions (read/write/admin); API authorization checks on every request; admin functions require elevated role |
| **Evidence** | RBAC matrix; application permission config; code review samples |
| **Gaps / Notes** | None |

### AC.1.003
| Field | Detail |
|---|---|
| **Practice** | Verify and control/limit connections to external information systems |
| **NIST 800-171 Ref** | 3.1.20 |
| **Status** | ✅ MET |
| **Implementation** | Egress firewall rules restrict outbound connections to approved services; VPN required for remote admin; external API connections use allowlisted endpoints; all external connections logged |
| **Evidence** | Firewall policy; egress allowlist; VPN config; SIEM egress logs |
| **Gaps / Notes** | None |

### AC.1.004
| Field | Detail |
|---|---|
| **Practice** | Control information posted or processed on publicly accessible information systems |
| **NIST 800-171 Ref** | 3.1.22 |
| **Status** | ✅ MET |
| **Implementation** | Public website managed through content review process; FCI data never stored or processed on public-facing systems; public S3/blob buckets regularly audited for accidental exposure |
| **Evidence** | Content approval process; S3/blob access policy audit; data flow diagram showing FCI isolation |
| **Gaps / Notes** | None |

---

## Domain IA — Identification and Authentication (2 practices)

### IA.1.076
| Field | Detail |
|---|---|
| **Practice** | Identify information system users, processes acting on behalf of users, and devices |
| **NIST 800-171 Ref** | 3.5.1 |
| **Status** | ✅ MET |
| **Implementation** | All users have unique named accounts; service accounts named and inventoried; devices enrolled in MDM with unique identifiers; shared accounts prohibited |
| **Evidence** | IdP user list (no shared accounts); MDM device inventory; service account register |
| **Gaps / Notes** | None |

### IA.1.077
| Field | Detail |
|---|---|
| **Practice** | Authenticate (or verify) the identities of those users, processes, or devices before allowing access |
| **NIST 800-171 Ref** | 3.5.2 |
| **Status** | ✅ MET |
| **Implementation** | SSO with MFA required for all users; service accounts use client certificates or API keys (rotated quarterly); device authentication via MDM certificate |
| **Evidence** | IdP MFA policy screenshot; service account credential rotation records; MDM cert policy |
| **Gaps / Notes** | None |

---

## Domain MP — Media Protection (1 practice)

### MP.1.001
| Field | Detail |
|---|---|
| **Practice** | Sanitize or destroy information system media before disposal or reuse |
| **NIST 800-171 Ref** | 3.8.3 |
| **Status** | ✅ MET |
| **Implementation** | All hard drives and storage media wiped using NIST 800-88 methods before disposal or reuse; laptops returned via IT are wiped before redeployment; cloud storage uses cryptographic erasure; certificates of destruction maintained |
| **Evidence** | Media disposal procedure; certificates of destruction; MDM remote wipe capability screenshot |
| **Gaps / Notes** | None |

---

## Domain PE — Physical Protection (6 practices)

### PE.1.131
| Field | Detail |
|---|---|
| **Practice** | Limit physical access to organizational information systems to authorized individuals |
| **NIST 800-171 Ref** | 3.10.1 |
| **Status** | ✅ MET |
| **Implementation** | Office access controlled by badge/keycard; server rooms require separate authorization; visitor log maintained; data center physical security covered by CSP ISO 27001 / SOC 2 |
| **Evidence** | Badge access system logs; visitor log; CSP physical security certification |
| **Gaps / Notes** | None |

### PE.1.132
| Field | Detail |
|---|---|
| **Practice** | Protect and monitor the physical facility and support infrastructure for organizational information systems |
| **NIST 800-171 Ref** | 3.10.2 |
| **Status** | ✅ MET |
| **Implementation** | CCTV in office; badge access with time-of-day restrictions; environmental monitoring (temperature, humidity) in server closet; CSP data center monitoring covers cloud infrastructure |
| **Evidence** | CCTV system; badge audit logs; environmental monitoring alerts; CSP SOC 2 |
| **Gaps / Notes** | None |

### PE.1.133
| Field | Detail |
|---|---|
| **Practice** | Escort visitors and monitor visitor activity |
| **NIST 800-171 Ref** | 3.10.3 |
| **Status** | ✅ MET |
| **Implementation** | Visitor sign-in required at reception; visitors issued temporary badges and escorted in restricted areas; visitor log retained for 1 year |
| **Evidence** | Visitor log (last quarter); visitor badge policy |
| **Gaps / Notes** | None |

### PE.1.134
| Field | Detail |
|---|---|
| **Practice** | Maintain audit logs of physical access |
| **NIST 800-171 Ref** | 3.10.4 |
| **Status** | ✅ MET |
| **Implementation** | Badge access system generates audit log of all entries and exits; logs retained for 1 year; monthly review by Facilities |
| **Evidence** | Badge system audit log export; retention policy; monthly review records |
| **Gaps / Notes** | None |

### PE.1.135
| Field | Detail |
|---|---|
| **Practice** | Control and manage physical access devices |
| **NIST 800-171 Ref** | 3.10.5 |
| **Status** | ✅ MET |
| **Implementation** | Badge issuance tracked in HR system; badges deactivated within 24h of termination; lost/stolen badges reported and deactivated immediately; annual badge audit |
| **Evidence** | Badge issuance register; termination badge deactivation records; lost badge procedure |
| **Gaps / Notes** | None |

### PE.1.136
| Field | Detail |
|---|---|
| **Practice** | Enforce safeguarding measures for CUI at alternate work sites |
| **NIST 800-171 Ref** | 3.10.6 |
| **Status** | 🟡 Partially Implemented |
| **Implementation** | Remote work policy exists; VPN required; endpoint encryption enforced via MDM. FCI handling at home offices relies on policy compliance; no physical inspection capability. |
| **Evidence** | Remote work policy; VPN config; MDM enrollment + encryption attestation |
| **Gaps / Notes** | Physical safeguarding at home offices is policy-based only; consider remote worker security attestation form (see POA&M POAM-L1-001) |

---

## Domain SC — System and Communications Protection (2 practices)

### SC.1.175
| Field | Detail |
|---|---|
| **Practice** | Monitor, control, and protect organizational communications at the external boundaries and key internal boundaries of the information system |
| **NIST 800-171 Ref** | 3.13.1 |
| **Status** | ✅ MET |
| **Implementation** | Perimeter firewall + WAF at network boundary; internal network segmented into VLANs (prod/corp/guest); all traffic at boundaries logged in SIEM; anomaly detection enabled |
| **Evidence** | Firewall policy; network diagram; SIEM boundary log samples |
| **Gaps / Notes** | None |

### SC.1.176
| Field | Detail |
|---|---|
| **Practice** | Implement subnetworks for publicly accessible system components that are separated from internal networks |
| **NIST 800-171 Ref** | 3.13.5 |
| **Status** | ✅ MET |
| **Implementation** | DMZ / public-facing infrastructure in separate VPC/subnet from internal systems; no direct routing between DMZ and production data stores; WAF in front of public endpoints |
| **Evidence** | Network architecture diagram; VPC/subnet routing table; WAF config |
| **Gaps / Notes** | None |

---

## Domain SI — System and Information Integrity (2 practices)

### SI.1.210
| Field | Detail |
|---|---|
| **Practice** | Identify, report, and correct information and information system flaws in a timely manner |
| **NIST 800-171 Ref** | 3.14.1 |
| **Status** | ✅ MET |
| **Implementation** | Continuous CVE scanning (Wiz/Qualys/Tenable); patch SLAs: Critical ≤48h, High ≤7 days, Medium ≤30 days; patch status tracked in vulnerability management tool; monthly patching report to CISO |
| **Evidence** | Scanner reports; patch SLA policy; patching status dashboard |
| **Gaps / Notes** | None |

### SI.1.211
| Field | Detail |
|---|---|
| **Practice** | Provide protection from malicious code at appropriate locations within organizational information systems |
| **NIST 800-171 Ref** | 3.14.2 |
| **Status** | ✅ MET |
| **Implementation** | EDR (CrowdStrike / SentinelOne) deployed on 100% of endpoints; container images scanned in CI for malware/known-bad packages; email gateway scanning for malicious attachments; DNS filtering blocks known C2 domains |
| **Evidence** | EDR deployment report (100% coverage); container scan CI logs; email gateway config |
| **Gaps / Notes** | None |

---

## Assessment Score

| Domain | Practices | MET | NOT MET | Score |
|---|---|---|---|---|
| AC — Access Control | 4 | 4 | 0 | 4/4 |
| IA — Identification & Auth | 2 | 2 | 0 | 2/2 |
| MP — Media Protection | 1 | 1 | 0 | 1/1 |
| PE — Physical Protection | 6 | 5 | 1 (partial) | 5/6 |
| SC — System & Comms | 2 | 2 | 0 | 2/2 |
| SI — System & Info Integrity | 2 | 2 | 0 | 2/2 |
| **Total** | **17** | **16** | **1** | **16/17** |

> **Note:** PE.1.136 (alternate work site safeguarding) is Partially Implemented. A POA&M entry (POAM-L1-001) has been created. The practice is expected to reach MET status by [target date].

---

## Self-Assessment Certification

*By signing below, the authorized official certifies that the information provided is accurate, and that the organization will submit this score to the Supplier Performance Risk System (SPRS) as required for DoD contracts.*

| Role | Name | Signature | Date |
|---|---|---|---|
| CISO | | | |
| Authorized Representative | | | |

**SPRS Score Submitted:** ☐ Yes — Date: __________ ☐ No — Reason: __________

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | CISO | Initial Level 1 self-assessment |

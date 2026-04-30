# ISO 27001:2022 — Statement of Applicability (SoA)

| Field | Value |
|---|---|
| **Standard** | ISO/IEC 27001:2022 |
| **Owner** | CISO |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Scope** | See [`isms-scope.md`](isms-scope.md) |

**Legend**
- **Applicable:** Yes / No / Partial
- **Status:** ✅ Implemented · 🟡 Partial · 🔴 Gap · ⚪ Excluded
- **Exclusion Reason:** documented when Applicable = No (must be justified per § 6.1.3d)

---

## 5. Organizational Controls

| ID | Control | Applicable | Status | Exclusion / Justification | Policy / Evidence |
|---|---|---|---|---|---|
| 5.1 | Policies for information security | Yes | ✅ | — | `policies/information-security-policy.md` |
| 5.2 | Information security roles and responsibilities | Yes | ✅ | — | CISO charter; org chart |
| 5.3 | Segregation of duties | Yes | ✅ | — | RBAC matrix; access control policy |
| 5.4 | Management responsibilities | Yes | ✅ | — | Board minutes; CISO charter |
| 5.5 | Contact with authorities | Yes | ✅ | — | IR policy §4; contact register |
| 5.6 | Contact with special interest groups | Yes | ✅ | — | ISAC membership; threat intel program |
| 5.7 | Threat intelligence | Yes | ✅ | — | Threat intel feeds; CC7.2 evidence |
| 5.8 | Information security in project management | Yes | 🟡 | Tracking added to PM template; full rollout Q3 | Secure dev policy; SDLC checklist |
| 5.9 | Inventory of information and other associated assets | Yes | ✅ | — | Asset register; CMDB |
| 5.10 | Acceptable use of information and other assets | Yes | ✅ | — | `policies/acceptable-use-policy.md` |
| 5.11 | Return of assets | Yes | ✅ | — | Offboarding checklist |
| 5.12 | Classification of information | Yes | ✅ | — | `policies/data-classification-policy.md` |
| 5.13 | Labelling of information | Yes | 🟡 | Labels applied to structured data; unstructured data labelling roadmap Q4 | Data classification policy |
| 5.14 | Information transfer | Yes | ✅ | — | Data transfer agreements; encryption policy |
| 5.15 | Access control | Yes | ✅ | — | `policies/access-control-policy.md` |
| 5.16 | Identity management | Yes | ✅ | — | IdP config (Okta/Azure AD); joiner-mover-leaver process |
| 5.17 | Authentication information | Yes | ✅ | — | Password policy; MFA enforcement |
| 5.18 | Access rights | Yes | ✅ | — | Access request tickets; quarterly access review |
| 5.19 | Information security in supplier relationships | Yes | ✅ | — | `policies/vendor-management-policy.md`; vendor register |
| 5.20 | Addressing information security within supplier agreements | Yes | ✅ | — | DPA / security addendum templates |
| 5.21 | Managing information security in the ICT supply chain | Yes | 🟡 | Software bill of materials (SBOM) initiative in progress | SCA scans; vendor register |
| 5.22 | Monitoring, review and change management of supplier services | Yes | ✅ | — | Annual vendor review; vendor register |
| 5.23 | Information security for use of cloud services | Yes | ✅ | — | Cloud provider SOC 2 reports; CSP security addenda |
| 5.24 | Information security incident management planning and preparation | Yes | ✅ | — | `policies/incident-response-policy.md`; runbooks |
| 5.25 | Assessment and decision on information security events | Yes | ✅ | — | IR triage runbook; severity scoring |
| 5.26 | Response to information security incidents | Yes | ✅ | — | IR runbooks; on-call procedures |
| 5.27 | Learning from information security incidents | Yes | ✅ | — | Post-incident review template; lesson-learned tracker |
| 5.28 | Collection of evidence | Yes | ✅ | — | Chain-of-custody procedure; forensics runbook |
| 5.29 | Information security during disruption | Yes | ✅ | — | `policies/business-continuity-policy.md` |
| 5.30 | ICT readiness for business continuity | Yes | ✅ | — | DR plan; annual DR exercise |
| 5.31 | Legal, statutory, regulatory and contractual requirements | Yes | ✅ | — | Legal register; privacy notices; DPAs |
| 5.32 | Intellectual property rights | Yes | ✅ | — | Open-source policy; license scanner |
| 5.33 | Protection of records | Yes | ✅ | — | Retention schedule; backup policy |
| 5.34 | Privacy and protection of PII | Yes | ✅ | — | Privacy policy; DPIAs; DSR process |
| 5.35 | Independent review of information security | Yes | ✅ | — | Annual external audit; pen test |
| 5.36 | Compliance with policies, rules and standards for information security | Yes | ✅ | — | Internal audit programme; GRC tool |
| 5.37 | Documented operating procedures | Yes | ✅ | — | Runbooks; SOP library |

---

## 6. People Controls

| ID | Control | Applicable | Status | Exclusion / Justification | Policy / Evidence |
|---|---|---|---|---|---|
| 6.1 | Screening | Yes | ✅ | — | Background check policy; HR records |
| 6.2 | Terms and conditions of employment | Yes | ✅ | — | Employment agreements; NDA |
| 6.3 | Information security awareness, education and training | Yes | ✅ | — | Annual security training; completion reports |
| 6.4 | Disciplinary process | Yes | ✅ | — | HR disciplinary policy |
| 6.5 | Responsibilities after termination or change of employment | Yes | ✅ | — | Offboarding checklist; exit interview |
| 6.6 | Confidentiality or non-disclosure agreements | Yes | ✅ | — | NDA library; contractor agreements |
| 6.7 | Remote working | Yes | ✅ | — | Remote work policy; endpoint controls |
| 6.8 | Information security event reporting | Yes | ✅ | — | Incident reporting channel; escalation path |

---

## 7. Physical Controls

| ID | Control | Applicable | Status | Exclusion / Justification | Policy / Evidence |
|---|---|---|---|---|---|
| 7.1 | Physical security perimeters | Yes | ✅ | — | Office badge access; data center (via CSP SOC 2) |
| 7.2 | Physical entry | Yes | ✅ | — | Badge logs; visitor register |
| 7.3 | Securing offices, rooms and facilities | Yes | ✅ | — | Facilities management; server room controls |
| 7.4 | Physical security monitoring | Yes | ✅ | — | CCTV; badge audit logs |
| 7.5 | Protecting against physical and environmental threats | Yes | ✅ | — | Facilities risk assessment |
| 7.6 | Working in secure areas | Yes | ✅ | — | Clean desk policy; secure area procedures |
| 7.7 | Clear desk and clear screen | Yes | ✅ | — | Clear desk policy; endpoint auto-lock |
| 7.8 | Equipment siting and protection | Yes | ✅ | — | Data center (CSP-managed); office server closet controls |
| 7.9 | Security of assets off-premises | Yes | ✅ | — | Remote work policy; mobile device encryption |
| 7.10 | Storage media | Yes | ✅ | — | `policies/data-classification-policy.md`; media disposal procedure |
| 7.11 | Supporting utilities | Yes | ✅ | — | CSP-managed (multi-AZ); UPS for on-prem |
| 7.12 | Cabling security | Partial | 🟡 | Cloud-first: most cabling is CSP-managed. On-prem cabling labelled and routed. | CSP SOC 2; facilities plan |
| 7.13 | Equipment maintenance | Yes | ✅ | — | Asset maintenance schedule; CSP SLA |
| 7.14 | Secure disposal or re-use of equipment | Yes | ✅ | — | Disposal procedure; certificates of destruction |

---

## 8. Technological Controls

| ID | Control | Applicable | Status | Exclusion / Justification | Policy / Evidence |
|---|---|---|---|---|---|
| 8.1 | User end point devices | Yes | ✅ | — | MDM/UEM config; endpoint hardening standard |
| 8.2 | Privileged access rights | Yes | ✅ | — | PAM tool; just-in-time access; quarterly review |
| 8.3 | Information access restriction | Yes | ✅ | — | RBAC; application-layer access controls |
| 8.4 | Access to source code | Yes | ✅ | — | Branch protection; repository access matrix |
| 8.5 | Secure authentication | Yes | ✅ | — | MFA enforced; SSO; phishing-resistant (FIDO2) roadmap |
| 8.6 | Capacity management | Yes | ✅ | — | Auto-scaling; capacity alerts; SRE runbooks |
| 8.7 | Protection against malware | Yes | ✅ | — | EDR (CrowdStrike / SentinelOne); AV; container scanning |
| 8.8 | Management of technical vulnerabilities | Yes | ✅ | — | CVE scanning; patch SLAs; bug bounty |
| 8.9 | Configuration management | Yes | ✅ | — | IaC (Terraform); hardening baselines (CIS); CMDB |
| 8.10 | Information deletion | Yes | ✅ | — | Retention schedule; cryptographic erasure |
| 8.11 | Data masking | Yes | 🟡 | Production data masking in dev/test environments in progress (Q3) | Data classification policy |
| 8.12 | Data leakage prevention | Yes | 🟡 | DLP policies deployed for email and cloud storage; endpoint DLP roadmap Q4 | DLP tool; data classification policy |
| 8.13 | Information backup | Yes | ✅ | — | Backup policy; quarterly restore tests |
| 8.14 | Redundancy of information processing facilities | Yes | ✅ | — | Multi-AZ / multi-region; failover tested |
| 8.15 | Logging | Yes | ✅ | — | SIEM (Splunk / Datadog); log retention ≥90 days |
| 8.16 | Monitoring activities | Yes | ✅ | — | SIEM dashboards; anomaly detection; alerting |
| 8.17 | Clock synchronisation | Yes | ✅ | — | NTP configured on all systems |
| 8.18 | Use of privileged utility programs | Yes | ✅ | — | Privileged tool allowlist; admin access via PAM |
| 8.19 | Installation of software on operational systems | Yes | ✅ | — | Software allowlist; MDM enforcement; change control |
| 8.20 | Networks security | Yes | ✅ | — | Firewall; WAF; network segmentation; VPN |
| 8.21 | Security of network services | Yes | ✅ | — | NSP SLAs; secure configuration of network services |
| 8.22 | Segregation of networks | Yes | ✅ | — | VPC segmentation; DMZ; micro-segmentation roadmap |
| 8.23 | Web filtering | Yes | ✅ | — | DNS filtering; proxy (Zscaler / Cloudflare Gateway) |
| 8.24 | Use of cryptography | Yes | ✅ | — | `policies/cryptography-policy.md`; TLS 1.2+; AES-256 |
| 8.25 | Secure development life cycle | Yes | ✅ | — | `policies/secure-development-policy.md`; SDLC checklist |
| 8.26 | Application security requirements | Yes | ✅ | — | Security requirements template; threat modelling |
| 8.27 | Secure system architecture and engineering principles | Yes | 🟡 | Architecture review board (ARB) establishing formal process Q2 | Threat modelling; security design reviews |
| 8.28 | Secure coding | Yes | ✅ | — | SAST (CodeQL / Semgrep); secure coding guidelines; PR review |
| 8.29 | Security testing in development and acceptance | Yes | ✅ | — | SAST/DAST in CI; DAST on staging; annual pen test |
| 8.30 | Outsourced development | Yes | ✅ | — | Vendor security addendum; code review for outsourced code |
| 8.31 | Separation of development, test and production environments | Yes | ✅ | — | Environment isolation; prod access restricted |
| 8.32 | Change management | Yes | ✅ | — | `policies/change-management-policy.md`; CR process; branch protection |
| 8.33 | Test information | Yes | ✅ | — | Test data management policy; data masking (see 8.11 gap) |
| 8.34 | Protection of information systems during audit testing | Yes | ✅ | — | Audit scope agreement; read-only access for auditors |

---

## Summary

| Section | Total Controls | Applicable | ✅ Implemented | 🟡 Partial | 🔴 Gap | ⚪ Excluded |
|---|---|---|---|---|---|---|
| 5. Organizational | 37 | 37 | 34 | 3 | 0 | 0 |
| 6. People | 8 | 8 | 8 | 0 | 0 | 0 |
| 7. Physical | 14 | 14 | 13 | 1 | 0 | 0 |
| 8. Technological | 34 | 34 | 29 | 5 | 0 | 0 |
| **Total** | **93** | **93** | **84** | **9** | **0** | **0** |

### Open Partial Gaps (Remediation Tracker)

| Control | Gap Description | Owner | Target Date |
|---|---|---|---|
| 5.8 | Project security requirements not consistently captured in PM tool | CISO | Q3 YYYY |
| 5.13 | Unstructured data (email, shared drives) not automatically labelled | DPO | Q4 YYYY |
| 5.21 | SBOM not yet generated for all software components | Eng | Q3 YYYY |
| 7.12 | On-premises cabling documentation incomplete | Facilities | Q2 YYYY |
| 8.11 | Production data not masked in dev/test environments | Eng | Q3 YYYY |
| 8.12 | Endpoint DLP not fully deployed (email + cloud storage covered) | Security | Q4 YYYY |
| 8.27 | Architecture review board process not formally documented | CISO | Q2 YYYY |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | CISO | Initial SoA |

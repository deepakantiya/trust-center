# CMMC Level 2 — Assessment Workbook

| Field | Value |
|---|---|
| **Framework** | CMMC 2.0, Level 2 |
| **Basis** | NIST SP 800-171 Rev 2 (110 practices across 14 domains) |
| **Assessment Type** | Third-party C3PAO assessment (required for DoD contracts handling CUI) OR annual self-assessment (for non-prioritized acquisitions) |
| **Owner** | CISO / GRC Lead |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Tri-annual (C3PAO) or Annual (self-assessment) |
| **Scope** | All systems processing, storing, or transmitting Controlled Unclassified Information (CUI) |

> Level 2 includes **all 17 Level 1 practices** plus **93 additional practices** for a total of 110. This workbook covers the Level 2 additions organized by NIST SP 800-171 family. Reference [`level-1-assessment.md`](level-1-assessment.md) for Level 1 practices.

**Legend:** ✅ MET · 🟡 Partially Implemented · 🔴 NOT MET · ⚪ Not Applicable (N/A — must be justified)

**Scoring:** Each practice = 1 point. Maximum score = 110. Any NOT MET = -1 from maximum. SPRS score = 110 minus sum of practice weights for NOT MET practices (some practices carry higher negative weight — consult NIST SP 800-171A DoD Assessment Methodology).

---

## AC — Access Control (17 practices total; 13 Level 2 additions)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| AC.2.005 | Provide privacy and security notices on information systems | ✅ | Privacy notice on login page and website; system use notification banner on remote access | Login page screenshot; banner config |
| AC.2.006 | Limit use of portable storage devices on external systems | 🟡 | MDM blocks USB mass storage on corporate devices; BYOD USB policy in employee handbook; enforcement via DLP in progress | MDM policy config; DLP roadmap |
| AC.2.007 | Employ the principle of least privilege | ✅ | RBAC; PAM for privileged access; quarterly access review; no standing admin access to prod | RBAC matrix; PAM config; access review records |
| AC.2.008 | Use non-privileged accounts when accessing non-security functions | ✅ | Admins have separate standard and admin accounts; admin accounts used only for privileged tasks | Account policy; PAM audit logs |
| AC.2.009 | Limit unsuccessful logon attempts | ✅ | IdP: 5 failed attempts → 30-minute lockout; account unlock requires IT ticket | IdP lockout policy screenshot |
| AC.2.010 | Use session lock with pattern-hiding after period of inactivity | ✅ | Endpoint: auto-lock after 10 minutes; web apps: 30-minute session timeout | MDM config; app session config |
| AC.2.011 | Authorize wireless access prior to connections | ✅ | Corporate Wi-Fi requires certificate-based auth (802.1X); guest Wi-Fi isolated; no auto-connect | Wi-Fi controller config; certificate policy |
| AC.2.012 | Protect wireless access using authentication and encryption | ✅ | WPA3-Enterprise with AES-256; mutual authentication; SSID hidden for corporate | Wi-Fi config; encryption audit |
| AC.2.013 | Monitor and control remote access sessions | ✅ | VPN required for all remote access; VPN logs forwarded to SIEM; session recording for privileged remote access | VPN config; SIEM logs; PAM session recording |
| AC.2.014 | Employ cryptographic mechanisms for remote access | ✅ | VPN uses TLS 1.3 with certificate authentication; SSH key-based only (no password auth) | VPN crypto config; SSH server config |
| AC.2.015 | Route remote access via managed access control points | ✅ | All remote access through VPN gateway; no split tunneling for CUI systems | VPN policy; no split-tunnel config |
| AC.2.016 | Control CUI flow in accordance with approved authorizations | 🟡 | Data classification policy in place; DLP for email and cloud; endpoint DLP gap (see POA&M POAM-L2-001) | Data classification policy; DLP reports |
| AC.3.017 | Separate duties of individuals to reduce risk | ✅ | Prod deploy requires separate approver from developer; finance approvals require dual approval; code review mandatory | PR policy; SoD matrix |
| AC.3.018 | Prevent non-privileged users from executing privileged functions and capture in audit logs | ✅ | RBAC prevents privilege escalation; all sudo/admin commands logged in SIEM; PAM records privileged sessions | SIEM privilege event logs; PAM audit trail |
| AC.3.019 | Terminate sessions after defined conditions | ✅ | Sessions terminated on: logout, inactivity timeout, credential change, policy change | IdP session policy; app session config |
| AC.3.020 | Control connection of mobile devices | ✅ | All mobile devices enrolled in MDM before accessing CUI systems; MDM enforces encryption + remote wipe | MDM enrollment report; MDM compliance policy |
| AC.3.021 | Authorize remote execution of privileged commands | ✅ | Privileged remote commands require PAM session (just-in-time); session recorded; approved by CISO policy | PAM config; JIT access records |

---

## AT — Awareness and Training (3 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| AT.2.056 | Ensure personnel are aware of security risks | ✅ | Annual security awareness training; phishing simulations quarterly; security newsletter | LMS completion report; phishing sim results |
| AT.2.057 | Ensure personnel are trained to carry out assigned security responsibilities | ✅ | Role-based security training for engineering (SSDLC), GRC (controls), IR team (IR tabletop) | Role-based training records |
| AT.3.058 | Provide security awareness training on recognizing and reporting threats | ✅ | Phishing reporting button in email client; training includes social engineering; monthly security tips | Phishing report metrics; training content |

---

## AU — Audit and Accountability (9 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| AU.2.041 | Create and retain audit logs to enable monitoring, analysis, and investigation | ✅ | SIEM collects logs from all CUI systems; retention ≥90 days hot, 1 year cold | SIEM log source list; retention policy |
| AU.2.042 | Ensure individual actions can be traced to users | ✅ | All user actions logged with user ID, timestamp, IP; no shared accounts on CUI systems | SIEM user activity samples; account policy |
| AU.3.045 | Review and update logged events | ✅ | Log source list reviewed quarterly; new systems onboarded to SIEM within 30 days | Log source register; SIEM onboarding records |
| AU.3.046 | Alert in the event of audit logging process failure | ✅ | SIEM alerts on log source inactivity >1 hour; on-call paged | SIEM alert rule config |
| AU.3.048 | Collect audit information into one or more central repositories | ✅ | Centralized SIEM with all log sources; read-only log shipping to immutable storage | SIEM architecture diagram |
| AU.3.049 | Protect audit information and tools from unauthorized access, modification, and deletion | ✅ | Log storage is write-once (S3 Object Lock / Azure Immutable Blob); SIEM access restricted to security team | Storage policy config; SIEM RBAC |
| AU.3.050 | Limit management of audit logging to a subset of privileged users | ✅ | SIEM admin restricted to security team (3 named admins); changes require ticket | SIEM admin list; change records |
| AU.3.051 | Correlate audit record review, analysis, and reporting processes | ✅ | SIEM correlation rules; automated threat detection; weekly security summary report | SIEM correlation rule list; weekly report |
| AU.3.052 | Provide audit record reduction and report generation | ✅ | SIEM dashboards; automated weekly and monthly reports; GRC tool for compliance reporting | SIEM report samples |

---

## CA — Security Assessment (4 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| CA.2.157 | Periodically assess security controls for effectiveness | ✅ | Annual internal audit + quarterly control testing (see `../soc2/testing-procedures.md`) | Internal audit reports; testing records |
| CA.2.158 | Develop and implement plans of action to correct deficiencies | ✅ | POA&M maintained (see `poam.md`); monthly status review | POA&M; status review records |
| CA.2.159 | Monitor security controls on an ongoing basis | ✅ | Continuous monitoring via SIEM, vulnerability scanner, and compliance tool | SIEM dashboards; scanner reports |
| CA.3.161 | Conduct and implement a thorough risk assessment | ✅ | Annual risk assessment; risk register; treatment plans | Risk register; treatment plan |

---

## CM — Configuration Management (9 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| CM.2.061 | Establish and maintain baseline configurations | ✅ | CIS Benchmark hardening baselines; IaC (Terraform) for cloud; OS hardening scripts | Hardening standards; Terraform configs |
| CM.2.062 | Establish and maintain configurations for information technology products | ✅ | Golden AMIs / container images with hardening applied; drift detection in CI | Golden image pipeline; drift alerts |
| CM.2.063 | Control and monitor user-installed software | ✅ | MDM enforces software allowlist; unapproved software blocked; exceptions require IT approval | MDM allowlist config; exception records |
| CM.2.064 | Establish and enforce security configuration settings | ✅ | CIS Level 2 baselines for OS, cloud, and SaaS; automated compliance scanning | CIS-CAT / ScoutSuite reports |
| CM.2.065 | Track, review, approve, and log changes to systems | ✅ | Change management policy; all infra changes via IaC PR; change log in ticketing | Change policy; PR history; change log |
| CM.3.068 | Define, document, approve, and enforce physical and logical access restrictions associated with changes | ✅ | Branch protection prevents unauthorized changes; prod deploy requires separate approver | Branch protection config; deploy approval log |
| CM.3.069 | Employ principle of least functionality | 🟡 | Cloud services restricted to required services; endpoint software allowlist; some legacy services still rationalizing | Cloud policy; allowlist; legacy service register |
| CM.3.071 | Perform penetration testing periodically | ✅ | Annual external penetration test; scope includes CUI systems | Pen test report |
| CM.3.072 | Apply deny-by-default, allow-by-exception for systems | ✅ | Default-deny firewall rules; explicit allowlisting required for any new service exposure | Firewall policy; allowlist change records |

---

## IA — Identification and Authentication (11 practices total; 9 Level 2 additions)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| IA.2.078 | Enforce minimum password complexity and change requirements | ✅ | Minimum 14 characters; complexity required; password history 10; no user-defined expiry (breached pwd check instead) | IdP password policy screenshot |
| IA.2.079 | Prohibit password reuse | ✅ | Password history enforced (last 10 passwords blocked) | IdP config |
| IA.2.080 | Allow temporary password use with immediate change on first logon | ✅ | Temporary passwords force change on first login; TTL 24 hours | IdP config screenshot |
| IA.2.081 | Store and transmit only cryptographically protected passwords | ✅ | Passwords stored as bcrypt (work factor 12+); TLS 1.3 for all auth traffic | Code review; IdP config |
| IA.2.082 | Identify and authenticate before allowing actions on behalf of another | ✅ | Service account auth required for all automated actions; API keys unique per service | API key registry; service account policy |
| IA.3.083 | Use multifactor authentication for local and network access to privileged accounts | ✅ | MFA required for all accounts; phishing-resistant FIDO2 for privileged accounts (in rollout — Q2) | IdP MFA policy; FIDO2 rollout plan |
| IA.3.084 | Use multifactor authentication for network access to non-privileged accounts | ✅ | MFA required for all users (no exceptions) | IdP MFA policy |
| IA.3.085 | Employ replay-resistant authentication mechanisms | ✅ | FIDO2/WebAuthn replay-resistant by design; TOTP acceptable for non-privileged | FIDO2 config; auth protocol review |
| IA.3.086 | Disable identifiers after defined period of inactivity | ✅ | Inactive accounts disabled after 90 days (automated IdP rule); service accounts reviewed quarterly | IdP automation config; SA review records |

---

## IR — Incident Response (3 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| IR.2.092 | Establish an operational incident-handling capability | ✅ | IR plan; runbooks; on-call rotation; annual tabletop | IR policy; runbooks; tabletop records |
| IR.2.093 | Track, document, and report incidents | ✅ | All incidents tracked in ticketing system; postmortems for P1/P2; regulatory notification process | IR ticket history; postmortems |
| IR.3.098 | Track and test incident response capability; incorporate lessons learned | ✅ | Annual tabletop; lessons-learned register; IR plan updated after each P1 | Tabletop reports; lessons-learned tracker; IR plan version history |

---

## MA — Maintenance (2 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| MA.2.111 | Perform maintenance on organizational systems | ✅ | Patch management process; vendor maintenance agreements; CSP SLAs | Patch log; maintenance records |
| MA.2.112 | Provide controls on the tools, techniques, mechanisms, and personnel that conduct maintenance | ✅ | Remote maintenance via PAM with session recording; maintenance windows tracked | PAM config; maintenance window records |

---

## MP — Media Protection (9 practices total; 8 Level 2 additions)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| MP.2.119 | Protect system media containing CUI both paper and digital | ✅ | Encrypted endpoints (BitLocker/FileVault); digital media encrypted; paper CUI handled per classification policy | MDM encryption report; media handling procedure |
| MP.2.120 | Limit access to CUI on system media to authorized users | ✅ | CUI stored in access-controlled repositories; media access log | Repository access matrix; access log |
| MP.3.122 | Mark media with necessary CUI markings and distribution limitations | 🟡 | Digital files use folder naming convention; automated labelling tool in evaluation | Labelling convention doc; tool evaluation status |
| MP.3.123 | Prohibit use of portable storage unless identifiable owner can be identified | ✅ | USB storage blocked via MDM except for pre-approved, asset-tagged drives | MDM policy; approved drive register |
| MP.3.124 | Control access to media containing CUI during transport | ✅ | Encrypted drives required for CUI transport; chain of custody for physical media | Transport policy; encryption requirement |
| MP.3.125 | Implement cryptographic mechanisms for CUI on portable storage | ✅ | Approved USB drives must be encrypted (BitLocker to Go); unencrypted drives blocked by MDM | MDM USB encryption policy |
| MP.3.126 | Control use of portable storage on external systems | ✅ | External system USB policy aligned to AC.2.006; laptop USB restricted | MDM policy |
| MP.4.136 | Mark CUI and system outputs with CUI markings | 🟡 | Manual marking process; automation roadmap Q4 | Marking procedure; automation project |

---

## PS — Personnel Security (2 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| PS.2.127 | Screen individuals prior to authorizing access to systems | ✅ | Background checks at hire; annual re-screening for privileged roles | Background check records; HR policy |
| PS.3.128 | Ensure CUI is protected during and after personnel actions | ✅ | Offboarding checklist includes CUI data return/destruction; NDAs remain in effect post-employment | Offboarding records; NDA policy |

---

## RA — Risk Assessment (3 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| RM.2.141 | Periodically assess risk to operations, assets, and individuals | ✅ | Annual risk assessment; quarterly risk register update; threat modelling for new features | Risk register; threat model records |
| RM.2.142 | Scan for vulnerabilities in systems periodically | ✅ | Weekly automated scanning; continuous cloud security posture management | Scanner reports; CSPM config |
| RM.3.144 | Manage noncompliance with security requirements | ✅ | POA&M process; exception process with CISO approval; compensating controls documented | POA&M; exception register |

---

## CA — Security Assessment (continued — see above)

---

## SC — System and Communications Protection (16 practices total; 14 Level 2 additions)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| SC.2.178 | Prohibit remote activation of collaborative computing devices | ✅ | Conference room cameras require physical button to activate; laptop cameras covered when not in use | Policy; hardware controls |
| SC.3.177 | Employ FIPS-validated cryptography to protect CUI | 🟡 | TLS 1.3 with FIPS-validated cipher suites for external comms; internal service mesh in progress | TLS config; FIPS validation certs |
| SC.3.181 | Remove or disable unnecessary functions, ports, protocols, and services | ✅ | Port scan quarterly; unused services disabled; CIS Benchmark applied | Port scan reports; hardening records |
| SC.3.182 | Prevent unauthorized and unintended information transfer | ✅ | Network segmentation; DLP for email and cloud; egress filtering | Network diagram; DLP reports |
| SC.3.183 | Control and monitor communications at system boundaries | ✅ | Perimeter firewall + WAF + SIEM at all boundaries | Firewall config; SIEM boundary logs |
| SC.3.184 | Implement architectural designs, software development techniques, and systems engineering principles | ✅ | Secure SDLC; threat modelling; architecture review; secure coding guidelines | SDLC policy; threat model templates |
| SC.3.185 | Separate user functionality from system management functionality | ✅ | Management interfaces on separate network segment; admin consoles not exposed to internet | Network diagram; admin interface config |
| SC.3.186 | Prevent unauthorized and unintended information transfer via shared system resources | ✅ | Multi-tenant isolation; container isolation; memory protection | Architecture review; isolation test results |
| SC.3.187 | Implement cryptographic key management | ✅ | Key management via cloud KMS (AWS KMS / Azure Key Vault); key rotation policy | KMS config; key rotation records |
| SC.3.188 | Protect wireless and network communications | ✅ | WPA3-Enterprise; TLS for all internal service-to-service comms | Wi-Fi config; mTLS config |
| SC.3.189 | Terminate network connections after period of inactivity | ✅ | VPN session timeout; application session timeout; TCP keepalive with limits | VPN config; app session config |
| SC.3.190 | Establish and manage encryption keys for cryptography | ✅ | KMS-managed keys; key versioning; automated rotation | KMS key policy |
| SC.3.192 | Implement DNS filtering to block malicious domains | ✅ | DNS-layer filtering (Cloudflare Gateway / Cisco Umbrella) | DNS filter config; block logs |
| SC.3.193 | Implement a policy to ensure the security of information in networks | ✅ | Network security policy; firewall rules reviewed quarterly | Network policy; firewall audit records |

---

## SI — System and Information Integrity (7 practices total; 5 Level 2 additions)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| SI.2.214 | Monitor system security alerts and advisories | ✅ | SIEM alerts; threat intel feeds; US-CERT CISA alerts subscribed | SIEM config; threat intel subscription |
| SI.2.216 | Monitor systems to detect attacks and indicators of compromise | ✅ | EDR behavioral detection; SIEM correlation rules; network anomaly detection | EDR config; SIEM rules; anomaly detection config |
| SI.2.217 | Identify unauthorized use of systems | ✅ | SIEM user behavior analytics; baseline deviation alerts; UEBA rules | SIEM UEBA config; alert samples |
| SI.3.218 | Implement spam protection | ✅ | Email gateway with spam/phishing filtering; DMARC/DKIM/SPF configured | Email gateway config; DNS records |
| SI.3.219 | Implement email forgery protections | ✅ | DMARC policy: reject; DKIM signing; SPF strict | DNS DMARC/DKIM/SPF records; DMARC report |

---

## SA — System and Services Acquisition (2 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| SA.2.068 | Include security requirements in acquisition contracts | ✅ | Security addendum in all software and service vendor contracts | Contract templates; vendor register |
| SA.3.072 | Define and execute penetration testing strategy | ✅ | Annual penetration test; scope includes CUI systems; findings tracked to closure | Pen test reports; remediation records |

---

## RE — Recovery (2 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| RE.2.137 | Regularly perform and test data backups | ✅ | Daily automated backups; quarterly restore tests; 30-day retention minimum | Backup logs; restore test records |
| RE.3.139 | Develop and implement plans and procedures to recover after a disruption | ✅ | DR plan; annual DR exercise; documented RTO/RPO targets | DR plan; exercise records |

---

## SR — Supply Chain Risk Management (3 practices)

| Practice | Requirement Summary | Status | Implementation Notes | Evidence |
|---|---|---|---|---|
| SR.2.150 | Establish a supply chain risk management plan | ✅ | Vendor risk management policy; Tier 1/2 vendor assessment programme | Vendor policy; assessment records |
| SR.3.169 | Implement a software bill of materials (SBOM) | 🟡 | SBOM generation in progress (Q3); SCA scanning in CI covers known vulnerabilities | SCA scan reports; SBOM project plan |
| SR.3.170 | Employ threat intelligence to manage supply chain risks | 🟡 | Threat intel feeds subscribed; vendor breach monitoring in evaluation | Threat intel subscription; vendor monitoring evaluation |

---

## Assessment Score Summary

| Domain | Practices | MET | Partial | NOT MET | N/A |
|---|---|---|---|---|---|
| AC — Access Control | 17 | 15 | 2 | 0 | 0 |
| AT — Awareness & Training | 3 | 3 | 0 | 0 | 0 |
| AU — Audit & Accountability | 9 | 9 | 0 | 0 | 0 |
| CA — Security Assessment | 4 | 4 | 0 | 0 | 0 |
| CM — Configuration Mgmt | 9 | 7 | 2 | 0 | 0 |
| IA — Identification & Auth | 11 | 10 | 1 | 0 | 0 |
| IR — Incident Response | 3 | 3 | 0 | 0 | 0 |
| MA — Maintenance | 2 | 2 | 0 | 0 | 0 |
| MP — Media Protection | 9 | 7 | 2 | 0 | 0 |
| PS — Personnel Security | 2 | 2 | 0 | 0 | 0 |
| RA — Risk Assessment | 3 | 3 | 0 | 0 | 0 |
| SC — System & Comms | 16 | 14 | 2 | 0 | 0 |
| SI — System & Info Integrity | 7 | 7 | 0 | 0 | 0 |
| SA — System Acquisition | 2 | 2 | 0 | 0 | 0 |
| RE — Recovery | 2 | 2 | 0 | 0 | 0 |
| SR — Supply Chain Risk | 3 | 1 | 2 | 0 | 0 |
| **Total** | **110** | **91** | **13** | **0** | **0** |

> Partially implemented practices require POA&M entries. See [`poam.md`](poam.md) for active remediation items. Practices that are "Partial" contribute negative weight to the SPRS score per the DoD Assessment Methodology until fully implemented.

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | CISO / GRC Lead | Initial Level 2 assessment |

# ISO/SAE 21434:2021 — Cybersecurity Control Mapping

| Field | Value |
|---|---|
| **Standard** | ISO/SAE 21434:2021 — Road vehicles: Cybersecurity engineering |
| **Owner** | Cybersecurity Manager / CISO |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Applicability** | OEM, Tier 1 / Tier 2 suppliers developing vehicle components or systems with cybersecurity relevance |

**Legend:** ✅ Implemented · 🟡 Partial · 🔴 Gap · ⚪ Not in scope · — Not required by clause

---

## Clause 5 — Organizational Cybersecurity Management

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 5.4.1 | Cybersecurity policy established and maintained | ✅ | CISO | `policies/information-security-policy.md`; cybersecurity policy doc |
| 5.4.2 | Cybersecurity roles and responsibilities defined | ✅ | CISO | RACI matrix; CSMS role descriptions |
| 5.4.3 | Cybersecurity management system (CSMS) documented | 🟡 | CISO | CSMS manual (draft — complete Q2) |
| 5.4.4 | Communication with relevant authorities and stakeholders | ✅ | CISO | IR policy; ISAC membership; contact register |
| 5.4.5 | Organization-specific rules and processes for cybersecurity | ✅ | CISO | Policy library; secure dev policy |
| 5.4.6 | Cybersecurity culture | 🟡 | HR / CISO | Annual training done; role-specific automotive cyber training roadmap Q3 |
| 5.4.7 | Management of cybersecurity tools | ✅ | Security Eng | Tool inventory; approved toolchain list |
| 5.4.8 | Competence management | 🟡 | HR | Job descriptions updated; automotive cyber cert programme (Q4) |
| 5.4.9 | Continuous improvement | ✅ | CISO | Post-incident reviews; annual CSMS review |

---

## Clause 6 — Project-Dependent Cybersecurity Management

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 6.4.1 | Cybersecurity responsibilities assigned at project level | ✅ | Project Manager | Project cybersecurity plan template |
| 6.4.2 | Cybersecurity plan created for each project | 🟡 | Project Manager | Template exists; consistent application in progress |
| 6.4.3 | Release for post-development | ✅ | Release Eng | Release checklist includes cybersecurity sign-off |
| 6.4.4 | Cybersecurity case | 🟡 | Product Security | Work in progress for active programmes |
| 6.4.5 | Evidence created and maintained | 🟡 | GRC | `evidence/` folder; artefact tracking being formalized |

---

## Clause 7 — Distributed Cybersecurity Activities (Supply Chain)

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 7.4.1 | Cybersecurity requirements communicated to suppliers | ✅ | Procurement | Cybersecurity addendum in supplier contracts |
| 7.4.2 | Supplier cybersecurity capabilities assessed | 🟡 | GRC | Tier 1 supplier assessments done; Tier 2 in progress |
| 7.4.3 | Off-the-shelf component cybersecurity management | 🟡 | Eng | SBOM for OTS components in progress (Q3) |
| 7.4.4 | Cybersecurity interface agreements | ✅ | Legal | Interface agreements templated; active for Tier 1 suppliers |

---

## Clause 8 — Continual Cybersecurity Activities

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 8.3 | Cybersecurity monitoring | ✅ | Security Eng | SIEM; threat intel feeds; CVE monitoring |
| 8.4 | Cybersecurity event assessment | ✅ | Security Eng | IR triage runbook; severity matrix |
| 8.5 | Vulnerability analysis (post-production) | 🟡 | Product Security | CVE monitoring active; field vulnerability workflow formalizing (Q2) |
| 8.6 | Cybersecurity incident response (in-field) | ✅ | Security Eng | `incident-response/runbook-account-compromise.md`; vehicle IR runbook (see `tara-template.md`) |
| 8.7 | Updates (OTA security patches) | 🟡 | Eng | OTA capability exists; security patch SLA for field vehicles formalizing (Q3) |
| 8.9 | Cryptographic agility management | 🟡 | Security Eng | Crypto policy exists; algorithm deprecation process in progress |

---

## Clause 9 — Concept Phase

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 9.3 | Item definition | ✅ | System Eng | Item definition documents per programme |
| 9.4 | Threat Analysis and Risk Assessment (TARA) | 🟡 | Product Security | TARA template available (see [`tara-template.md`](tara-template.md)); execution per programme required |
| 9.5 | Cybersecurity goals | 🟡 | Product Security | Goals derived from TARA; formalization in progress |
| 9.6 | Cybersecurity claims | 🟡 | Product Security | Claims linked to goals; cybersecurity case structure in progress |
| 9.7 | Cybersecurity concept | 🟡 | Product Security | Concept document per programme; template exists |

---

## Clause 10 — Product Development

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 10.4.1 | Cybersecurity requirements specification | ✅ | Product Security | Security requirements template; JIRA integration |
| 10.4.2 | Secure design | ✅ | Eng | Threat modelling; architecture review; hardening standards |
| 10.4.3 | Cybersecurity implementation | 🟡 | Eng | SAST/DAST in CI; secure coding guidelines; automotive-specific guidelines in progress |
| 10.4.4 | Integration and verification | 🟡 | QA | Security regression tests; integration test plan for cyber requirements |

---

## Clause 11 — Cybersecurity Validation

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 11.1 | Cybersecurity validation plan | 🟡 | Product Security | Validation plan template; per-programme execution required |
| 11.2 | Penetration testing at vehicle level | 🟡 | Security Eng | Annual pen test covers software; vehicle-level pen test scheduled Q4 |
| 11.3 | Fuzz testing | 🟡 | QA / Security | Fuzz testing tooling (libFuzzer/AFL) exists; coverage expanding |

---

## Clause 12 — Production

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 12.1 | Production control plan | 🟡 | Manufacturing Eng | Cybersecurity requirements in production SOP; formal plan Q2 |
| 12.2 | Production cybersecurity controls | ✅ | Manufacturing Eng | Key provisioning process; secure boot enabled; ECU serialization |

---

## Clause 13 — Operations and Maintenance

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 13.3 | Cybersecurity monitoring in field | ✅ | Security Eng | Field telemetry; CVE monitoring; threat intel |
| 13.4 | Cybersecurity incident response (operations) | ✅ | Security Eng | IR plan; escalation path; customer communication template |
| 13.5 | Vulnerability management in field | 🟡 | Product Security | Triage process active; SLA for OTA patch deployment formalizing |
| 13.6 | Updates and patches (OTA) | 🟡 | Eng | OTA infrastructure; code signing (done); rollout procedure formalizing |

---

## Clause 14 — End of Cybersecurity Support

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 14.1 | End of cybersecurity support planning | 🟡 | Product Management | EoCS policy drafted; customer communication templates in progress |
| 14.2 | End of cybersecurity support notification | 🟡 | Legal / PM | Notification process defined; first EoCS event triggers full implementation |

---

## Clause 15 — Incident Response (ISO/SAE 21434 specific)

| Req ID | Requirement | Status | Owner | Evidence / Artefact |
|---|---|---|---|---|
| 15.1 | Cybersecurity incident response plan | ✅ | CISO | `policies/incident-response-policy.md`; vehicle-specific IR addendum |
| 15.3 | Vulnerability disclosure | 🟡 | CISO | `website/.well-known/security.txt`; coordinated disclosure policy in progress |
| 15.4 | Cybersecurity event and incident detection | ✅ | Security Eng | SIEM; field telemetry monitoring; alert routing |
| 15.5 | Cybersecurity incident handling | ✅ | Security Eng | IR runbooks; escalation matrix; forensics procedure |
| 15.6 | Post-incident review | ✅ | CISO | Post-incident review template; lessons-learned register |

---

## Summary

| Clause | Total Reqs | ✅ | 🟡 | 🔴 | ⚪ |
|---|---|---|---|---|---|
| 5 — Organizational | 9 | 5 | 4 | 0 | 0 |
| 6 — Project Management | 5 | 2 | 3 | 0 | 0 |
| 7 — Supply Chain | 4 | 2 | 2 | 0 | 0 |
| 8 — Continual Activities | 6 | 3 | 3 | 0 | 0 |
| 9 — Concept Phase | 5 | 1 | 4 | 0 | 0 |
| 10 — Product Development | 4 | 2 | 2 | 0 | 0 |
| 11 — Validation | 3 | 0 | 3 | 0 | 0 |
| 12 — Production | 2 | 1 | 1 | 0 | 0 |
| 13 — Operations | 4 | 2 | 2 | 0 | 0 |
| 14 — End of Support | 2 | 0 | 2 | 0 | 0 |
| 15 — Incident Response | 5 | 4 | 1 | 0 | 0 |
| **Total** | **49** | **22** | **27** | **0** | **0** |

### Priority Gaps for Remediation (🟡 → ✅)

| ID | Requirement | Priority | Target Date |
|---|---|---|---|
| 5.4.3 | CSMS manual | High | Q2 YYYY |
| 9.4 | TARA execution per programme | High | Q2 YYYY |
| 10.4.3 | Automotive-specific secure coding | Medium | Q3 YYYY |
| 11.2 | Vehicle-level penetration test | High | Q4 YYYY |
| 7.4.3 | SBOM for OTS components | Medium | Q3 YYYY |
| 14.1 | End of cybersecurity support policy | Medium | Q3 YYYY |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | Cybersecurity Manager | Initial mapping |

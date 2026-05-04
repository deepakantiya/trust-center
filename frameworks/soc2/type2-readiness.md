# SOC 2 Type II — Readiness Guide

| Field | Value |
|---|---|
| **Standard** | AICPA Trust Services Criteria (2017, updated 2022) |
| **Owner** | CISO / GRC Lead |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual (pre-audit) |
| **Related** | [`../../controls/control-matrix.md`](../../controls/control-matrix.md) |

---

## 1. Type I vs. Type II: What Changes

| Dimension | Type I | Type II |
|---|---|---|
| **Opinion covers** | Design of controls as of a specific date | Design *and* operating effectiveness over an audit period |
| **Audit period** | Point in time (one day) | 6–12 months (most auditors require ≥6 months) |
| **Testing** | Auditor inspects control design only | Auditor tests controls operated throughout the period (sampling) |
| **Evidence volume** | Moderate (policies, configurations) | High (tickets, logs, screenshots, access review records for each sample) |
| **Sampling** | Not applicable | Required — auditor selects samples from the population |
| **Exceptions** | N/A | Any sample that fails is an "exception" and must be explained or remediated |
| **Customer value** | Demonstrates intent | Demonstrates execution — customers and enterprise procurement prefer Type II |

---

## 2. Audit Period Planning

### Recommended Timeline

| Milestone | Target Date | Notes |
|---|---|---|
| Controls in steady-state (Type I readiness) | T-0 | All controls from `control-matrix.md` showing ✅ |
| Audit period start | T+0 | Formally notify auditor; evidence collection begins |
| Midpoint internal review | T+3 months | Test a sample of controls internally; fix exceptions early |
| Pre-audit readiness assessment | T+5 months | Dry-run with auditor or internal GRC team |
| Audit period end | T+6 months | Evidence collection closes |
| Auditor fieldwork begins | T+6 to T+8 | Auditor requests evidence packages; expect 4–6 weeks |
| Draft report issued | T+9 | Review for factual accuracy; respond to exceptions |
| Final report issued | T+10 | Distribute to customers under NDA |

---

## 3. Operating Effectiveness: What Auditors Test

### Evidence Populations and Sample Sizes

Auditors select samples from populations. The larger the population, the larger the sample. Common guidance (PCAOB / AICPA):

| Population Size | Typical Sample Size |
|---|---|
| 1–5 occurrences | 100% (all) |
| 6–25 occurrences | 5–10 |
| 26–50 occurrences | 15–25 |
| >50 occurrences | 25–60 |

### Per-Criterion Testing Guide

| TSC Criterion | Control | Population | What Auditor Samples | Evidence Format | Internal Control ID |
|---|---|---|---|---|---|
| CC6.1 | MFA enforced for all users | All user accounts | Screenshots of MFA settings; AD / IdP config | IdP export + screenshot | AS-1, AS-2, AS-7, AS-8, AS-9, AS-10 |
| CC6.2 | Quarterly access reviews | 4 quarterly reviews | Review completion records; approver sign-off | Email/ticket + export | AS-6, AS-7 |
| CC6.3 | Access removed within 24h of termination | All terminations in period | HR offboarding tickets; IdP deprovisioning timestamp | HR system + IdP log | AS-3 |
| CC6.6 | Vulnerability scans run monthly | 6 monthly scans | Scan reports (all systems); no critical CVEs unaddressed | Scan tool export | NS-2 |
| CC7.2 | SIEM alerts reviewed daily | All alert days in period | Alert queue screenshots; on-call records | SIEM dashboard export | NS-3 |
| CC7.4 | Incidents managed per IR plan | All incidents in period | IR tickets; postmortem docs; notification records | JIRA / ticketing system | IR-1, IR-2, IR-3, IR-4 |
| CC8.1 | Changes go through PR review | All production deployments | PRs with reviewer; CI passing; approval before merge | GitHub/GitLab PR list | CM-4, CM-5, CM-7, CM-8 |
| CC9.2 | Annual vendor review | All Tier 1 vendors | Vendor assessment records; risk ratings | GRC tool export | RA-1, RA-4, RA-6 |
| A1.2 | Backups tested quarterly | 4 quarterly restore tests | Restore test runbook; success confirmation | Restore test records | AV-4 |
| CC4.1 | Control testing conducted | Annual schedule | Test workpapers; findings and remediation | GRC workpapers | OM-1, RA-2 |

---

## 4. Exception Management

An **exception** occurs when a sample fails the test. Exceptions do not automatically result in a qualified opinion, but they must be addressed:

| Severity | Definition | Response |
|---|---|---|
| **Isolated exception** | 1–2 failures in a large population with clear root cause | Document root cause + corrective action; auditor may note but not qualify |
| **Systemic exception** | Pattern of failures indicating control is not operating | Requires management response letter + remediation plan; likely impacts report |
| **Material weakness** | Control critical to the TSC is not operating and no compensating control exists | May result in qualified opinion; immediate remediation required |

### Exception Response Checklist

- [ ] Document the specific control, date, and nature of the failure
- [ ] Perform root-cause analysis (RCA) — was it a process failure, tool failure, or human error?
- [ ] Determine if the failure was isolated or systemic
- [ ] Identify and document any compensating controls that mitigated the risk
- [ ] Implement corrective action with owner and target date
- [ ] Communicate to auditor with full context before the management response deadline

---

## 5. Continuous Monitoring Controls

Type II requires controls to operate *continuously* throughout the audit period. These controls should be automated or have automated evidence collection:

| Control | Automation Status | Evidence Collection Method | Internal Control ID |
|---|---|---|---|
| MFA enforcement | ✅ Automated (IdP policy) | Monthly IdP config snapshot | AS-1, AS-9 |
| Vulnerability scanning | ✅ Automated (scanner) | Weekly scan reports auto-exported to `evidence/` | VM-1, VM-2 |
| SIEM alerting | ✅ Automated (SIEM) | Daily alert queue export; on-call acknowledgement logs | NS-3 |
| Backup execution | ✅ Automated (backup tool) | Backup job success logs; monthly summary | AV-4 |
| Access review | 🟡 Semi-automated (reminder + manual) | Quarterly calendar invite + signed-off export | AS-6, AS-7 |
| Offboarding deprovisioning | 🟡 Semi-automated (checklist + HR ticket) | HR ticket with deprovisioning timestamp | AS-3 |
| Vendor review | 🔴 Manual | Annual calendar event + assessment records | RA-1, RA-4, RA-6 |

---

## 6. Pre-Audit Evidence Package Checklist

Prepare this package **before** the auditor arrives:

### Organizational Evidence
- [ ] Org chart (current)
- [ ] CISO / security team role descriptions
- [ ] Board / leadership security meeting minutes (from audit period)
- [ ] All security policies with version history and approval dates

### Access Control Evidence
- [ ] MFA configuration screenshot / export (beginning + end of period)
- [ ] RBAC / permission matrix for production systems
- [ ] All access provisioning tickets from audit period (sample-ready list)
- [ ] All termination tickets from audit period with deprovisioning timestamps
- [ ] All quarterly access review records (4 × quarterly)

### Vulnerability & Monitoring Evidence
- [ ] All vulnerability scan reports from audit period
- [ ] SIEM dashboard screenshots (monthly)
- [ ] Patch application records for Critical/High CVEs (within SLA)
- [ ] Annual external penetration test report

### Change Management Evidence
- [ ] List of all production deployments from audit period
- [ ] Sample of PRs showing: reviewer approval, CI passing, no direct push to main

### Incident Management Evidence
- [ ] IR plan + last test/tabletop date
- [ ] All incident tickets from audit period (including P1/P2)
- [ ] Post-incident review documents

### Backup & Recovery Evidence
- [ ] Backup policy
- [ ] All backup job success logs from audit period
- [ ] Quarterly restore test records (4)

### Vendor Management Evidence
- [ ] Vendor register (current)
- [ ] Annual vendor review records for all Tier 1 vendors
- [ ] Sample of vendor security addenda / DPAs

---

## 7. Auditor Communication Tips

- Designate a **single GRC point of contact** (POC) for all auditor requests
- Respond to evidence requests within **2 business days** — delays extend fieldwork and increase cost
- Never provide access to production systems; provide **exports, screenshots, and logs** instead
- If a control changed during the audit period, proactively disclose it and provide evidence for both states
- Review the draft report carefully — factual errors are easier to correct than inferences

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | GRC Lead | Initial Type II readiness guide |

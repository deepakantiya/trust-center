# SOC 2 Type II — Internal Testing Procedures

| Field | Value |
|---|---|
| **Owner** | GRC Lead |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Quarterly |
| **Purpose** | Validate operating effectiveness of TSC controls before external auditor fieldwork |

---

## How to Use This Document

Run these procedures **quarterly** as an internal control test. Document findings in the evidence folder. Address exceptions before the external auditor engages. Each procedure references the audit trail expected per the [Type II Readiness Guide](type2-readiness.md).

**Tester:** GRC Lead or designated Internal Auditor
**Sign-off:** CISO reviews and approves findings within 5 business days

---

## CC1 — Control Environment

### TEST-CC1.1 — Code of Conduct Acknowledgement
| Field | Detail |
|---|---|
| **Criterion** | CC1.1 |
| **Internal Control Ref** | OM-12 |
| **Objective** | Verify all active employees have signed the Code of Conduct in the current annual period |
| **Procedure** | 1. Pull list of all active employees from HR system. 2. Pull Code of Conduct acknowledgement list from HR/LMS. 3. Compare: identify any employees who have not signed. 4. For new hires (<90 days), confirm they signed at onboarding. |
| **Pass criteria** | 100% of employees with tenure >90 days have a signed acknowledgement dated within the last 12 months |
| **Evidence** | HR employee list (export) + LMS acknowledgement report |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CC1.4 — Security Training Completion
| Field | Detail |
|---|---|
| **Criterion** | CC1.4 |
| **Internal Control Ref** | OM-1, OM-4, OM-6 |
| **Objective** | Verify all employees completed annual security awareness training |
| **Procedure** | 1. Pull training completion report from LMS for the last 12 months. 2. Compare against current active employee list. 3. Note any employees >12 months since last completion. |
| **Pass criteria** | ≥95% completion rate; any incomplete employees have a training assignment active and a due date within 30 days |
| **Evidence** | LMS completion export |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

## CC6 — Logical and Physical Access

### TEST-CC6.1 — MFA Enforcement
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Internal Control Ref** | AS-1, AS-2, AS-7, AS-8, AS-9, AS-10 |
| **Objective** | Confirm MFA is enforced for all user accounts accessing production systems |
| **Procedure** | 1. Log into IdP admin console (Okta / Azure AD). 2. Navigate to MFA policy settings. 3. Screenshot MFA policy showing "Required for all users." 4. Pull list of any MFA exceptions. 5. Verify exceptions have compensating controls and CISO approval. |
| **Pass criteria** | MFA policy set to "Required"; zero unapproved exceptions |
| **Evidence** | IdP policy screenshot; exception list (if any) with CISO approval |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

### TEST-CC6.2 — Quarterly Access Review
| Field | Detail |
|---|---|
| **Criterion** | CC6.2 |
| **Internal Control Ref** | AS-6, AS-7 |
| **Objective** | Confirm quarterly access reviews were completed for all in-scope systems |
| **Procedure** | 1. Identify the most recent quarterly access review (should be within 90 days). 2. Obtain the completed review record (manager-signed export). 3. Verify all system owners / managers participated. 4. Confirm any excess privileges identified were revoked (pull deprovisioning tickets). |
| **Pass criteria** | Review completed within the quarter; all identified excess privileges revoked within 7 business days |
| **Evidence** | Access review export + approval emails / tickets + deprovisioning tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

### TEST-CC6.3 — Offboarding / Access Revocation
| Field | Detail |
|---|---|
| **Criterion** | CC6.3 |
| **Internal Control Ref** | AS-3 |
| **Objective** | Confirm terminated employees had all access revoked within 24 hours of termination |
| **Procedure** | 1. Pull list of terminations in the last quarter from HR. 2. For a sample (min 5 or 100% if <5), obtain: HR termination timestamp + IdP deprovisioning timestamp. 3. Calculate time delta. 4. Check GitHub, Slack, and other critical tools separately if not SSO-federated. |
| **Pass criteria** | All sampled terminations: IdP deprovisioned ≤24h from termination timestamp |
| **Evidence** | HR termination records + IdP audit log export |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

### TEST-CC6.6 — Vulnerability Scanning Cadence
| Field | Detail |
|---|---|
| **Criterion** | CC6.6, CC7.1 |
| **Internal Control Ref** | NS-2, VM-1, VM-2 |
| **Objective** | Confirm vulnerability scans ran on all production systems at least monthly |
| **Procedure** | 1. Log into vulnerability scanner (Qualys / Tenable / Wiz). 2. Pull scan history for the last 90 days. 3. Confirm all production IP ranges / cloud assets are in scope. 4. Verify scan frequency ≥ monthly per asset group. 5. Review Critical/High findings: confirm all are tracked with patch dates within SLA. |
| **Pass criteria** | Monthly scans complete; zero unaddressed Critical CVEs >48h old; zero unaddressed High CVEs >7 days old |
| **Evidence** | Scanner dashboard screenshot + findings export |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

## CC7 — System Operations

### TEST-CC7.2 — SIEM Log Monitoring
| Field | Detail |
|---|---|
| **Criterion** | CC7.2 |
| **Internal Control Ref** | NS-3 |
| **Objective** | Confirm security events are logged and alerts are reviewed daily |
| **Procedure** | 1. Log into SIEM (Splunk / Datadog / Sentinel). 2. Pull alert history for last 30 days. 3. Confirm on-call acknowledgement within SLA for each alert. 4. Spot-check log ingestion: verify all critical log sources active (cloud trail, IdP, endpoint). |
| **Pass criteria** | All P1/P2 alerts acknowledged within 15 minutes; all P3 within 4 hours; no log source gaps >1 hour |
| **Evidence** | SIEM alert history export + on-call acknowledgement log |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

### TEST-CC7.4 — Incident Response Execution
| Field | Detail |
|---|---|
| **Criterion** | CC7.4 |
| **Internal Control Ref** | IR-1, IR-2, IR-3, IR-4 |
| **Objective** | Verify all security incidents were handled per the IR plan with documented postmortems |
| **Procedure** | 1. Pull list of all security incidents from ticketing system (last quarter). 2. For each P1/P2, confirm: postmortem document exists; lessons learned captured; root cause addressed. 3. Verify incident notification SLAs met (customer notification ≤72h for breaches). |
| **Pass criteria** | All incidents have IR ticket + postmortem (P1/P2); notification SLAs met |
| **Evidence** | Incident ticket list + postmortem documents |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

## CC8 — Change Management

### TEST-CC8.1 — Production Change Controls
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Internal Control Ref** | CM-4, CM-5, CM-7, CM-8 |
| **Objective** | Confirm all production deployments went through peer review and CI before merge |
| **Procedure** | 1. Pull list of all production deployments in the last quarter (release log / deployment pipeline). 2. Select a sample (25 if population >50). 3. For each: locate the associated PR. 4. Verify: ≥1 reviewer approved; CI checks passed; no direct push to main branch. |
| **Pass criteria** | 100% of sampled deployments have peer review + CI pass; zero direct pushes to main |
| **Evidence** | Deployment log + sample PR links with approval records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

## A1 — Availability

### TEST-A1.2 — Backup and Restore Testing
| Field | Detail |
|---|---|
| **Criterion** | A1.2 |
| **Internal Control Ref** | AV-4 |
| **Objective** | Confirm backups run daily and restores are tested quarterly |
| **Procedure** | 1. Pull backup job history for the last quarter. 2. Confirm daily backup jobs completed successfully (no failures >24h unresolved). 3. Obtain the most recent restore test record. 4. Confirm restore test was completed within the last 90 days. 5. Verify restore test covers at least one critical database. |
| **Pass criteria** | Daily backups ≥98% success rate; restore test completed within 90 days with documented pass |
| **Evidence** | Backup tool success log + restore test runbook + completion record |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

## CC9 — Risk Mitigation

### TEST-CC9.2 — Vendor Risk Review
| Field | Detail |
|---|---|
| **Criterion** | CC9.2 |
| **Objective** | Confirm Tier 1 vendors were assessed annually and subprocessors are current |
| **Procedure** | 1. Pull vendor register. 2. For all Tier 1 vendors, confirm last assessment date ≤12 months. 3. Verify vendor register on Trust Center website matches internal register. 4. For any new Tier 1 vendors added this quarter, confirm security questionnaire was completed before go-live. |
| **Pass criteria** | 100% of Tier 1 vendors assessed within 12 months; subprocessor list current |
| **Evidence** | Vendor register + assessment records + Trust Center screenshot |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |

---

## Quarterly Test Summary

| Test ID | Criterion | Result | Exceptions | Tester | Date |
|---|---|---|---|---|---|
| TEST-CC1.1 | CC1.1 | | | | |
| TEST-CC1.4 | CC1.4 | | | | |
| TEST-CC6.1 | CC6.1 | | | | |
| TEST-CC6.2 | CC6.2 | | | | |
| TEST-CC6.3 | CC6.3 | | | | |
| TEST-CC6.6 | CC6.6, CC7.1 | | | | |
| TEST-CC7.2 | CC7.2 | | | | |
| TEST-CC7.4 | CC7.4 | | | | |
| TEST-CC8.1 | CC8.1 | | | | |
| TEST-A1.2 | A1.2 | | | | |
| TEST-CC9.2 | CC9.2 | | | | |

**Overall Result:** ☐ Pass (no exceptions) ☐ Pass with exceptions ☐ Fail

**CISO Sign-off:** ________________________ Date: __________

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | GRC Lead | Initial testing procedures |

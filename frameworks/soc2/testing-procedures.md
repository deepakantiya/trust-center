# SOC 2 Type II — Internal Testing Procedures

| Field | Value |
|---|---|
| **Owner** | GRC Lead |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Quarterly |
| **Purpose** | Validate operating effectiveness of TSC controls before external auditor fieldwork |

---

## How to Use This Document

Run these procedures **quarterly** as an internal control test. Document findings in the evidence folder. Address exceptions before the external auditor engages. Each procedure references the audit trail expected per the [Type II Readiness Guide](type2-readiness.md).

**Tester:** GRC Lead or designated Internal Auditor  
**Sign-off:** CISO reviews and approves findings within 5 business days

**Total Controls:** 58 across 10 categories

---

## Change Management (CC8)

### TEST-CM-01 — Segregation of Environments
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | Development, staging, and production environments are segregated |
| **Objective** | Verify that development, staging, and production environments are logically or physically separated |
| **Procedure** | 1. Review infrastructure architecture diagrams. 2. Verify network segmentation (VPCs, VLANs, or separate accounts). 3. Confirm different access controls exist for each environment. 4. Verify firewall rules prevent direct dev-to-prod communication. |
| **Pass Criteria** | Environments are in separate network segments; no direct access path from dev to prod |
| **Evidence** | Architecture diagram + network/firewall configuration exports |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-02 — Secure Development Policy
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | A Secure Development Policy defines the requirements for secure software and system development and maintenance |
| **Objective** | Verify existence and currency of Secure Development Policy |
| **Procedure** | 1. Obtain the current Secure Development Policy. 2. Verify policy was reviewed/approved within last 12 months. 3. Confirm policy addresses OWASP Top 10 or equivalent. 4. Verify policy is published and accessible to development teams. |
| **Pass Criteria** | Policy exists, is current (within 12 months), and addresses secure coding practices |
| **Evidence** | Policy document with approval signatures + publication location screenshot |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-03 — Production Data Use is Restricted
| Field | Detail |
|---|---|
| **Criterion** | C1.1 |
| **Control** | Production data is not used in the development and testing environments, unless required for debugging customer issues |
| **Objective** | Confirm production data is not copied to non-production environments without controls |
| **Procedure** | 1. Interview development team leads about data practices. 2. Review any data masking/anonymization tools in use. 3. Check for policies/procedures governing production data use. 4. If production data is used for debugging, verify approval process and data deletion afterward. |
| **Pass Criteria** | No production data in dev/test, or if used for debugging: documented approval + deletion within 7 days |
| **Evidence** | Interview notes + policy document + approval records (if applicable) |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-04 — Software Change Testing
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | Software changes are tested prior to being deployed into production |
| **Objective** | Verify all production deployments include testing prior to release |
| **Procedure** | 1. Sample 10 recent production deployments from the last quarter. 2. For each, verify test execution evidence (CI/CD logs, QA sign-off). 3. Confirm no deployments bypassed testing without documented exception. |
| **Pass Criteria** | 100% of sampled deployments have testing evidence; any exceptions have CISO approval |
| **Evidence** | CI/CD pipeline logs + QA sign-off records + deployment tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-05 — Baseline Configurations
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | Baseline configurations and codebases for production infrastructure, systems, and applications are securely managed |
| **Objective** | Verify secure management of baseline configurations |
| **Procedure** | 1. Identify tools used for configuration management (Terraform, Ansible, etc.). 2. Verify configurations are stored in version control. 3. Confirm access to configuration repos is restricted. 4. Check for configuration drift detection mechanisms. |
| **Pass Criteria** | Configurations in version control; access restricted to authorized personnel; drift detection enabled |
| **Evidence** | Repository access logs + configuration management tool screenshots |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-06 — Configuration and Asset Management Policy
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | A Configuration and Asset Management Policy governs configurations for new sensitive systems |
| **Objective** | Verify existence and implementation of Configuration and Asset Management Policy |
| **Procedure** | 1. Obtain current Configuration and Asset Management Policy. 2. Verify policy was reviewed within last 12 months. 3. Sample 3 recently provisioned systems and verify they follow the policy. |
| **Pass Criteria** | Policy exists and is current; sampled systems comply with policy requirements |
| **Evidence** | Policy document + system provisioning records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-07 — Approval for System Changes
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | System changes are approved by at least 1 independent person prior to deployment into production |
| **Objective** | Verify change approval process requires independent review |
| **Procedure** | 1. Sample 10 production changes from the last quarter. 2. For each, verify approval by someone other than the change author. 3. Confirm approval timestamp precedes deployment timestamp. |
| **Pass Criteria** | 100% of sampled changes have independent approval before deployment |
| **Evidence** | Change request tickets + approval records + deployment logs |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CM-08 — Change Management Policy
| Field | Detail |
|---|---|
| **Criterion** | CC8.1 |
| **Control** | A Change Management Policy governs the documenting, tracking, testing, and approving of system, network, security, and infrastructure changes |
| **Objective** | Verify existence and currency of Change Management Policy |
| **Procedure** | 1. Obtain current Change Management Policy. 2. Verify policy addresses: documentation, tracking, testing, approval requirements. 3. Confirm policy was reviewed/approved within last 12 months. 4. Verify policy is communicated to relevant personnel. |
| **Pass Criteria** | Policy exists, covers all required elements, and is current |
| **Evidence** | Policy document with approval signatures + communication records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Availability (A1)

### TEST-AV-01 — Testing the Business Continuity and Disaster Recovery Plan
| Field | Detail |
|---|---|
| **Criterion** | A1.3 |
| **Control** | The Business Continuity and Disaster Recovery Plan is periodically tested via tabletop exercises or equivalents |
| **Objective** | Verify BC/DR plan is tested at least annually |
| **Procedure** | 1. Obtain BC/DR test records from the last 12 months. 2. Verify test included key stakeholders. 3. Review test results and any findings. 4. Confirm remediation actions were taken for identified gaps. |
| **Pass Criteria** | BC/DR test conducted within last 12 months; findings documented and remediated |
| **Evidence** | BC/DR test report + participant list + remediation tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AV-02 — Business Continuity and Disaster Recovery Policy
| Field | Detail |
|---|---|
| **Criterion** | A1.2 |
| **Control** | Business Continuity and Disaster Recovery Policy governs required processes for restoring the service or supporting infrastructure after suffering a disaster or disruption |
| **Objective** | Verify existence and currency of BC/DR Policy |
| **Procedure** | 1. Obtain current BC/DR Policy. 2. Verify policy defines RTO/RPO objectives. 3. Confirm policy assigns roles and responsibilities. 4. Verify policy was reviewed within last 12 months. |
| **Pass Criteria** | Policy exists, defines RTO/RPO, assigns responsibilities, and is current |
| **Evidence** | BC/DR Policy document with approval signatures |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AV-03 — Uptime and Availability Monitoring
| Field | Detail |
|---|---|
| **Criterion** | A1.1 |
| **Control** | System tools monitors for uptime and availability based on predetermined criteria |
| **Objective** | Verify monitoring tools are configured and alerting properly |
| **Procedure** | 1. Identify monitoring tools in use (Datadog, PagerDuty, etc.). 2. Review monitoring configuration for critical services. 3. Verify alerting thresholds are defined. 4. Test that alerts are received by appropriate personnel. |
| **Pass Criteria** | All critical services have monitoring; alerts configured with defined thresholds; on-call rotation exists |
| **Evidence** | Monitoring tool configuration screenshots + alert history + on-call schedule |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AV-04 — Backup Restoration Testing
| Field | Detail |
|---|---|
| **Criterion** | A1.2 |
| **Control** | Backed-up data is restored to a non-production environment at least annually to validate the integrity of backups |
| **Objective** | Verify backup restoration is tested at least annually |
| **Procedure** | 1. Obtain backup restoration test records from the last 12 months. 2. Verify restoration was performed to a non-production environment. 3. Confirm data integrity was validated post-restoration. 4. Review any issues identified and remediation. |
| **Pass Criteria** | Backup restoration test conducted within last 12 months; data integrity confirmed |
| **Evidence** | Restoration test report + integrity validation records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Organizational Management (CC1, CC4, CC5, CC9)

### TEST-OM-01 — Information Security Program Review
| Field | Detail |
|---|---|
| **Criterion** | CC4.1 |
| **Control** | Management is responsible for the design, implementation, and management of the organization's security policies and procedures. The policies and procedures are reviewed by management at least annually |
| **Objective** | Verify annual review of security policies by management |
| **Procedure** | 1. Obtain list of all security policies. 2. For each policy, verify review/approval within last 12 months. 3. Confirm reviewer is appropriate management level. 4. Document any policies overdue for review. |
| **Pass Criteria** | All security policies reviewed within last 12 months by appropriate management |
| **Evidence** | Policy inventory + review/approval records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-02 — Organizational Chart
| Field | Detail |
|---|---|
| **Criterion** | CC1.3 |
| **Control** | Management maintains a formal organizational chart to clearly identify positions of authority and the lines of communication, and publishes the organizational chart to internal personnel |
| **Objective** | Verify organizational chart exists and is accessible |
| **Procedure** | 1. Obtain current organizational chart. 2. Verify chart shows reporting relationships. 3. Confirm chart is published and accessible to all employees. 4. Verify chart was updated within last 12 months. |
| **Pass Criteria** | Org chart exists, is current, and is accessible to all employees |
| **Evidence** | Organizational chart + publication location screenshot |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-03 — Performance Reviews
| Field | Detail |
|---|---|
| **Criterion** | CC1.5 |
| **Control** | Internal personnel are evaluated via a formal performance review at least annually |
| **Objective** | Verify annual performance reviews are conducted |
| **Procedure** | 1. Obtain performance review completion report from HR. 2. Sample 10 employees and verify review completion within last 12 months. 3. Confirm reviews include security-related competencies where applicable. |
| **Pass Criteria** | ≥95% of employees have completed performance review within last 12 months |
| **Evidence** | HR performance review completion report |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-04 — New Hire Screening
| Field | Detail |
|---|---|
| **Criterion** | CC1.4 |
| **Control** | Hiring managers screen new hires or internal transfers to assess their qualifications, experience, and competency to fulfill their responsibilities. New hires sign confidentiality agreements or equivalents upon hire |
| **Objective** | Verify background screening and confidentiality agreements for new hires |
| **Procedure** | 1. Sample 5 recent hires from the last quarter. 2. Verify background check completion for each. 3. Confirm signed confidentiality/NDA agreement on file. 4. Verify screening completed before start date. |
| **Pass Criteria** | 100% of sampled new hires have background check and signed confidentiality agreement |
| **Evidence** | Background check confirmations + signed NDAs |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-05 — Disciplinary Action
| Field | Detail |
|---|---|
| **Criterion** | CC1.5 |
| **Control** | Personnel who violate information security policies are subject to disciplinary action and such disciplinary action is clearly documented in one or more policies |
| **Objective** | Verify disciplinary process for policy violations is documented |
| **Procedure** | 1. Review HR/Security policies for disciplinary action provisions. 2. Verify policy clearly states consequences for security policy violations. 3. If any violations occurred, verify disciplinary process was followed. |
| **Pass Criteria** | Disciplinary action policy exists and is documented; any violations handled per policy |
| **Evidence** | Policy document + disciplinary action records (if applicable) |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-06 — Performance Review Policy
| Field | Detail |
|---|---|
| **Criterion** | CC1.5 |
| **Control** | A Performance Review Policy provides personnel context and transparency into their performance and career development processes |
| **Objective** | Verify existence of Performance Review Policy |
| **Procedure** | 1. Obtain current Performance Review Policy. 2. Verify policy describes review frequency, criteria, and process. 3. Confirm policy is accessible to all employees. |
| **Pass Criteria** | Policy exists and clearly describes performance review process |
| **Evidence** | Performance Review Policy document + publication location |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-07 — Cybersecurity Insurance
| Field | Detail |
|---|---|
| **Criterion** | CC9.1 |
| **Control** | Cybersecurity insurance has been procured to help minimize the financial impact of cybersecurity loss events |
| **Objective** | Verify cybersecurity insurance is in place |
| **Procedure** | 1. Obtain current cybersecurity insurance policy certificate. 2. Verify policy is active and not expired. 3. Review coverage limits and deductibles. 4. Confirm coverage includes relevant cyber risks (breach, ransomware, etc.). |
| **Pass Criteria** | Active cybersecurity insurance policy with adequate coverage |
| **Evidence** | Insurance certificate of coverage |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-08 — Roles and Responsibilities
| Field | Detail |
|---|---|
| **Criterion** | CC1.3 |
| **Control** | Information security roles and responsibilities are outlined for personnel responsible for the security, availability, and confidentiality of the system |
| **Objective** | Verify security roles and responsibilities are defined |
| **Procedure** | 1. Review security organization structure. 2. Verify documented roles for CISO, security team, system owners. 3. Confirm responsibilities are clearly defined in job descriptions or RACI matrix. |
| **Pass Criteria** | Security roles clearly defined with documented responsibilities |
| **Evidence** | Organizational chart + job descriptions or RACI matrix |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-09 — Information Security Policy
| Field | Detail |
|---|---|
| **Criterion** | CC5.3 |
| **Control** | An Information Security Policy establishes the security requirements for maintaining the security, confidentiality, integrity, and availability of applications, systems, infrastructure, and data |
| **Objective** | Verify existence and currency of Information Security Policy |
| **Procedure** | 1. Obtain current Information Security Policy. 2. Verify policy addresses security, confidentiality, integrity, availability. 3. Confirm policy was reviewed within last 12 months. 4. Verify policy is communicated to all employees. |
| **Pass Criteria** | Policy exists, is comprehensive, current, and communicated |
| **Evidence** | Information Security Policy + communication records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-10 — Acceptable Use Policy
| Field | Detail |
|---|---|
| **Criterion** | CC5.3 |
| **Control** | An Acceptable Use Policy defines standards for appropriate and secure use of company hardware and electronic systems including storage media, communication tools and internet access |
| **Objective** | Verify existence and acknowledgement of Acceptable Use Policy |
| **Procedure** | 1. Obtain current Acceptable Use Policy. 2. Verify policy covers hardware, systems, communication tools, internet. 3. Pull employee acknowledgement records. 4. Confirm ≥95% acknowledgement rate. |
| **Pass Criteria** | Policy exists and ≥95% of employees have acknowledged |
| **Evidence** | Acceptable Use Policy + acknowledgement records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-11 — Internal Control Policy
| Field | Detail |
|---|---|
| **Criterion** | CC5.1 |
| **Control** | An Internal Control Policy identifies how a system of controls should be maintained to safeguard assets, promote operational efficiency, and encourage adherence to prescribed managerial policies |
| **Objective** | Verify existence of Internal Control Policy |
| **Procedure** | 1. Obtain current Internal Control Policy. 2. Verify policy addresses control framework, monitoring, and exceptions. 3. Confirm policy was reviewed within last 12 months. |
| **Pass Criteria** | Policy exists, is comprehensive, and current |
| **Evidence** | Internal Control Policy document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-OM-12 — Code of Conduct
| Field | Detail |
|---|---|
| **Criterion** | CC1.1 |
| **Control** | A Code of Conduct outlines ethical expectations, behavior standards, and ramifications of noncompliance |
| **Objective** | Verify Code of Conduct exists and is acknowledged by employees |
| **Procedure** | 1. Obtain current Code of Conduct. 2. Verify it addresses ethical expectations and consequences. 3. Pull employee acknowledgement records. 4. Verify ≥95% acknowledgement within last 12 months. |
| **Pass Criteria** | Code of Conduct exists; ≥95% employee acknowledgement |
| **Evidence** | Code of Conduct + acknowledgement records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Confidentiality (C1)

### TEST-CF-01 — Data Classification Policy
| Field | Detail |
|---|---|
| **Criterion** | C1.1 |
| **Control** | A Data Classification Policy details the security and handling protocols for sensitive data |
| **Objective** | Verify Data Classification Policy exists and is implemented |
| **Procedure** | 1. Obtain current Data Classification Policy. 2. Verify policy defines classification levels (Public, Internal, Confidential, etc.). 3. Confirm handling requirements for each level. 4. Sample 5 data assets and verify proper classification. |
| **Pass Criteria** | Policy exists with defined levels; sampled data properly classified |
| **Evidence** | Data Classification Policy + sample data classification records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CF-02 — Disposal of Customer Data
| Field | Detail |
|---|---|
| **Criterion** | C1.2 |
| **Control** | Upon customer request, Company requires that data that is no longer needed from databases and other file stores is removed in accordance with agreed-upon customer requirements |
| **Objective** | Verify customer data deletion requests are processed correctly |
| **Procedure** | 1. Obtain data deletion request log for last 12 months. 2. Sample 3 deletion requests. 3. Verify deletion was completed within SLA. 4. Confirm deletion evidence (logs, certificates). |
| **Pass Criteria** | All sampled deletion requests completed within SLA with evidence |
| **Evidence** | Deletion request log + deletion confirmation records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CF-03 — Data Retention and Disposal Policy
| Field | Detail |
|---|---|
| **Criterion** | C1.2 |
| **Control** | A Data Retention and Disposal Policy specifies how customer data is to be retained and disposed of based on compliance requirements and contractual obligations |
| **Objective** | Verify existence and implementation of Data Retention and Disposal Policy |
| **Procedure** | 1. Obtain current Data Retention and Disposal Policy. 2. Verify policy defines retention periods by data type. 3. Confirm disposal procedures are documented. 4. Verify automated retention/deletion mechanisms where applicable. |
| **Pass Criteria** | Policy exists with defined retention periods and disposal procedures |
| **Evidence** | Data Retention Policy + automated retention configuration (if applicable) |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CF-04 — Access to Customer Data is Restricted
| Field | Detail |
|---|---|
| **Criterion** | C1.1 |
| **Control** | Access to, erasure of, or destruction of customer data is restricted to personnel that need access based on the principle of least privilege |
| **Objective** | Verify customer data access is restricted to authorized personnel |
| **Procedure** | 1. Identify systems storing customer data. 2. Pull access lists for these systems. 3. Verify access is limited to personnel with documented business need. 4. Confirm least privilege principle is applied (no excessive permissions). |
| **Pass Criteria** | Customer data access limited to authorized personnel with documented justification |
| **Evidence** | System access lists + access justification records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Vulnerability Management (CC7)

### TEST-VM-01 — Vulnerability and Patch Management Policy
| Field | Detail |
|---|---|
| **Criterion** | CC7.1 |
| **Control** | A Vulnerability Management and Patch Management Policy outlines the processes to efficiently respond to identified vulnerabilities |
| **Objective** | Verify existence and implementation of Vulnerability/Patch Management Policy |
| **Procedure** | 1. Obtain current Vulnerability and Patch Management Policy. 2. Verify policy defines scanning frequency, severity levels, remediation SLAs. 3. Review recent vulnerability scan results. 4. Confirm Critical/High findings are tracked and remediated per SLA. |
| **Pass Criteria** | Policy exists; vulnerabilities tracked and remediated per defined SLAs |
| **Evidence** | Policy document + vulnerability scan reports + remediation tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-VM-02 — Third-Party Penetration Test
| Field | Detail |
|---|---|
| **Criterion** | CC4.1 |
| **Control** | A 3rd party is engaged to conduct a network and application penetration test of the production environment at least annually. Critical and high-risk findings are tracked through resolution |
| **Objective** | Verify annual penetration test is conducted and findings are remediated |
| **Procedure** | 1. Obtain most recent penetration test report (should be within 12 months). 2. Verify test covered production environment (network and application). 3. Review Critical/High findings. 4. Confirm all Critical/High findings have been remediated or have approved remediation plan. |
| **Pass Criteria** | Pen test completed within 12 months; all Critical/High findings remediated or with approved plan |
| **Evidence** | Penetration test report + remediation tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Incident Response (CC7)

### TEST-IR-01 — Tracking a Security Incident
| Field | Detail |
|---|---|
| **Criterion** | CC7.3 |
| **Control** | Identified incidents are documented, tracked, and analyzed according to the Incident Response Plan |
| **Objective** | Verify incidents are properly documented and tracked |
| **Procedure** | 1. Obtain incident log for last 12 months. 2. Sample 3 incidents (or all if fewer). 3. Verify each has: detection timestamp, classification, containment actions, resolution, root cause analysis. 4. Confirm tracking in ticketing system. |
| **Pass Criteria** | All sampled incidents fully documented per Incident Response Plan |
| **Evidence** | Incident log + incident tickets + root cause analysis documents |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-IR-02 — Lessons Learned
| Field | Detail |
|---|---|
| **Criterion** | CC7.4 |
| **Control** | After any identified security incident has been resolved, management provides a "Lessons Learned" document to the team in order to continually improve security and operations |
| **Objective** | Verify lessons learned are documented after incidents |
| **Procedure** | 1. Review incidents from last 12 months. 2. For each significant incident, verify lessons learned document exists. 3. Confirm lessons learned were shared with relevant teams. 4. Verify any improvement actions were tracked to completion. |
| **Pass Criteria** | Lessons learned documented for all significant incidents; improvements tracked |
| **Evidence** | Lessons learned documents + improvement action tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-IR-03 — Incident Response Plan Testing
| Field | Detail |
|---|---|
| **Criterion** | CC7.4 |
| **Control** | The Incident Response Plan is periodically tested via tabletop exercises or equivalents |
| **Objective** | Verify Incident Response Plan is tested at least annually |
| **Procedure** | 1. Obtain IR plan test records from last 12 months. 2. Verify test included key stakeholders (security, IT, legal, comms). 3. Review test results and findings. 4. Confirm improvements were implemented. |
| **Pass Criteria** | IR plan tested within last 12 months; findings documented and addressed |
| **Evidence** | IR test report + participant list + improvement tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-IR-04 — Incident Response Plan
| Field | Detail |
|---|---|
| **Criterion** | CC7.4 |
| **Control** | An Incident Response Plan outlines the process of identifying, prioritizing, communicating, assigning and tracking confirmed incidents through to resolution |
| **Objective** | Verify Incident Response Plan exists and is current |
| **Procedure** | 1. Obtain current Incident Response Plan. 2. Verify plan addresses: detection, classification, containment, eradication, recovery, communication. 3. Confirm roles and escalation paths are defined. 4. Verify plan was reviewed within last 12 months. |
| **Pass Criteria** | IR Plan exists, is comprehensive, and current |
| **Evidence** | Incident Response Plan document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Risk Assessment (CC3, CC9)

### TEST-RA-01 — Vendor Due Diligence Review
| Field | Detail |
|---|---|
| **Criterion** | CC9.2 |
| **Control** | Vendor SOC 2 reports (or equivalent) are collected and reviewed on at least an annual basis |
| **Objective** | Verify critical vendor security assessments are reviewed annually |
| **Procedure** | 1. Obtain list of critical vendors (those handling sensitive data). 2. For each, verify SOC 2 report or equivalent was obtained within last 12 months. 3. Confirm reports were reviewed and any exceptions noted. |
| **Pass Criteria** | All critical vendors have current security assessment on file and reviewed |
| **Evidence** | Vendor list + SOC 2 reports + review documentation |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-RA-02 — Risk Assessment
| Field | Detail |
|---|---|
| **Criterion** | CC3.2 |
| **Control** | Formal risk assessments are performed, which includes the identification of relevant internal and external threats related to security, availability, confidentiality, and fraud, and an analysis of risks associated with those threats |
| **Objective** | Verify formal risk assessment is performed at least annually |
| **Procedure** | 1. Obtain most recent risk assessment (should be within 12 months). 2. Verify assessment covers security, availability, confidentiality, fraud risks. 3. Confirm threats are identified and analyzed. 4. Verify risk treatment decisions are documented. |
| **Pass Criteria** | Risk assessment completed within 12 months; all required areas covered |
| **Evidence** | Risk assessment document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-RA-03 — Risk Assessment and Treatment Policy
| Field | Detail |
|---|---|
| **Criterion** | CC3.2 |
| **Control** | A Risk Assessment and Treatment Policy governs the process for conducting risk assessments to account for threats, vulnerabilities, likelihood, and impact with respect to assets, team members, customers, vendors, suppliers, and partners |
| **Objective** | Verify existence of Risk Assessment and Treatment Policy |
| **Procedure** | 1. Obtain current Risk Assessment and Treatment Policy. 2. Verify policy defines risk assessment methodology. 3. Confirm policy addresses threat identification, likelihood, impact. 4. Verify policy was reviewed within last 12 months. |
| **Pass Criteria** | Policy exists, is comprehensive, and current |
| **Evidence** | Risk Assessment and Treatment Policy document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-RA-04 — Vendor Risk Assessment
| Field | Detail |
|---|---|
| **Criterion** | CC9.2 |
| **Control** | New vendors are assessed in accordance with the Vendor Risk Management Policy prior to engaging with the vendor. Reassessment occurs at least annually |
| **Objective** | Verify new vendor risk assessments are completed before engagement |
| **Procedure** | 1. Sample 3 vendors onboarded in last 12 months. 2. Verify risk assessment was completed before contract signing. 3. Confirm assessment followed Vendor Risk Management Policy. 4. For existing vendors, verify annual reassessment. |
| **Pass Criteria** | All sampled vendors have risk assessment before engagement; annual reassessments current |
| **Evidence** | Vendor risk assessment records + onboarding dates |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-RA-05 — Risk Register
| Field | Detail |
|---|---|
| **Criterion** | CC3.2 |
| **Control** | A risk register is maintained, which records the risk mitigation strategies for identified risks, and the development or modification of controls consistent with the risk mitigation strategy |
| **Objective** | Verify risk register is maintained and current |
| **Procedure** | 1. Obtain current risk register. 2. Verify all identified risks have documented mitigation strategies. 3. Confirm risk register was reviewed/updated within last quarter. 4. Verify risk owners are assigned. |
| **Pass Criteria** | Risk register exists, is current, and all risks have mitigation strategies and owners |
| **Evidence** | Risk register document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-RA-06 — Vendor Risk Management Policy
| Field | Detail |
|---|---|
| **Criterion** | CC9.2 |
| **Control** | A Vendor Risk Management Policy defines a framework for the onboarding and management of the vendor relationship lifecycle |
| **Objective** | Verify existence of Vendor Risk Management Policy |
| **Procedure** | 1. Obtain current Vendor Risk Management Policy. 2. Verify policy addresses vendor selection, assessment, monitoring, offboarding. 3. Confirm policy defines risk tiers and corresponding requirements. 4. Verify policy was reviewed within last 12 months. |
| **Pass Criteria** | Policy exists, covers full vendor lifecycle, and is current |
| **Evidence** | Vendor Risk Management Policy document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Network Security (CC6)

### TEST-NS-01 — Network Security Policy
| Field | Detail |
|---|---|
| **Criterion** | CC6.6 |
| **Control** | A Network Security Policy identifies the requirements for protecting information and systems within and across networks |
| **Objective** | Verify existence and implementation of Network Security Policy |
| **Procedure** | 1. Obtain current Network Security Policy. 2. Verify policy addresses network segmentation, firewall rules, intrusion detection. 3. Sample 3 network segments and verify controls align with policy. 4. Verify policy was reviewed within last 12 months. |
| **Pass Criteria** | Policy exists and is implemented; sampled segments comply |
| **Evidence** | Network Security Policy + network configuration evidence |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-NS-02 — Endpoint Security
| Field | Detail |
|---|---|
| **Criterion** | CC6.8 |
| **Control** | Company endpoints are managed and configured with a strong password policy, anti-virus, and hard drive encryption |
| **Objective** | Verify endpoints have required security controls |
| **Procedure** | 1. Identify endpoint management tool (MDM, EDR). 2. Pull compliance report showing: encryption status, AV status, password policy enforcement. 3. Verify ≥95% endpoint compliance. 4. Document any non-compliant devices and remediation plans. |
| **Pass Criteria** | ≥95% endpoints compliant with encryption, AV, and password policy |
| **Evidence** | Endpoint compliance report from MDM/EDR |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-NS-03 — Automated Alerting for Security Events
| Field | Detail |
|---|---|
| **Criterion** | CC7.2 |
| **Control** | Alerting software is used to notify impacted teams of potential security events |
| **Objective** | Verify security event alerting is configured and functional |
| **Procedure** | 1. Identify SIEM or security monitoring tools in use. 2. Review alert rules for critical security events. 3. Verify alerts are routed to appropriate teams. 4. Test one alert to confirm notification delivery. |
| **Pass Criteria** | Security alerting configured; alerts delivered to appropriate teams |
| **Evidence** | Alert configuration screenshots + test alert evidence |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Access Security (CC6)

### TEST-AS-01 — Administrative Access is Restricted
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Control** | Administrative access to production infrastructure is restricted based on the principle of least privilege |
| **Objective** | Verify admin access is restricted to authorized personnel only |
| **Procedure** | 1. Identify production systems with admin access. 2. Pull admin user lists for each system. 3. Verify each admin has documented business justification. 4. Confirm no shared admin accounts. |
| **Pass Criteria** | Admin access limited to authorized personnel with documented justification; no shared accounts |
| **Evidence** | Admin user lists + access justification records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-02 — Access to Product is Restricted
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Control** | Non-console access to production infrastructure is restricted to users with a unique SSH key or access key |
| **Objective** | Verify production access requires unique credentials |
| **Procedure** | 1. Review production access methods (SSH, API keys, etc.). 2. Verify each user has unique credentials (no shared keys). 3. Confirm key rotation policy exists and is followed. 4. Check for any default or shared credentials. |
| **Pass Criteria** | All production access uses unique credentials; no shared or default keys |
| **Evidence** | Access key inventory + key rotation records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-03 — Removal of Access
| Field | Detail |
|---|---|
| **Criterion** | CC6.3 |
| **Control** | Upon termination or when internal personnel no longer require access, system access is removed, as applicable |
| **Objective** | Verify access is revoked promptly upon termination or role change |
| **Procedure** | 1. Sample 5 recent terminations from HR. 2. Verify access was revoked within 24 hours of termination. 3. For role changes, sample 3 and verify excess access was removed. 4. Check all critical systems (IdP, cloud, code repos). |
| **Pass Criteria** | All sampled terminations: access revoked ≤24h; role changes: excess access removed |
| **Evidence** | HR termination records + IdP/system audit logs |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-04 — Encryption-at-Rest
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Control** | Service data is encrypted-at-rest |
| **Objective** | Verify all production data stores use encryption-at-rest |
| **Procedure** | 1. Inventory all production data stores (databases, object storage, etc.). 2. For each, verify encryption-at-rest is enabled. 3. Confirm encryption keys are properly managed. 4. Document encryption method (AES-256, etc.). |
| **Pass Criteria** | 100% of production data stores have encryption-at-rest enabled |
| **Evidence** | Data store inventory + encryption configuration screenshots |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-05 — Asset Inventory
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Control** | A list of system assets, components, and respective owners are maintained and reviewed at least annually |
| **Objective** | Verify asset inventory is maintained and current |
| **Procedure** | 1. Obtain current asset inventory. 2. Verify inventory includes all production systems. 3. Confirm each asset has a designated owner. 4. Verify inventory was reviewed/updated within last 12 months. |
| **Pass Criteria** | Asset inventory exists, is complete, and was reviewed within 12 months |
| **Evidence** | Asset inventory document + review records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-06 — User Access Reviews
| Field | Detail |
|---|---|
| **Criterion** | CC6.2 |
| **Control** | System owners conduct scheduled user access reviews of production servers, databases, and applications to validate internal user access is commensurate with job responsibilities |
| **Objective** | Verify quarterly access reviews are conducted |
| **Procedure** | 1. Obtain access review records for last quarter. 2. Verify all in-scope systems were reviewed. 3. Confirm system owners participated. 4. Verify any excess access identified was revoked. |
| **Pass Criteria** | Access reviews completed quarterly; excess access revoked within 7 days |
| **Evidence** | Access review records + revocation tickets |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-07 — Least Privilege in Use
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Control** | Users are provisioned access to systems based on principle of least privilege |
| **Objective** | Verify least privilege principle is applied in access provisioning |
| **Procedure** | 1. Review access provisioning process documentation. 2. Sample 5 recent access requests. 3. Verify access granted matches job role requirements. 4. Confirm no excessive permissions granted. |
| **Pass Criteria** | All sampled access requests follow least privilege principle |
| **Evidence** | Access request tickets + role-based access documentation |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-08 — Access Control and Termination Policy
| Field | Detail |
|---|---|
| **Criterion** | CC6.3 |
| **Control** | An Access Control and Termination Policy governs authentication and access to applicable systems, data, and networks |
| **Objective** | Verify existence and currency of Access Control and Termination Policy |
| **Procedure** | 1. Obtain current Access Control and Termination Policy. 2. Verify policy addresses provisioning, authentication, termination procedures. 3. Confirm policy defines access revocation timelines. 4. Verify policy was reviewed within last 12 months. |
| **Pass Criteria** | Policy exists, is comprehensive, and current |
| **Evidence** | Access Control and Termination Policy document |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-09 — Unique Access IDs
| Field | Detail |
|---|---|
| **Criterion** | CC6.1 |
| **Control** | Personnel are assigned unique IDs to access sensitive systems, networks, and information |
| **Objective** | Verify all users have unique identifiers |
| **Procedure** | 1. Review IdP user list. 2. Verify no duplicate usernames or shared accounts. 3. Confirm each user ID maps to a single individual. 4. Check for any generic/service accounts and verify they have documented owners. |
| **Pass Criteria** | All user accounts are unique; service accounts have documented owners |
| **Evidence** | IdP user list + service account documentation |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-AS-10 — Encryption and Key Management Policy
| Field | Detail |
|---|---|
| **Criterion** | CC6.7 |
| **Control** | An Encryption and Key Management Policy supports the secure encryption and decryption of app secrets, and governs the use of cryptographic controls |
| **Objective** | Verify existence and implementation of Encryption and Key Management Policy |
| **Procedure** | 1. Obtain current Encryption and Key Management Policy. 2. Verify policy defines encryption standards (algorithms, key lengths). 3. Confirm key management procedures (rotation, storage, destruction). 4. Verify secrets management tool is in use. |
| **Pass Criteria** | Policy exists and is implemented; secrets management in use |
| **Evidence** | Encryption Policy + secrets management configuration |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Communications (CC2, P1)

### TEST-CO-01 — Terms of Service
| Field | Detail |
|---|---|
| **Criterion** | CC2.3 |
| **Control** | Terms of Service or the equivalent are published or shared to external users |
| **Objective** | Verify Terms of Service are published and accessible |
| **Procedure** | 1. Navigate to company website. 2. Verify Terms of Service are published and accessible. 3. Confirm ToS includes relevant legal provisions. 4. Verify ToS version and last update date. |
| **Pass Criteria** | ToS published and accessible; reviewed within last 12 months |
| **Evidence** | ToS URL + document screenshot |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CO-02 — Communication of Critical Information
| Field | Detail |
|---|---|
| **Criterion** | CC2.2 |
| **Control** | Critical information is communicated to external parties, as applicable |
| **Objective** | Verify process exists for communicating critical information to external parties |
| **Procedure** | 1. Review communication procedures for critical events (outages, breaches). 2. Verify status page or equivalent is maintained. 3. Sample recent critical event and verify communication was sent. 4. Confirm contact lists for external stakeholders are current. |
| **Pass Criteria** | Communication process exists; critical events communicated per procedure |
| **Evidence** | Communication procedures + status page + sample communication records |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CO-03 — Confidential Reporting Channel
| Field | Detail |
|---|---|
| **Criterion** | CC1.1 |
| **Control** | A confidential reporting channel is made available to internal personnel and external parties to report security and other identified concerns |
| **Objective** | Verify confidential reporting channel exists and is accessible |
| **Procedure** | 1. Identify confidential reporting mechanism (hotline, email, web form). 2. Verify channel is communicated to employees. 3. Confirm channel is accessible to external parties. 4. Test that reports are received and tracked. |
| **Pass Criteria** | Confidential reporting channel exists and is functional |
| **Evidence** | Reporting channel documentation + accessibility verification |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CO-04 — Communication of Security Commitments
| Field | Detail |
|---|---|
| **Criterion** | CC2.3 |
| **Control** | Security commitments and expectations are communicated to both internal personnel and external users via the company's website |
| **Objective** | Verify security commitments are publicly communicated |
| **Procedure** | 1. Navigate to company website. 2. Locate security/trust page or equivalent. 3. Verify security commitments are clearly stated. 4. Confirm page is current (updated within last 12 months). |
| **Pass Criteria** | Security commitments published and accessible on website |
| **Evidence** | Security/trust page URL + screenshot |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CO-05 — Description of Services
| Field | Detail |
|---|---|
| **Criterion** | CC2.2 |
| **Control** | Descriptions of the company's services and systems are available to both internal personnel and external users |
| **Objective** | Verify service descriptions are available |
| **Procedure** | 1. Review company website for service descriptions. 2. Verify internal documentation exists for service architecture. 3. Confirm external documentation is current and accurate. |
| **Pass Criteria** | Service descriptions available internally and externally |
| **Evidence** | Website service pages + internal documentation links |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

### TEST-CO-06 — Privacy Policy
| Field | Detail |
|---|---|
| **Criterion** | P1 |
| **Control** | A Privacy Policy is published to both external users and internal personnel. This policy details the company's privacy commitments |
| **Objective** | Verify Privacy Policy is published and accessible |
| **Procedure** | 1. Navigate to company website. 2. Verify Privacy Policy is published and accessible. 3. Confirm policy addresses data collection, use, sharing, retention. 4. Verify policy is current (reviewed within last 12 months). |
| **Pass Criteria** | Privacy Policy published, accessible, and current |
| **Evidence** | Privacy Policy URL + document screenshot |
| **Test Result** | ☐ Pass  ☐ Fail  ☐ Exception |
| **Exceptions** | |
| **Tested by / Date** | |

---

## Appendix: Test Summary

| Category | Controls | Tests |
|---|---|---|
| Change Management | 8 | TEST-CM-01 through TEST-CM-08 |
| Availability | 4 | TEST-AV-01 through TEST-AV-04 |
| Organizational Management | 12 | TEST-OM-01 through TEST-OM-12 |
| Confidentiality | 4 | TEST-CF-01 through TEST-CF-04 |
| Vulnerability Management | 2 | TEST-VM-01 through TEST-VM-02 |
| Incident Response | 4 | TEST-IR-01 through TEST-IR-04 |
| Risk Assessment | 6 | TEST-RA-01 through TEST-RA-06 |
| Network Security | 3 | TEST-NS-01 through TEST-NS-03 |
| Access Security | 10 | TEST-AS-01 through TEST-AS-10 |
| Communications | 6 | TEST-CO-01 through TEST-CO-06 |
| **Total** | **58** | **58 tests** |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2025-01-01 | GRC Lead | Initial document |
| 2.0 | 2026-05-04 | GRC Lead | Complete rewrite with 58 controls aligned to Trust Center Controls Reference |

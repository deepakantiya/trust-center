# SOC 2 Control Matrix

This matrix maps each AICPA Trust Services Criterion to the implemented control(s), the policy/process owner, the system(s) where it operates, and the evidence collected.

**Legend**
- **TSC** = Trust Services Criterion reference
- **Status:** ✅ Operating · 🟡 Partial · 🔴 Gap · ⚪ Not in scope
- **Frequency:** how often the control runs
- **Test type:** Inquiry (I), Observation (O), Inspection (Insp), Re-performance (R)

---

## Common Criteria — Security (CC)

### CC1 — Control Environment

| ID | Criterion | Control Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC1.1 | Demonstrates commitment to integrity and ethical values | Code of Conduct signed at hire and annually; whistleblower channel; disciplinary process | HR / Legal | ✅ | Signed acknowledgments; hotline reports |
| CC1.2 | Board exercises oversight | Board reviews security program ≥ annually; minutes documented | Board / CISO | ✅ | Board minutes |
| CC1.3 | Establishes structure, authority, responsibility | Org chart; documented role descriptions; CISO charter | CISO / HR | ✅ | Org chart; role docs |
| CC1.4 | Demonstrates commitment to competence | Background checks; annual security training; role-based training | HR / Security | ✅ | Training completion reports |
| CC1.5 | Enforces accountability | Performance reviews include security objectives; disciplinary actions documented | HR | ✅ | HR records |

### CC2 — Communication and Information

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC2.1 | Obtains/uses relevant, quality information | Threat intel feeds; vendor risk data; vulnerability scanners | Security | ✅ | Tooling configs; reports |
| CC2.2 | Communicates internally | Policies in central repo; quarterly all-hands security update; new-hire orientation | CISO | ✅ | Wiki, training records |
| CC2.3 | Communicates externally | Trust Center website; customer breach notification process; subprocessor list | CISO / Legal | ✅ | Website; DPA templates |

### CC3 — Risk Assessment

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC3.1 | Specifies objectives | Annual security objectives in OKRs | CISO | ✅ | OKR doc |
| CC3.2 | Identifies risks | Risk identification quarterly; ad-hoc on changes | Security | ✅ | Risk register |
| CC3.3 | Considers fraud | Fraud risk assessment included in risk process | CISO + Finance | ✅ | Risk register |
| CC3.4 | Identifies and assesses changes | Change risk assessment in CR process | Eng Leads | ✅ | PRs / CR records |

### CC4 — Monitoring Activities

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC4.1 | Selects/develops/performs evaluations | Quarterly internal control testing; annual external pen test; annual SOC 2 audit | GRC / CISO | ✅ | Test workpapers |
| CC4.2 | Communicates deficiencies | Findings tracked in JIRA; reviewed monthly with leadership | CISO | ✅ | Issue tracker |

### CC5 — Control Activities

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC5.1 | Selects/develops control activities | Control matrix maintained (this doc) | GRC | ✅ | This document |
| CC5.2 | Selects/develops technology controls | Documented in [`controls/technical-controls.md`](./technical-controls.md) | Security | ✅ | Tooling inventory |
| CC5.3 | Deploys controls through policies | Policy library; annual review/approval | CISO | ✅ | Policy approvals |

### CC6 — Logical and Physical Access

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC6.1 | Restricts logical access | SSO + MFA; RBAC; least privilege; encryption | Security / IT | ✅ | IdP config; access matrix |
| CC6.2 | Manages access provisioning/changes | Ticketed access requests; manager approval; quarterly access review | IT | ✅ | Tickets; review evidence |
| CC6.3 | Removes access | Offboarding within 24h; deprovisioning checklist | IT / HR | ✅ | Offboarding logs |
| CC6.4 | Restricts physical access | Badge access; visitor logs; data center via vendor SOC 2 | Facilities | ✅ | Badge logs |
| CC6.5 | Disposes of physical assets | Asset disposal procedure; certificates of destruction | IT | ✅ | Disposal records |
| CC6.6 | Protects against external threats | Firewall, WAF, DDoS protection, EDR | Security | ✅ | Tool configs |
| CC6.7 | Restricts data movement | DLP (where applicable); encryption in transit; data egress controls | Security | ✅ | DLP reports |
| CC6.8 | Prevents/detects malicious software | EDR on endpoints; container image scanning | Security | ✅ | EDR reports |

### CC7 — System Operations

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC7.1 | Detects vulnerabilities and anomalies | Continuous vuln scanning; SAST/DAST/SCA in CI; threat detection | Security | ✅ | Scan reports |
| CC7.2 | Monitors for security events | SIEM; centralized logging; alerting | Security | ✅ | SIEM dashboards |
| CC7.3 | Evaluates security events | Triage runbook; severity scoring | Security | ✅ | IR tickets |
| CC7.4 | Responds to incidents | IR plan tested annually; post-incident reviews | Security | ✅ | Postmortems |
| CC7.5 | Recovers from incidents | DR procedures; backup tested quarterly | Eng / Security | ✅ | DR test reports |

### CC8 — Change Management

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC8.1 | Authorizes/designs/develops/tests/approves/implements changes | Branch protection; peer review; CI; deployment pipeline | Engineering | ✅ | PR samples; CI logs |

### CC9 — Risk Mitigation

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CC9.1 | Identifies/develops risk mitigation activities | Treatment plans in risk register; cyber insurance | CISO / Finance | ✅ | Insurance binder |
| CC9.2 | Assesses/manages vendors | Vendor due diligence; annual reassessment; subprocessor list | GRC / Procurement | ✅ | Vendor register |

---

## Availability (A)

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| A1.1 | Maintains/monitors availability | SLA monitoring; multi-AZ; status page | SRE | ✅ | Uptime reports |
| A1.2 | Authorizes/develops/tests recovery procedures | Backups encrypted, off-region, tested quarterly | SRE | ✅ | Restore test logs |
| A1.3 | Tests recovery plan | Annual DR exercise; tabletop | SRE / CISO | ✅ | DR exercise reports |

---

## Confidentiality (C)

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| C1.1 | Identifies/maintains confidential information | Data classification; data inventory | DPO | ✅ | Inventory |
| C1.2 | Disposes of confidential information | Retention schedule; cryptographic erasure | DPO | ✅ | Retention logs |

---

## Processing Integrity (PI) *(if in scope)*

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| PI1.1 | Definitions of processed data | Data dictionary; API contracts | Eng | ⚪ | TBD |
| PI1.2 | System inputs are complete/accurate | Input validation; schema enforcement | Eng | ⚪ | TBD |
| PI1.3 | Processing is complete/accurate | Reconciliation jobs; error queues | Eng | ⚪ | TBD |
| PI1.4 | Outputs are complete/accurate | Output validation; audit trails | Eng | ⚪ | TBD |
| PI1.5 | Stored info is complete/accurate | Database integrity checks | Eng | ⚪ | TBD |

---

## Privacy (P) *(if in scope)*

| ID | Criterion | Control | Owner | Status | Evidence |
|---|---|---|---|---|---|
| P1 | Notice | Privacy notice published | DPO / Legal | ✅ | Privacy page |
| P2 | Choice and consent | Cookie banner; consent records | DPO | ✅ | CMP logs |
| P3 | Collection | Data minimization in design reviews | DPO / Eng | ✅ | DPIAs |
| P4 | Use, retention, disposal | Retention schedule; auto-deletion | DPO | ✅ | Retention jobs |
| P5 | Access | DSR portal; verification | DPO | ✅ | DSR logs |
| P6 | Disclosure to third parties | Subprocessor list; DPAs | DPO / Legal | ✅ | Vendor register |
| P7 | Quality | Update mechanisms; data correction | DPO | ✅ | DSR logs |
| P8 | Monitoring and enforcement | Privacy audits; breach process | DPO | ✅ | Audit reports |

---

---

## Trust Center Controls Reference

*Industry-standard security controls mapped to SOC 2 TSC criteria.*

### Change Management

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Segregation of Environments | CC8.1 | Development, staging, and production environments are segregated. | ✅ |
| Secure Development Policy | CC8.1 | A Secure Development Policy defines the requirements for secure software and system development and maintenance. | ✅ |
| Production Data Use is Restricted | C1.1 | Production data is not used in the development and testing environments, unless required for debugging customer issues. | ✅ |
| Software Change Testing | CC8.1 | Software changes are tested prior to being deployed into production. | ✅ |
| Baseline Configurations | CC8.1 | Baseline configurations and codebases for production infrastructure, systems, and applications are securely managed. | ✅ |
| Configuration and Asset Management Policy | CC8.1 | A Configuration and Asset Management Policy governs configurations for new sensitive systems. | ✅ |
| Approval for System Changes | CC8.1 | System changes are approved by at least 1 independent person prior to deployment into production. | ✅ |
| Change Management Policy | CC8.1 | A Change Management Policy governs the documenting, tracking, testing, and approving of system, network, security, and infrastructure changes. | ✅ |

### Availability

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Testing the Business Continuity and Disaster Recovery Plan | A1.3 | The Business Continuity and Disaster Recovery Plan is periodically tested via tabletop exercises or equivalents. When necessary, Management makes changes to the Business Continuity and Disaster Recovery Plan based on the test results. | ✅ |
| Business Continuity and Disaster Recovery Policy | A1.2 | Business Continuity and Disaster Recovery Policy governs required processes for restoring the service or supporting infrastructure after suffering a disaster or disruption. | ✅ |
| Uptime and Availability Monitoring | A1.1 | System tools monitors for uptime and availability based on predetermined criteria. | ✅ |
| Backup Restoration Testing | A1.2 | Backed-up data is restored to a non-production environment at least annually to validate the integrity of backups. | ✅ |

### Organizational Management

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Information Security Program Review | CC4.1 | Management is responsible for the design, implementation, and management of the organization's security policies and procedures. The policies and procedures are reviewed by management at least annually. | ✅ |
| Organizational Chart | CC1.3 | Management maintains a formal organizational chart to clearly identify positions of authority and the lines of communication, and publishes the organizational chart to internal personnel. | ✅ |
| Performance Reviews | CC1.5 | Internal personnel are evaluated via a formal performance review at least annually. | ✅ |
| New Hire Screening | CC1.4 | Hiring managers screen new hires or internal transfers to assess their qualifications, experience, and competency to fulfill their responsibilities. New hires sign confidentiality agreements or equivalents upon hire. | ✅ |
| Disciplinary Action | CC1.5 | Personnel who violate information security policies are subject to disciplinary action and such disciplinary action is clearly documented in one or more policies. | ✅ |
| Performance Review Policy | CC1.5 | A Performance Review Policy provides personnel context and transparency into their performance and career development processes. | ✅ |
| Cybersecurity Insurance | CC9.1 | Cybersecurity insurance has been procured to help minimize the financial impact of cybersecurity loss events. | ✅ |
| Roles and Responsibilities | CC1.3 | Information security roles and responsibilities are outlined for personnel responsible for the security, availability, and confidentiality of the system. | ✅ |
| Information Security Policy | CC5.3 | An Information Security Policy establishes the security requirements for maintaining the security, confidentiality, integrity, and availability of applications, systems, infrastructure, and data. | ✅ |
| Acceptable Use Policy | CC5.3 | An Acceptable Use Policy defines standards for appropriate and secure use of company hardware and electronic systems including storage media, communication tools and internet access. | ✅ |
| Internal Control Policy | CC5.1 | An Internal Control Policy identifies how a system of controls should be maintained to safeguard assets, promote operational efficiency, and encourage adherence to prescribed managerial policies. | ✅ |
| Code of Conduct | CC1.1 | A Code of Conduct outlines ethical expectations, behavior standards, and ramifications of noncompliance. | ✅ |

### Confidentiality

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Data Classification Policy | C1.1 | A Data Classification Policy details the security and handling protocols for sensitive data. | ✅ |
| Disposal of Customer Data | C1.2 | Upon customer request, Company requires that data that is no longer needed from databases and other file stores is removed in accordance with agreed-upon customer requirements. | ✅ |
| Data Retention and Disposal Policy | C1.2 | A Data Retention and Disposal Policy specifies how customer data is to be retained and disposed of based on compliance requirements and contractual obligations. | ✅ |
| Access to Customer Data is Restricted | C1.1 | Access to, erasure of, or destruction of customer data is restricted to personnel that need access based on the principle of least privilege. | ✅ |

### Vulnerability Management

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Vulnerability and Patch Management Policy | CC7.1 | A Vulnerability Management and Patch Management Policy outlines the processes to efficiently respond to identified vulnerabilities. | ✅ |
| Third-Party Penetration Test | CC4.1 | A 3rd party is engaged to conduct a network and application penetration test of the production environment at least annually. Critical and high-risk findings are tracked through resolution. | ✅ |

### Incident Response

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Tracking a Security Incident | CC7.3 | Identified incidents are documented, tracked, and analyzed according to the Incident Response Plan. | ✅ |
| Lessons Learned | CC7.4 | After any identified security incident has been resolved, management provides a "Lessons Learned" document to the team in order to continually improve security and operations. | ✅ |
| Incident Response Plan Testing | CC7.4 | The Incident Response Plan is periodically tested via tabletop exercises or equivalents. When necessary, Management makes changes to the Incident Response Plan based on the test results. | ✅ |
| Incident Response Plan | CC7.4 | An Incident Response Plan outlines the process of identifying, prioritizing, communicating, assigning and tracking confirmed incidents through to resolution. | ✅ |

### Risk Assessment

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Vendor Due Diligence Review | CC9.2 | Vendor SOC 2 reports (or equivalent) are collected and reviewed on at least an annual basis. | ✅ |
| Risk Assessment | CC3.2 | Formal risk assessments are performed, which includes the identification of relevant internal and external threats related to security, availability, confidentiality, and fraud, and an analysis of risks associated with those threats. | ✅ |
| Risk Assessment and Treatment Policy | CC3.2 | A Risk Assessment and Treatment Policy governs the process for conducting risk assessments to account for threats, vulnerabilities, likelihood, and impact with respect to assets, team members, customers, vendors, suppliers, and partners. Risk tolerance and strategies are also defined in the policy. | ✅ |
| Vendor Risk Assessment | CC9.2 | New vendors are assessed in accordance with the Vendor Risk Management Policy prior to engaging with the vendor. Reassessment occurs at least annually. | ✅ |
| Risk Register | CC3.2 | A risk register is maintained, which records the risk mitigation strategies for identified risks, and the development or modification of controls consistent with the risk mitigation strategy. | ✅ |
| Vendor Risk Management Policy | CC9.2 | A Vendor Risk Management Policy defines a framework for the onboarding and management of the vendor relationship lifecycle. | ✅ |

### Network Security

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Network Security Policy | CC6.6 | A Network Security Policy identifies the requirements for protecting information and systems within and across networks. | ✅ |
| Endpoint Security | CC6.8 | Company endpoints are managed and configured with a strong password policy, anti-virus, and hard drive encryption. | ✅ |
| Automated Alerting for Security Events | CC7.2 | Alerting software is used to notify impacted teams of potential security events. | ✅ |

### Access Security

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Administrative Access is Restricted | CC6.1 | Administrative access to production infrastructure is restricted based on the principle of least privilege. | ✅ |
| Access to Product is Restricted | CC6.1 | Non-console access to production infrastructure is restricted to users with a unique SSH key or access key. | ✅ |
| Removal of Access | CC6.3 | Upon termination or when internal personnel no longer require access, system access is removed, as applicable. | ✅ |
| Encryption-at-Rest | CC6.1 | Service data is encrypted-at-rest. | ✅ |
| Asset Inventory | CC6.1 | A list of system assets, components, and respective owners are maintained and reviewed at least annually. | ✅ |
| User Access Reviews | CC6.2 | System owners conduct scheduled user access reviews of production servers, databases, and applications to validate internal user access is commensurate with job responsibilities. | ✅ |
| Least Privilege in Use | CC6.1 | Users are provisioned access to systems based on principle of least privilege. | ✅ |
| Access Control and Termination Policy | CC6.3 | An Access Control and Termination Policy governs authentication and access to applicable systems, data, and networks. | ✅ |
| Unique Access IDs | CC6.1 | Personnel are assigned unique IDs to access sensitive systems, networks, and information. | ✅ |
| Encryption and Key Management Policy | CC6.7 | An Encryption and Key Management Policy supports the secure encryption and decryption of app secrets, and governs the use of cryptographic controls. | ✅ |

### Communications

| Control | TSC Mapping | Description | Status |
|---|---|---|---|
| Terms of Service | CC2.3 | Terms of Service or the equivalent are published or shared to external users. | ✅ |
| Communication of Critical Information | CC2.2 | Critical information is communicated to external parties, as applicable. | ✅ |
| Confidential Reporting Channel | CC1.1 | A confidential reporting channel is made available to internal personnel and external parties to report security and other identified concerns. | ✅ |
| Communication of Security Commitments | CC2.3 | Security commitments and expectations are communicated to both internal personnel and external users via the company's website. | ✅ |
| Description of Services | CC2.2 | Descriptions of the company's services and systems are available to both internal personnel and external users. | ✅ |
| Privacy Policy | P1 | A Privacy Policy to both external users and internal personnel. This policy details the company's privacy commitments. | ✅ |

---

## Maintenance

- This matrix is reviewed at least quarterly and after any material change.
- Status changes from ✅ trigger a corrective action plan with owner and target date.
- The auditor uses this matrix as a starting point — actual testing requires evidence walk-throughs documented in [`evidence/`](../evidence/).

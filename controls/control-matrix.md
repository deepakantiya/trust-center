# SOC 2 Control Matrix

This matrix maps each control domain to the implemented control(s), the policy/process owner, and the evidence collected.

**Legend**
- **Status:** ✅ Operating · 🟡 Partial · 🔴 Gap · ⚪ Not in scope
- **Frequency:** how often the control runs
- **Test type:** Inquiry (I), Observation (O), Inspection (Insp), Re-performance (R)

---

## Change Management

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CM-1 | Segregation of Environments | Development, staging, and production environments are segregated. | Engineering | ✅ | Environment configs; network diagrams |
| CM-2 | Secure Development Policy | A Secure Development Policy defines the requirements for secure software and system development and maintenance. | CISO | ✅ | Policy document |
| CM-3 | Production Data Use is Restricted | Production data is not used in the development and testing environments, unless required for debugging customer issues. | Engineering | ✅ | Data handling procedures; access logs |
| CM-4 | Software Change Testing | Software changes are tested prior to being deployed into production. | Engineering | ✅ | CI/CD logs; PR samples |
| CM-5 | Baseline Configurations | Baseline configurations and codebases for production infrastructure, systems, and applications are securely managed. | Engineering / Security | ✅ | IaC configs; configuration audit reports |
| CM-6 | Configuration and Asset Management Policy | A Configuration and Asset Management Policy governs configurations for new sensitive systems. | CISO | ✅ | Policy document |
| CM-7 | Approval for System Changes | System changes are approved by at least 1 independent person prior to deployment into production. | Engineering | ✅ | PR approvals; branch protection settings |
| CM-8 | Change Management Policy | A Change Management Policy governs the documenting, tracking, testing, and approving of system, network, security, and infrastructure changes. | CISO | ✅ | Policy document |

---

## Availability

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| AV-1 | Testing the Business Continuity and Disaster Recovery Plan | The Business Continuity and Disaster Recovery Plan is periodically tested via tabletop exercises or equivalents. When necessary, Management makes changes based on test results. | SRE / CISO | ✅ | DR exercise reports; tabletop records |
| AV-2 | Business Continuity and Disaster Recovery Policy | Business Continuity and Disaster Recovery Policy governs required processes for restoring the service or supporting infrastructure after suffering a disaster or disruption. | CISO | ✅ | Policy document |
| AV-3 | Uptime and Availability Monitoring | System tools monitor for uptime and availability based on predetermined criteria. | SRE | ✅ | Uptime reports; monitoring tool configs |
| AV-4 | Backup Restoration Testing | Backed-up data is restored to a non-production environment at least annually to validate the integrity of backups. | SRE | ✅ | Restore test logs; backup reports |

---

## Organizational Management

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| OM-1 | Information Security Program Review | Management is responsible for the design, implementation, and management of the organization's security policies and procedures. Policies are reviewed by management at least annually. | CISO | ✅ | Annual review records; policy approval logs |
| OM-2 | Organizational Chart | Management maintains a formal organizational chart to clearly identify positions of authority and lines of communication, and publishes it to internal personnel. | HR | ✅ | Org chart; internal publication records |
| OM-3 | Performance Reviews | Internal personnel are evaluated via a formal performance review at least annually. | HR | ✅ | HR performance review records |
| OM-4 | New Hire Screening | Hiring managers screen new hires or internal transfers to assess qualifications, experience, and competency. New hires sign confidentiality agreements upon hire. | HR | ✅ | Background check records; signed agreements |
| OM-5 | Disciplinary Action | Personnel who violate information security policies are subject to disciplinary action, clearly documented in one or more policies. | HR | ✅ | Policy document; HR disciplinary records |
| OM-6 | Performance Review Policy | A Performance Review Policy provides personnel context and transparency into their performance and career development processes. | HR | ✅ | Policy document |
| OM-7 | Cybersecurity Insurance | Cybersecurity insurance has been procured to help minimize the financial impact of cybersecurity loss events. | CISO / Finance | ✅ | Insurance binder |
| OM-8 | Roles and Responsibilities | Information security roles and responsibilities are outlined for personnel responsible for the security, availability, and confidentiality of the system. | CISO / HR | ✅ | Role descriptions; CISO charter |
| OM-9 | Information Security Policy | An Information Security Policy establishes the security requirements for maintaining the security, confidentiality, integrity, and availability of applications, systems, infrastructure, and data. | CISO | ✅ | Policy document |
| OM-10 | Acceptable Use Policy | An Acceptable Use Policy defines standards for appropriate and secure use of company hardware and electronic systems including storage media, communication tools, and internet access. | CISO / HR | ✅ | Policy document; signed acknowledgments |
| OM-11 | Internal Control Policy | An Internal Control Policy identifies how a system of controls should be maintained to safeguard assets, promote operational efficiency, and encourage adherence to prescribed managerial policies. | CISO / GRC | ✅ | Policy document |
| OM-12 | Code of Conduct | A Code of Conduct outlines ethical expectations, behavior standards, and ramifications of noncompliance. | HR / Legal | ✅ | Signed acknowledgments; hotline reports |

---

## Confidentiality

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| CO-1 | Data Classification Policy | A Data Classification Policy details the security and handling protocols for sensitive data. | DPO / CISO | ✅ | Policy document; data inventory |
| CO-2 | Disposal of Customer Data | Upon customer request, data that is no longer needed is removed from databases and file stores in accordance with agreed-upon customer requirements. | DPO / Engineering | ✅ | Deletion request logs; confirmation records |
| CO-3 | Data Retention and Disposal Policy | A Data Retention and Disposal Policy specifies how customer data is to be retained and disposed of based on compliance requirements and contractual obligations. | DPO / Legal | ✅ | Policy document; retention schedule |
| CO-4 | Access to Customer Data is Restricted | Access to, erasure of, or destruction of customer data is restricted to personnel that need access based on the principle of least privilege. | Security / DPO | ✅ | Access control matrix; access logs |

---

## Vulnerability Management

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| VM-1 | Vulnerability and Patch Management Policy | A Vulnerability Management and Patch Management Policy outlines the processes to efficiently respond to identified vulnerabilities. | CISO | ✅ | Policy document |
| VM-2 | Third-Party Penetration Test | A 3rd party is engaged to conduct a network and application penetration test of the production environment at least annually. Critical and high-risk findings are tracked through resolution. | CISO / GRC | ✅ | Pentest report; findings tracker |

---

## Incident Response

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| IR-1 | Tracking a Security Incident | Identified incidents are documented, tracked, and analyzed according to the Incident Response Plan. | Security | ✅ | IR tickets; incident log |
| IR-2 | Lessons Learned | After any identified security incident has been resolved, management provides a "Lessons Learned" document to the team to continually improve security and operations. | CISO | ✅ | Postmortem documents |
| IR-3 | Incident Response Plan Testing | The Incident Response Plan is periodically tested via tabletop exercises or equivalents. When necessary, Management makes changes based on test results. | CISO / Security | ✅ | Tabletop exercise records |
| IR-4 | Incident Response Plan | An Incident Response Plan outlines the process of identifying, prioritizing, communicating, assigning, and tracking confirmed incidents through to resolution. | CISO | ✅ | IR Plan document |

---

## Risk Assessment

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| RA-1 | Vendor Due Diligence Review | Vendor SOC 2 reports (or equivalent) are collected and reviewed on at least an annual basis. | GRC / Procurement | ✅ | Vendor review records; SOC 2 reports |
| RA-2 | Risk Assessment | Formal risk assessments are performed, including identification of relevant internal and external threats related to security, availability, confidentiality, and fraud, and analysis of associated risks. | CISO / GRC | ✅ | Risk register; assessment workpapers |
| RA-3 | Risk Assessment and Treatment Policy | A Risk Assessment and Treatment Policy governs the process for conducting risk assessments to account for threats, vulnerabilities, likelihood, and impact. Risk tolerance and strategies are also defined. | CISO | ✅ | Policy document |
| RA-4 | Vendor Risk Assessment | New vendors are assessed in accordance with the Vendor Risk Management Policy prior to engagement. Reassessment occurs at least annually. | GRC / Procurement | ✅ | Vendor assessment records |
| RA-5 | Risk Register | A risk register is maintained, which records the risk mitigation strategies for identified risks and the development or modification of controls consistent with the risk mitigation strategy. | CISO / GRC | ✅ | Risk register |
| RA-6 | Vendor Risk Management Policy | A Vendor Risk Management Policy defines a framework for the onboarding and management of the vendor relationship lifecycle. | GRC / Legal | ✅ | Policy document |

---

## Network Security

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| NS-1 | Network Security Policy | A Network Security Policy identifies the requirements for protecting information and systems within and across networks. | CISO | ✅ | Policy document |
| NS-2 | Endpoint Security | Company endpoints are managed and configured with a strong password policy, anti-virus, and hard drive encryption. | Security / IT | ✅ | MDM configs; EDR reports |
| NS-3 | Automated Alerting for Security Events | Alerting software is used to notify impacted teams of potential security events. | Security | ✅ | SIEM dashboards; alert configs |

---

## Access Security

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| AS-1 | Administrative Access is Restricted | Administrative access to production infrastructure is restricted based on the principle of least privilege. | Security / IT | ✅ | Access matrix; privilege audit reports |
| AS-2 | Access to Product is Restricted | Non-console access to production infrastructure is restricted to users with a unique SSH key or access key. | Security / Engineering | ✅ | SSH key inventory; access logs |
| AS-3 | Removal of Access | Upon termination or when internal personnel no longer require access, system access is removed, as applicable. | IT / HR | ✅ | Offboarding checklists; deprovisioning logs |
| AS-4 | Encryption-at-Rest | Service data is encrypted-at-rest. | Engineering / Security | ✅ | Encryption configs; tool documentation |
| AS-5 | Asset Inventory | A list of system assets, components, and respective owners are maintained and reviewed at least annually. | IT / Security | ✅ | Asset inventory records |
| AS-6 | User Access Reviews | System owners conduct scheduled user access reviews of production servers, databases, and applications to validate internal user access is commensurate with job responsibilities. | IT / Security | ✅ | Access review records |
| AS-7 | Least Privilege in Use | Users are provisioned access to systems based on the principle of least privilege. | IT / Security | ✅ | Access provisioning tickets; RBAC configs |
| AS-8 | Access Control and Termination Policy | An Access Control and Termination Policy governs authentication and access to applicable systems, data, and networks. | CISO | ✅ | Policy document |
| AS-9 | Unique Access IDs | Personnel are assigned unique IDs to access sensitive systems, networks, and information. | IT / Security | ✅ | IdP user records; SSO configs |
| AS-10 | Encryption and Key Management Policy | An Encryption and Key Management Policy supports the secure encryption and decryption of app secrets, and governs the use of cryptographic controls. | CISO / Security | ✅ | Policy document; key management records |

---

## Communications

| ID | Control | Description | Owner | Status | Evidence |
|---|---|---|---|---|---|
| COM-1 | Terms of Service | Terms of Service or the equivalent are published or shared to external users. | Legal | ✅ | Published ToS; website |
| COM-2 | Communication of Critical Information | Critical information is communicated to external parties, as applicable. | CISO / Legal | ✅ | Notification records; customer communications |
| COM-3 | Confidential Reporting Channel | A confidential reporting channel is made available to internal personnel and external parties to report security and other identified concerns. | HR / CISO | ✅ | Whistleblower hotline records |
| COM-4 | Communication of Security Commitments | Security commitments and expectations are communicated to both internal personnel and external users via the company's website. | CISO | ✅ | Trust Center website; internal wiki |
| COM-5 | Description of Services | Descriptions of the company's services and systems are available to both internal personnel and external users. | CISO / Product | ✅ | Trust Center website; service documentation |
| COM-6 | Privacy Policy | A Privacy Policy is available to both external users and internal personnel. This policy details the company's privacy commitments. | DPO / Legal | ✅ | Published Privacy Policy; website |

---

## Maintenance

- This matrix is reviewed at least quarterly and after any material change.
- Status changes from ✅ trigger a corrective action plan with owner and target date.
- The auditor uses this matrix as a starting point — actual testing requires evidence walk-throughs documented in [`evidence/`](../evidence/).

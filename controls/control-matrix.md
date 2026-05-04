# Trust Center Controls Reference

| Field | Value |
|---|---|
| **Owner** | GRC Lead |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Quarterly |
| **Total Controls** | 58 |

---

## Change Management

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| CM-01 | Segregation of Environments | Development, staging, and production environments are segregated. | CC8.1 | Engineering Lead | Architecture diagram, network configuration |
| CM-02 | Secure Development Policy | A Secure Development Policy defines the requirements for secure software and system development and maintenance. | CC8.1 | Security Team | Policy document with approval signatures |
| CM-03 | Production Data Use is Restricted | Production data is not used in the development and testing environments, unless required for debugging customer issues. | C1.1 | Engineering Lead | Policy document, data masking procedures |
| CM-04 | Software Change Testing | Software changes are tested prior to being deployed into production. | CC8.1 | QA Lead | CI/CD pipeline logs, test reports |
| CM-05 | Baseline Configurations | Baseline configurations and codebases for production infrastructure, systems, and applications are securely managed. | CC8.1 | DevOps Lead | Configuration management tool exports |
| CM-06 | Configuration and Asset Management Policy | A Configuration and Asset Management Policy governs configurations for new sensitive systems. | CC8.1 | IT Manager | Policy document |
| CM-07 | Approval for System Changes | System changes are approved by at least 1 independent person prior to deployment into production. | CC8.1 | Engineering Lead | Change request tickets, approval records |
| CM-08 | Change Management Policy | A Change Management Policy governs the documenting, tracking, testing, and approving of system, network, security, and infrastructure changes. | CC8.1 | GRC Lead | Policy document with approval signatures |

---

## Availability

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| AV-01 | Testing BC/DR Plan | The Business Continuity and Disaster Recovery Plan is periodically tested via tabletop exercises or equivalents. When necessary, Management makes changes to the Business Continuity and Disaster Recovery Plan based on the test results. | A1.3 | IT Manager | BC/DR test report, participant list |
| AV-02 | BC/DR Policy | Business Continuity and Disaster Recovery Policy governs required processes for restoring the service or supporting infrastructure after suffering a disaster or disruption. | A1.2 | IT Manager | Policy document |
| AV-03 | Uptime and Availability Monitoring | System tools monitors for uptime and availability based on predetermined criteria. | A1.1 | DevOps Lead | Monitoring tool configuration, alert history |
| AV-04 | Backup Restoration Testing | Backed-up data is restored to a non-production environment at least annually to validate the integrity of backups. | A1.2 | DevOps Lead | Restoration test report |

---

## Organizational Management

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| OM-01 | Information Security Program Review | Management is responsible for the design, implementation, and management of the organization's security policies and procedures. The policies and procedures are reviewed by management at least annually. | CC4.1 | CISO | Policy inventory, review records |
| OM-02 | Organizational Chart | Management maintains a formal organizational chart to clearly identify positions of authority and the lines of communication, and publishes the organizational chart to internal personnel. | CC1.3 | HR Manager | Organizational chart |
| OM-03 | Performance Reviews | Internal personnel are evaluated via a formal performance review at least annually. | CC1.5 | HR Manager | Performance review completion report |
| OM-04 | New Hire Screening | Hiring managers screen new hires or internal transfers to assess their qualifications, experience, and competency to fulfill their responsibilities. New hires sign confidentiality agreements or equivalents upon hire. | CC1.4 | HR Manager | Background check records, signed NDAs |
| OM-05 | Disciplinary Action | Personnel who violate information security policies are subject to disciplinary action and such disciplinary action is clearly documented in one or more policies. | CC1.5 | HR Manager | Policy document |
| OM-06 | Performance Review Policy | A Performance Review Policy provides personnel context and transparency into their performance and career development processes. | CC1.5 | HR Manager | Policy document |
| OM-07 | Cybersecurity Insurance | Cybersecurity insurance has been procured to help minimize the financial impact of cybersecurity loss events. | CC9.1 | CFO | Insurance certificate |
| OM-08 | Roles and Responsibilities | Information security roles and responsibilities are outlined for personnel responsible for the security, availability, and confidentiality of the system. | CC1.3 | CISO | Job descriptions, RACI matrix |
| OM-09 | Information Security Policy | An Information Security Policy establishes the security requirements for maintaining the security, confidentiality, integrity, and availability of applications, systems, infrastructure, and data. | CC5.3 | CISO | Policy document |
| OM-10 | Acceptable Use Policy | An Acceptable Use Policy defines standards for appropriate and secure use of company hardware and electronic systems including storage media, communication tools and internet access. | CC5.3 | CISO | Policy document, acknowledgement records |
| OM-11 | Internal Control Policy | An Internal Control Policy identifies how a system of controls should be maintained to safeguard assets, promote operational efficiency, and encourage adherence to prescribed managerial policies. | CC5.1 | GRC Lead | Policy document |
| OM-12 | Code of Conduct | A Code of Conduct outlines ethical expectations, behavior standards, and ramifications of noncompliance. | CC1.1 | HR Manager | Code of Conduct, acknowledgement records |

---

## Confidentiality

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| CF-01 | Data Classification Policy | A Data Classification Policy details the security and handling protocols for sensitive data. | C1.1 | CISO | Policy document |
| CF-02 | Disposal of Customer Data | Upon customer request, Company requires that data that is no longer needed from databases and other file stores is removed in accordance with agreed-upon customer requirements. | C1.2 | Data Protection Officer | Deletion request log, confirmation records |
| CF-03 | Data Retention and Disposal Policy | A Data Retention and Disposal Policy specifies how customer data is to be retained and disposed of based on compliance requirements and contractual obligations. | C1.2 | Data Protection Officer | Policy document |
| CF-04 | Access to Customer Data is Restricted | Access to, erasure of, or destruction of customer data is restricted to personnel that need access based on the principle of least privilege. | C1.1 | Security Team | Access lists, justification records |

---

## Vulnerability Management

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| VM-01 | Vulnerability and Patch Management Policy | A Vulnerability Management and Patch Management Policy outlines the processes to efficiently respond to identified vulnerabilities. | CC7.1 | Security Team | Policy document, scan reports |
| VM-02 | Third-Party Penetration Test | A 3rd party is engaged to conduct a network and application penetration test of the production environment at least annually. Critical and high-risk findings are tracked through resolution. | CC4.1 | Security Team | Penetration test report, remediation tickets |

---

## Incident Response

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| IR-01 | Tracking a Security Incident | Identified incidents are documented, tracked, and analyzed according to the Incident Response Plan. | CC7.3 | Security Team | Incident log, incident tickets |
| IR-02 | Lessons Learned | After any identified security incident has been resolved, management provides a "Lessons Learned" document to the team in order to continually improve security and operations. | CC7.4 | Security Team | Lessons learned documents |
| IR-03 | Incident Response Plan Testing | The Incident Response Plan is periodically tested via tabletop exercises or equivalents. When necessary, Management makes changes to the Incident Response Plan based on the test results. | CC7.4 | Security Team | IR test report, participant list |
| IR-04 | Incident Response Plan | An Incident Response Plan outlines the process of identifying, prioritizing, communicating, assigning and tracking confirmed incidents through to resolution. | CC7.4 | CISO | Incident Response Plan document |

---

## Risk Assessment

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| RA-01 | Vendor Due Diligence Review | Vendor SOC 2 reports (or equivalent) are collected and reviewed on at least an annual basis. | CC9.2 | GRC Lead | Vendor list, SOC 2 reports |
| RA-02 | Risk Assessment | Formal risk assessments are performed, which includes the identification of relevant internal and external threats related to security, availability, confidentiality, and fraud, and an analysis of risks associated with those threats. | CC3.2 | GRC Lead | Risk assessment document |
| RA-03 | Risk Assessment and Treatment Policy | A Risk Assessment and Treatment Policy governs the process for conducting risk assessments to account for threats, vulnerabilities, likelihood, and impact with respect to assets, team members, customers, vendors, suppliers, and partners. Risk tolerance and strategies are also defined in the policy. | CC3.2 | GRC Lead | Policy document |
| RA-04 | Vendor Risk Assessment | New vendors are assessed in accordance with the Vendor Risk Management Policy prior to engaging with the vendor. Reassessment occurs at least annually. | CC9.2 | GRC Lead | Vendor risk assessment records |
| RA-05 | Risk Register | A risk register is maintained, which records the risk mitigation strategies for identified risks, and the development or modification of controls consistent with the risk mitigation strategy. | CC3.2 | GRC Lead | Risk register document |
| RA-06 | Vendor Risk Management Policy | A Vendor Risk Management Policy defines a framework for the onboarding and management of the vendor relationship lifecycle. | CC9.2 | GRC Lead | Policy document |

---

## Network Security

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| NS-01 | Network Security Policy | A Network Security Policy identifies the requirements for protecting information and systems within and across networks. | CC6.6 | Security Team | Policy document |
| NS-02 | Endpoint Security | Company endpoints are managed and configured with a strong password policy, anti-virus, and hard drive encryption. | CC6.8 | IT Manager | Endpoint compliance report from MDM/EDR |
| NS-03 | Automated Alerting for Security Events | Alerting software is used to notify impacted teams of potential security events. | CC7.2 | Security Team | Alert configuration, test alert evidence |

---

## Access Security

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| AS-01 | Administrative Access is Restricted | Administrative access to production infrastructure is restricted based on the principle of least privilege. | CC6.1 | Security Team | Admin user lists, access justification |
| AS-02 | Access to Product is Restricted | Non-console access to production infrastructure is restricted to users with a unique SSH key or access key. | CC6.1 | DevOps Lead | Access key inventory |
| AS-03 | Removal of Access | Upon termination or when internal personnel no longer require access, system access is removed, as applicable. | CC6.3 | HR Manager | HR termination records, IdP audit logs |
| AS-04 | Encryption-at-Rest | Service data is encrypted-at-rest. | CC6.1 | DevOps Lead | Encryption configuration screenshots |
| AS-05 | Asset Inventory | A list of system assets, components, and respective owners are maintained and reviewed at least annually. | CC6.1 | IT Manager | Asset inventory document |
| AS-06 | User Access Reviews | System owners conduct scheduled user access reviews of production servers, databases, and applications to validate internal user access is commensurate with job responsibilities. | CC6.2 | Security Team | Access review records |
| AS-07 | Least Privilege in Use | Users are provisioned access to systems based on principle of least privilege. | CC6.1 | Security Team | Access request tickets |
| AS-08 | Access Control and Termination Policy | An Access Control and Termination Policy governs authentication and access to applicable systems, data, and networks. | CC6.3 | CISO | Policy document |
| AS-09 | Unique Access IDs | Personnel are assigned unique IDs to access sensitive systems, networks, and information. | CC6.1 | IT Manager | IdP user list |
| AS-10 | Encryption and Key Management Policy | An Encryption and Key Management Policy supports the secure encryption and decryption of app secrets, and governs the use of cryptographic controls. | CC6.7 | Security Team | Policy document, secrets management config |

---

## Communications

| Control ID | Control Name | Description | SOC 2 Mapping | Owner | Evidence |
|---|---|---|---|---|---|
| CO-01 | Terms of Service | Terms of Service or the equivalent are published or shared to external users. | CC2.3 | Legal | ToS URL, document screenshot |
| CO-02 | Communication of Critical Information | Critical information is communicated to external parties, as applicable. | CC2.2 | Communications | Status page, communication records |
| CO-03 | Confidential Reporting Channel | A confidential reporting channel is made available to internal personnel and external parties to report security and other identified concerns. | CC1.1 | HR Manager | Reporting channel documentation |
| CO-04 | Communication of Security Commitments | Security commitments and expectations are communicated to both internal personnel and external users via the company's website. | CC2.3 | Security Team | Security/trust page URL |
| CO-05 | Description of Services | Descriptions of the company's services and systems are available to both internal personnel and external users. | CC2.2 | Product Team | Website service pages |
| CO-06 | Privacy Policy | A Privacy Policy is published to both external users and internal personnel. This policy details the company's privacy commitments. | P1 | Legal | Privacy Policy URL |

---

## Summary

| Category | Control Count |
|---|---|
| Change Management | 8 |
| Availability | 4 |
| Organizational Management | 12 |
| Confidentiality | 4 |
| Vulnerability Management | 2 |
| Incident Response | 4 |
| Risk Assessment | 6 |
| Network Security | 3 |
| Access Security | 10 |
| Communications | 6 |
| **Total** | **58** |

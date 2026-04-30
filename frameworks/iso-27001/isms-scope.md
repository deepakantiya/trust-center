# ISO 27001:2022 — ISMS Scope Statement

| Field | Value |
|---|---|
| **Standard** | ISO/IEC 27001:2022, Clause 4.3 |
| **Owner** | CISO |
| **Version** | 1.0 |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |

---

## 1. Organization Overview

[Organization Name] (hereinafter "the Organization") provides [brief description of products/services, e.g., "a SaaS platform for enterprise data analytics"]. The Organization operates from [primary location(s)] and delivers services to customers in [geographic markets].

---

## 2. Scope Statement

The ISMS covers the **design, development, operation, support, and security of the [Product/Platform Name] SaaS platform**, including:

- All production infrastructure and cloud environments (AWS / GCP / Azure — specify)
- Corporate IT systems used to access, develop, or support the platform
- All personnel (employees, contractors, and managed service providers) with access to in-scope systems
- Physical office location(s): [list offices]
- Third-party services integrated into the platform (see vendor register)

### 2.1 In-Scope Systems

| System Category | Examples | Hosted |
|---|---|---|
| Production application | API servers, web frontend, background jobs | Cloud (CSP) |
| Data stores | Primary database, caches, object storage | Cloud (CSP) |
| CI/CD pipeline | Build servers, artifact registry, deployment tools | Cloud + SaaS |
| Corporate IT | Laptops, email, SSO, collaboration tools | SaaS + on-prem |
| Security tooling | SIEM, EDR, vulnerability scanner, PAM | SaaS + cloud |
| Corporate network | Office Wi-Fi, VPN | On-prem + cloud |

### 2.2 Out-of-Scope

| Exclusion | Justification |
|---|---|
| Physical data centers | The Organization uses cloud providers; data center physical controls are covered by the CSP's own ISO 27001 certification (obtain annual SOC 2 / ISO cert from CSP) |
| Legacy product [Name] | Scheduled for decommission by [date]; no customer data processed after [date] |
| Personal devices (BYOD) | Organization issues all devices; BYOD not permitted for production access |

---

## 3. Internal and External Context (Clause 4.1)

### External Factors

| Category | Relevant Factors |
|---|---|
| Regulatory | GDPR, CCPA, SOC 2, CMMC (if DoD supply chain), sector-specific regulations |
| Competitive | Customer security questionnaires; ISO 27001 as differentiator |
| Technology | Cloud-native architecture; open-source dependencies; AI/ML workloads |
| Threat landscape | Ransomware; supply chain attacks; credential phishing; insider threats |

### Internal Factors

| Category | Relevant Factors |
|---|---|
| Products & services | [Product Name] SaaS; [other product lines] |
| Organization structure | Engineering, Security, Legal, HR, Finance, Operations |
| Culture | Remote-first; DevSecOps mindset; blameless postmortems |
| Strategic direction | [Key growth initiatives, M&A activity, geographic expansion] |

---

## 4. Interested Parties (Clause 4.2)

| Party | Security Interests | How Addressed |
|---|---|---|
| Customers | Confidentiality of their data; platform availability; breach notification | DPA; SOC 2 report; Trust Center |
| Employees | Privacy; secure working environment; clear security responsibilities | Policies; training; HR processes |
| Regulators | Compliance with applicable laws | Legal register; DPIAs; GDPR controls |
| Investors / Board | Risk exposure; compliance posture; incident resilience | Board security briefings; GRC reporting |
| Suppliers / Partners | Clear security requirements; timely communication of incidents | Vendor security addenda; partner portal |
| Auditors / Assessors | Access to evidence; transparency | Audit programme; evidence library |

---

## 5. Interfaces and Dependencies

| Interface | Description | Risk Consideration |
|---|---|---|
| Cloud Service Providers | AWS, GCP, or Azure hosting in-scope infrastructure | CSP shared-responsibility model; CSP SOC 2 / ISO cert required |
| Identity Provider | Okta / Azure AD for SSO and MFA | Single point of failure for access; HA configuration required |
| Version Control (GitHub) | Source code and CI/CD configuration | Supply chain risk; branch protection; SAST in CI |
| Communication (Slack, Email) | Internal and customer communication | Phishing; data leakage; retention |
| Monitoring (SIEM, APM) | Security and operational observability | Log integrity; alert fatigue |

---

## 6. Scope Boundaries Diagram

```text
┌───────────────────────────────────────────────────────┐
│                  ISMS SCOPE BOUNDARY                  │
│                                                       │
│  ┌──────────────┐   ┌───────────────┐   ┌──────────┐  │
│  │  Production  │   │  Corporate IT │   │ Security │  │
│  │  Cloud Env   │   │  (SaaS+Equip) │   │ Tooling  │  │
│  └──────────────┘   └───────────────┘   └──────────┘  │
│                                                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  All Personnel (Employees + Contractors)         │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
          │                               │
          ▼                               ▼
  [Cloud Provider]               [SaaS Vendors]
  (Out of scope —                (Risk-managed via
  covered by CSP cert)           vendor register)
```

---

## 7. Approval

| Role | Name | Signature | Date |
|---|---|---|---|
| CISO | | | |
| CEO / DRI | | | |

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | CISO | Initial scope definition |

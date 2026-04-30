# Access Control Policy

| Field | Value |
|---|---|
| **Owner** | CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose

Define how access to information systems and data is granted, reviewed, modified, and revoked to ensure only authorized individuals access resources commensurate with their job responsibilities.

## 2. Scope

All identity, authentication, and authorization activities for production systems, corporate IT, SaaS applications, and physical facilities.

## 3. Principles

- **Least Privilege** — Grant the minimum access required to perform job duties.
- **Need to Know** — Access limited to information necessary for the task.
- **Separation of Duties** — Critical actions (e.g., production deploys, financial approvals) require multiple parties.
- **Default Deny** — Access is denied unless explicitly granted.

## 4. Requirements

### 4.1 Identity Lifecycle

| Event | SLA | Approver | Evidence |
|---|---|---|---|
| Onboarding (new hire) | Day 1 | Hiring Manager + IT | Ticket + provisioning logs |
| Role change | 5 business days | New Manager | Ticket + diff of permissions |
| Offboarding (termination) | **Within 24 hours** (immediate for involuntary) | HR + IT | Deprovisioning checklist |
| Contractor access | Time-bounded, max 90 days, renewable | Sponsor + CISO | Access request form |

### 4.2 Authentication

- All accounts shall use **Single Sign-On (SSO)** where supported.
- **Multi-Factor Authentication (MFA)** is **required** for:
  - All user accounts (workforce identity)
  - Production system access
  - Administrative consoles
  - Code repositories
  - VPN / remote access
- Passwords (where used) must meet:
  - Minimum 14 characters
  - No common/breached passwords (checked against HaveIBeenPwned or equivalent)
  - No periodic rotation unless compromise suspected (per NIST 800-63B)
  - Passphrases encouraged
- Service accounts must use rotated credentials or workload identity (e.g., IAM roles, OIDC tokens).

### 4.3 Authorization

- Access is granted based on **role-based access control (RBAC)** mapped to documented role profiles.
- Privileged access (admin, root, sudo) requires:
  - Documented business justification
  - CISO or delegate approval
  - Just-in-time elevation where technically feasible
  - Session logging
- Service accounts have no interactive login.

### 4.4 Access Reviews

| Type | Frequency | Reviewer |
|---|---|---|
| User access (all systems) | Quarterly | Manager + System Owner |
| Privileged access | Quarterly | CISO |
| Service accounts | Semi-annually | System Owner |
| Customer data access | Quarterly | Data Protection Officer |

Findings from reviews must be remediated within 30 days; results recorded in [`evidence/access-reviews/`](../evidence/access-reviews/).

### 4.5 Remote Access

- VPN or zero-trust network access (ZTNA) required for non-public services.
- Device must be managed (MDM enrolled) and meet endpoint security baseline.

### 4.6 Physical Access

- Office access via badge with logging; visitor escort required.
- Data centers: vendor-provided controls reviewed via SOC 2 reports.

## 5. SOC 2 Mapping

| Requirement | TSC |
|---|---|
| Logical access provisioning | CC6.1, CC6.2 |
| Authentication | CC6.1 |
| Removal of access | CC6.3 |
| Access reviews | CC6.2, CC6.3 |
| Privileged access | CC6.1, CC6.3 |
| Physical access | CC6.4, CC6.5 |

## 6. Enforcement

Violations are reported to the CISO and may result in disciplinary action.

## 7. Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

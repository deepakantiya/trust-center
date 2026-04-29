# Change Management Policy

| Field | Value |
|---|---|
| **Owner** | VP Engineering / CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose

Ensure changes to production systems are authorized, tested, documented, and traceable to support system integrity and SOC 2 CC8.1.

## 2. Scope

All changes to:
- Production application code
- Infrastructure (cloud resources, networking, identity)
- Database schemas and configuration
- Security controls
- Third-party integrations affecting customer data

## 3. Change Categories

| Type | Definition | Approval | Notice |
|---|---|---|---|
| **Standard** | Pre-approved, low risk, repeatable (e.g., scaling, patching via automation) | Automated | None |
| **Normal** | New features, bug fixes, infra changes | Peer review + CI pass | Released per schedule |
| **Emergency** | Required to resolve P0/P1 incident | On-call lead + retrospective approval within 48h | Customer notice if applicable |

## 4. Requirements

### 4.1 Source Control
- All code in version-controlled repositories (Git).
- Direct pushes to `main`/`master` are prohibited.
- Branch protection: required reviews, required status checks, signed commits where feasible.

### 4.2 Peer Review
- Every change requires at least **one** approving review from someone other than the author.
- Security-sensitive changes require review from the security team.

### 4.3 Testing
- Automated tests must pass in CI before merge.
- Test coverage thresholds defined per project.

### 4.4 Deployment
- Deployments via automated pipelines (no manual prod deploys).
- Production access for humans is read-only by default; write access via break-glass.
- Deployment logs retained ≥ 1 year.

### 4.5 Rollback
- Every change must have a documented rollback plan (or be safely revertable via version control).

### 4.6 Documentation
- PR/MR description includes: what changed, why, test evidence, risk assessment for high-risk changes.
- Customer-impacting changes documented in changelog/status page.

## 5. Evidence
Evidence collected automatically:
- PR metadata (author, reviewers, approval timestamps)
- CI run logs
- Deployment logs (commit SHA → environment → timestamp → operator)
- Sample selection used for SOC 2 audit testing

Stored in [`evidence/change-management/`](../evidence/change-management/).

## 6. SOC 2 Mapping

| Requirement | TSC |
|---|---|
| Authorized changes | CC8.1 |
| Segregation of duties | CC8.1, CC6.3 |
| Testing prior to deployment | CC8.1 |
| Documentation of changes | CC8.1 |

## 7. Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

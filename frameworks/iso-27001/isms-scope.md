# ISO 27001:2022 — ISMS Scope Statement

| Field | Value |
|---|---|
| **Standard** | ISO/IEC 27001:2022, Clause 4.3 |
| **Owner** | CISO |
| **Version** | 2.0 |
| **Effective** | 2026-05-04 |
| **Review** | Annual |

---

## 1. Organization Overview

[Organization Name] provides [brief description of products/services]. The Organization operates from [primary location(s)] and delivers services to customers in [geographic markets].

---

## 2. Scope Statement

The ISMS covers the **design, development, operation, support, and security of the [Product/Platform Name] SaaS platform**, including:

- All production infrastructure and cloud environments
- Corporate IT systems with access to in-scope systems
- All personnel (employees, contractors, managed service providers) with access
- Physical office location(s): [list offices]

---

## 3. Trust Center Control Coverage

The ISMS is supported by **58 Trust Center controls** documented in [`../../controls/control-matrix.md`](../../controls/control-matrix.md):

| Control Category | Controls | ISO 27001 Alignment |
|---|---|---|
| Change Management | CM-01 to CM-08 | Clause 8.25–8.33 |
| Availability | AV-01 to AV-04 | Clause 5.29–5.30, 8.13–8.14 |
| Organizational Management | OM-01 to OM-12 | Clause 5.1–5.37, 6.1–6.8 |
| Confidentiality | CF-01 to CF-04 | Clause 5.12–5.13, 5.33 |
| Vulnerability Management | VM-01, VM-02 | Clause 8.8 |
| Incident Response | IR-01 to IR-04 | Clause 5.24–5.28 |
| Risk Assessment | RA-01 to RA-06 | Clause 5.7, 5.19–5.23, 8.2 |
| Network Security | NS-01 to NS-03 | Clause 8.7, 8.15–8.21 |
| Access Security | AS-01 to AS-10 | Clause 5.15–5.18, 8.2–8.5 |
| Communications | CO-01 to CO-06 | Clause 5.5, 5.34 |

---

## 4. Exclusions

| Exclusion | Justification |
|---|---|
| [Excluded area] | [Reason] |

---

## 5. Interfaces

| Interface | Description | Controls |
|---|---|---|
| Cloud Providers | IaaS/PaaS | RA-01, RA-04 (Vendor assessments) |
| Third-Party Services | SaaS integrations | RA-01, RA-04, RA-06 |
| Customers | API access | AS-02, CF-04, CO-01 |

---

## 6. Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| CISO | | | |
| Management Rep | | | |

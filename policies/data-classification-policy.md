# Data Classification & Handling Policy

| Field | Value |
|---|---|
| **Owner** | Data Protection Officer / CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose
Define classification levels and handling requirements so data is protected commensurate with its sensitivity.

## 2. Classification Levels

| Level | Definition | Examples | Access |
|---|---|---|---|
| **Public** | Approved for public disclosure | Marketing pages, published docs | Anyone |
| **Internal** | Default for business data | Internal wiki, org charts | All employees |
| **Confidential** | Disclosure could harm Company or customers | Source code, financials, customer lists | Need to know |
| **Restricted** | Highest sensitivity; legally/contractually protected | Customer data, PII, PHI, secrets, encryption keys | Explicit, logged |

## 3. Handling Requirements

| Control | Public | Internal | Confidential | Restricted |
|---|:---:|:---:|:---:|:---:|
| Encryption at rest | — | Recommended | **Required** | **Required (AES-256)** |
| Encryption in transit | Recommended | **Required** | **Required (TLS 1.2+)** | **Required (TLS 1.3 preferred)** |
| Access control | None | Authenticated | RBAC | RBAC + MFA + logging |
| External sharing | OK | Approved channels only | NDA + approval | Prohibited unless contractually required |
| Storage on personal devices | OK | Discouraged | Prohibited | Prohibited |
| Print | OK | OK | Cross-cut shred | Prohibited / locked storage |
| Retention | Indefinite | Per schedule | Per schedule | Minimum necessary |
| Disposal | Standard | Standard | Secure delete | Cryptographic erasure or destruction |

## 4. Personal Data
Personal data subject to GDPR/CCPA is classified at minimum **Confidential**, and customer-provided personal data is classified **Restricted**. See [Privacy Policy](./privacy-policy.md).

## 5. Data Inventory
A data inventory mapping data types → systems → classification → owner is maintained in [`controls/data-inventory.md`](../controls/data-inventory.md) and reviewed semi-annually.

## 6. Retention
See [Data Retention Schedule](./data-retention-schedule.md). Customer data is retained only as long as the customer relationship + applicable legal hold; deletion within 90 days post-termination is the default.

## 7. SOC 2 Mapping
| Requirement | TSC |
|---|---|
| Data classification | C1.1 |
| Confidentiality protection | C1.1, CC6.1 |
| Disposal | C1.2, CC6.5 |

## 8. Revision History
| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

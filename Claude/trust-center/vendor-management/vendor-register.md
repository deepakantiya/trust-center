# Vendor / Subprocessor Register

**Last Updated:** YYYY-MM-DD · **Owner:** GRC · **Review:** Annually per vendor; quarterly register review

## Subprocessors of Customer Data

These third parties process customer data on our behalf. The list is also published on the [public Trust Center](../website/subprocessors.html). Customers receive 30 days' notice of additions.

| Vendor | Service Provided | Data Processed | Data Location | Compliance Reports | Tier | DPA Signed | Last Reviewed |
|---|---|---|---|---|---|:---:|---|
| Example Cloud Provider | Infrastructure (compute, storage, networking) | All customer data | US-EAST, EU-WEST | SOC 1/2, ISO 27001/27017/27018, PCI | Critical | ✅ | YYYY-MM-DD |
| Example Auth Provider | Authentication / SSO | User authentication metadata | US, EU | SOC 2, ISO 27001 | High | ✅ | YYYY-MM-DD |
| Example Email Provider | Transactional email | Email addresses, message content | US | SOC 2 | High | ✅ | YYYY-MM-DD |
| Example Monitoring | Application performance monitoring | Telemetry, logs (no payloads) | US, EU | SOC 2 | High | ✅ | YYYY-MM-DD |
| Example Customer Support | Support ticket platform | Customer-submitted info | US | SOC 2 | High | ✅ | YYYY-MM-DD |
| Example Billing Processor | Payment processing | Payment metadata (no card data stored by us) | US | PCI DSS L1, SOC 2 | High | ✅ | YYYY-MM-DD |

## Internal Vendors (No Customer Data)

| Vendor | Service | Data Processed | Tier | Last Reviewed |
|---|---|---|---|---|
| Example HRIS | Employee records | Workforce PII | Medium | YYYY-MM-DD |
| Example IdP | Workforce identity | Workforce auth | High | YYYY-MM-DD |
| Example Code Host | Source code repository | Source, secrets (managed) | High | YYYY-MM-DD |

## Process Notes

- New vendor onboarding requires completion of [Vendor Intake Form](./vendor-intake-form.md).
- Tier definitions in [Vendor Management Policy](../policies/vendor-management-policy.md).
- Subprocessor changes communicated to customers via [subprocessor-notify list](../website/subprocessors.html#notify).

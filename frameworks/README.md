# Compliance Frameworks

This directory contains onboarding documentation, control mappings, assessment workbooks, and gap-analysis artifacts for each compliance framework in scope.

## Frameworks in Scope

| Framework | Standard Body | Audience | Key File |
|---|---|---|---|
| **SOC 2 Type II** | AICPA | SaaS / cloud service providers | [`soc2/type2-readiness.md`](soc2/type2-readiness.md) |
| **ISO 27001:2022** | ISO/IEC | Any organization | [`iso-27001/annex-a-soa.md`](iso-27001/annex-a-soa.md) |
| **ISO/SAE 21434:2021** | ISO / SAE | Automotive OEMs & suppliers | [`iso-sae-21434/control-mapping.md`](iso-sae-21434/control-mapping.md) |
| **CMMC Level 1** | DoD / CMMC AB | DoD suppliers handling FCI | [`cmmc/level-1-assessment.md`](cmmc/level-1-assessment.md) |
| **CMMC Level 2** | DoD / CMMC AB | DoD suppliers handling CUI | [`cmmc/level-2-assessment.md`](cmmc/level-2-assessment.md) |

## Trust Services Criteria Coverage

The control matrix (`../controls/control-matrix.md`) covers all five TSC categories:

| Category | Criteria | Scope |
|---|---|---|
| **Security (CC)** | CC1–CC9 | Always in scope |
| **Availability (A)** | A1 | In scope for SLAs |
| **Confidentiality (C)** | C1 | In scope for confidential data handling |
| **Processing Integrity (PI)** | PI1 | In scope for transaction-processing systems |
| **Privacy (P)** | P1–P8 | In scope for PII processing |

---

## Cross-Framework Control Map

[`cross-framework-map.md`](cross-framework-map.md) shows, for every major control domain, which specific requirements across **all five** frameworks are satisfied by the same underlying control. Use it to:

- Identify shared evidence that satisfies multiple auditors simultaneously
- Spot gaps where a control satisfies one framework but not another
- Prioritize remediation for maximum multi-framework coverage

## Quick Start by Role

### Auditor / Assessor
1. Start with `cross-framework-map.md` to understand control coverage
2. Navigate to the framework subfolder for the specific assessment
3. Reference `../controls/control-matrix.md` for the SOC 2 TSC baseline
4. Pull evidence from `../evidence/`

### GRC / Compliance Engineer
1. Run `python scripts/framework_gap_check.py --all` to generate a gap report
2. Open the relevant framework's assessment file to see current status
3. Open `cmmc/poam.md` or the relevant risk-treatment file for remediation tracking

### CISO / Program Owner
1. Read the `README.md` in each framework subfolder for executive summary
2. Review `cross-framework-map.md` for shared-effort opportunities
3. Track open gaps via `cmmc/poam.md` (generic enough for any framework)

## Status Legend

| Symbol | Meaning |
|---|---|
| ✅ | Implemented and operating effectively |
| 🟡 | Partially implemented — gaps exist |
| 🔴 | Not implemented — remediation required |
| ⚪ | Not applicable / out of scope |
| 📋 | Planned — target date set |

## Maintenance

- Framework files are reviewed **annually** and after any material change to scope, products, or processes.
- The cross-framework map is regenerated whenever a new control is added to `controls/control-matrix.md`.
- Gap statuses are updated in the relevant assessment file after each internal audit cycle.

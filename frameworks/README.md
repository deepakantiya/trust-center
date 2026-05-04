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
| **NIST SP 800-53** | NIST | Federal / enterprise | [`nist-800-53/control-mapping.md`](nist-800-53/control-mapping.md) |

---

## Trust Center Controls Reference

The control matrix (`../controls/control-matrix.md`) contains **58 Trust Center controls** across 10 categories:

| Category | Control IDs | Count |
|---|---|---|
| Change Management | CM-01 to CM-08 | 8 |
| Availability | AV-01 to AV-04 | 4 |
| Organizational Management | OM-01 to OM-12 | 12 |
| Confidentiality | CF-01 to CF-04 | 4 |
| Vulnerability Management | VM-01 to VM-02 | 2 |
| Incident Response | IR-01 to IR-04 | 4 |
| Risk Assessment | RA-01 to RA-06 | 6 |
| Network Security | NS-01 to NS-03 | 3 |
| Access Security | AS-01 to AS-10 | 10 |
| Communications | CO-01 to CO-06 | 6 |
| **Total** | | **58** |

---

## How to Use This Directory

1. **Single source of truth** — [`cross-framework-map.md`](cross-framework-map.md) shows how each Trust Center control satisfies multiple frameworks.
2. **Per-framework workbooks** — Each subdirectory contains assessment checklists, scoping statements, and templates specific to that standard.
3. **Pre-audit testing** — Use [`soc2/testing-procedures.md`](soc2/testing-procedures.md) to run quarterly internal tests against all 58 controls.
4. **Gap analysis** — Compare your current state against each framework's requirements using the mapping tables.
5. **Evidence collection** — Each control specifies required evidence in the control matrix.

---

## Quick Links

| Document | Purpose |
|---|---|
| [`../controls/control-matrix.md`](../controls/control-matrix.md) | Master control list with owners and evidence |
| [`cross-framework-map.md`](cross-framework-map.md) | Maps Trust Center controls to all frameworks |
| [`soc2/testing-procedures.md`](soc2/testing-procedures.md) | 58 internal test procedures |
| [`soc2/type2-readiness.md`](soc2/type2-readiness.md) | SOC 2 Type II audit preparation |
| [`cmmc/poam.md`](cmmc/poam.md) | Plan of Action & Milestones template |

# Auditor Guide

Welcome. This document orients an external auditor (or internal audit) to navigate the repository for a SOC 2 engagement.

## 1. Quick Tour

| You want to... | Look at... |
|---|---|
| Understand the security program | [`policies/information-security-policy.md`](../policies/information-security-policy.md) |
| See controls mapped to TSC | [`controls/control-matrix.md`](../controls/control-matrix.md) |
| Find evidence for a control | [`evidence/`](../evidence/) — folders mirror control areas |
| Review the risk program | [`risk-management/risk-register.md`](../risk-management/risk-register.md) |
| Inspect vendor / subprocessor program | [`vendor-management/vendor-register.md`](../vendor-management/vendor-register.md) |
| Review IR plan | [`policies/incident-response-policy.md`](../policies/incident-response-policy.md) + [`incident-response/`](../incident-response/) |

## 2. Sample Selections

For populations (changes, terminations, new hires, access reviews), we follow standard sampling tables. Sampled items are stored under `evidence/<area>/` with the suffix `_sampled-NNN`.

## 3. Walkthroughs

We can demonstrate the following live walkthroughs on request:

- New hire provisioning end-to-end
- Termination / access removal within 24h
- Code change → review → CI → deploy
- Quarterly access review and remediation
- Incident response (using a previously-resolved real incident, redacted)
- Backup restore
- Vendor onboarding due diligence

## 4. Out-of-Repo Evidence

Some artifacts live outside Git for sensitivity reasons; we'll provide them via secure share:

- Full pen test report
- HR records (background checks)
- Customer data samples (never used in audit; population queries only)
- Detailed cloud audit log exports

## 5. Contact

GRC Lead: grc@example.com · CISO: ciso@example.com

# Contributing to the Trust Center

This repository contains compliance-relevant artifacts. Changes are reviewed seriously.

## Branching

- `main` is the source of truth and is protected.
- Feature branches: `<type>/<short-description>`, e.g. `policy/access-control-update`.

## Pull Request Requirements

| Change Type | Required Reviewers | Notes |
|---|---|---|
| Policies (`policies/`) | CISO + 1 | Update version, effective date, revision history |
| Control matrix | GRC Lead | Cross-check evidence references |
| Risk register | CISO | Quarterly batch updates OK |
| Vendor register | GRC + Legal | Subprocessor changes need 30-day customer notice scheduled |
| Website copy | Marketing + CISO | Don't make claims we can't substantiate |
| Evidence | GRC | Verify no sensitive data; redact PII |

## What never gets committed

See [`.gitignore`](./.gitignore). In particular:
- Production secrets, tokens, certs, PEM keys
- Customer data samples
- Unredacted pentest reports
- Raw audit log exports with PII

## Commit Messages

Use Conventional Commits where reasonable:

```text
policy(access-control): tighten contractor access SLA to 24h
docs(controls): map CC7.2 to new SIEM tooling
chore(evidence): add Q1 access review attestations (sampled)
```

## Versioning Policies

Each policy has a version field. Bump:
- **Major** for substantive change in obligations
- **Minor** for clarification or scope adjustment
- Update the **Revision History** table at the bottom of each doc

## Reviews & Approvals

The PR description must include:
- What changed
- Why
- Who was consulted
- Any compliance / customer impact

Approvals are recorded in PR metadata and serve as **evidence** for SOC 2 control CC8.1 (change management) and CC5.3 (policy approval).

# Risk Register

**Last Updated:** YYYY-MM-DD · **Owner:** CISO · **Review Frequency:** Quarterly

This is the authoritative register of information security and privacy risks. Each risk is scored per the [Risk Management Policy](../policies/risk-management-policy.md).

| ID | Risk | Category | Likelihood (1-5) | Impact (1-5) | Inherent Score | Treatment | Residual Score | Owner | Status | Target Date |
|---|---|---|:---:|:---:|:---:|---|:---:|---|---|---|
| R-001 | Compromise of admin credentials leading to customer data exposure | Access | 3 | 5 | 15 | MFA enforced; just-in-time admin; session logging | 6 | CISO | Mitigated | — |
| R-002 | Critical vendor (cloud provider) outage exceeds RTO | Availability | 2 | 4 | 8 | Multi-region failover for Tier 1; documented runbook; quarterly DR test | 4 | SRE Lead | Mitigated | — |
| R-003 | Vulnerability in open-source dependency exploited before patch | App Security | 4 | 4 | 16 | SCA in CI; SLA-based patching; WAF; bug bounty | 8 | VP Eng | Treating | YYYY-Q3 |
| R-004 | Insider exfiltration of customer data | Insider | 2 | 5 | 10 | Least privilege; access reviews; DLP; offboarding within 24h | 5 | CISO | Mitigated | — |
| R-005 | Phishing leading to account compromise | Social Eng | 4 | 4 | 16 | Phishing-resistant MFA (FIDO2); training; simulated phishing | 6 | Security | Mitigated | — |
| R-006 | Subprocessor breach involving customer data | Third Party | 3 | 4 | 12 | SOC 2 review; contractual breach notice; subprocessor monitoring | 6 | GRC | Mitigated | — |
| R-007 | Backup integrity / unable to restore | Availability | 2 | 5 | 10 | Quarterly restore tests; cross-region backups; immutable storage | 4 | SRE | Mitigated | — |
| R-008 | Misconfiguration in IaC exposing data | Cloud | 3 | 5 | 15 | IaC scanning; preventive guardrails (SCP/Org Policy); CSPM | 6 | Platform | Mitigated | — |
| R-009 | Failure to honor GDPR data subject request within deadline | Privacy | 2 | 3 | 6 | DSR workflow; SLA tracking; verification process | 3 | DPO | Mitigated | — |
| R-010 | Source code leak | IP / Confidentiality | 2 | 4 | 8 | Repo access controls; secret scanning; CASB | 4 | Security | Mitigated | — |

## Heat Map (Inherent → Residual)

```text
Impact
  5 │      R-008  R-001         R-004,007
  4 │ R-002       R-003,005,010
  3 │             R-006         R-009
  2 │
  1 │
    └───────────────────────────────────
        1     2     3     4     5  Likelihood
```

## Workflow

1. **Identify** — Anyone may submit a risk via the GRC intake form.
2. **Triage** — GRC scores and assigns owner within 5 business days.
3. **Treat** — Owner proposes treatment; CISO approves.
4. **Track** — Status updated monthly until closed/accepted.
5. **Review** — Quarterly review with leadership; annual review with Board.

## Acceptance

Risks scored ≥ 10 require written CISO acceptance; ≥ 17 require CEO acceptance. Acceptances are time-bounded and re-reviewed at expiration.

## Revision History

| Date | Change | By |
|---|---|---|
| YYYY-MM-DD | Initial register | CISO |

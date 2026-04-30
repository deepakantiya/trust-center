# IR Runbook: Suspected Account Compromise

**Severity Default:** SEV-2 (escalate to SEV-1 if customer data accessed) · **Owner:** Security on-call

## Detection Inputs
- IdP impossible-travel / risky sign-in alerts
- EDR alerts on the endpoint
- User self-report
- Anomalous access logs (e.g., off-hours admin actions)

## Step-by-Step

### 1. Validate (≤ 15 min)
- [ ] Confirm alert is not a false positive (recent travel? known device? VPN?)
- [ ] Open incident ticket with timestamp, source, affected user
- [ ] Page Incident Commander if signs of active compromise

### 2. Contain (≤ 30 min)
- [ ] Force sign-out of all user sessions in IdP
- [ ] Reset password and require re-enrollment of MFA factors
- [ ] Disable any active API tokens / personal access tokens for the user
- [ ] Quarantine endpoint via EDR if endpoint indicators present
- [ ] Revoke OAuth grants in IdP

### 3. Investigate (≤ 4 hours)
- [ ] Review IdP sign-in logs for the past 30 days
- [ ] Review actions taken in critical systems (cloud console, code repo, customer DB) by this account
- [ ] Search for lateral movement: new sessions, OAuth grants, key creations
- [ ] Determine: did attacker access customer data? (CC7.4, breach analysis)
- [ ] Preserve logs and forensic artifacts

### 4. Eradicate
- [ ] Remove any persistence (mail rules, OAuth apps, SSH keys, API tokens)
- [ ] Re-image endpoint if EDR confirms malware

### 5. Recover
- [ ] Restore user access with new credentials and hardware-backed MFA
- [ ] Enhanced monitoring on account for 14 days

### 6. Notify (Legal-driven)
- [ ] If customer data was accessed: trigger Breach Notification process (separate runbook)
- [ ] If personal data of EU/UK residents: 72-hour DPA notification clock starts at confirmation
- [ ] Internal stakeholders per IR communications plan

### 7. Postmortem
- [ ] Within 5 business days for SEV-1/2
- [ ] Root cause, timeline, what worked, gaps, action items with owners

## Common Causes & Prevention
| Cause | Prevention |
|---|---|
| Phishing (password) | Phishing-resistant MFA (FIDO2/WebAuthn); training |
| Reused/leaked password | SSO + breached-password check |
| Session token theft (malware) | EDR; conditional access by device posture |
| OAuth consent phishing | Restrict third-party app consent |

## Evidence Captured
- IdP audit logs export
- EDR alert and timeline
- IR ticket with timeline of actions
- Postmortem document

Stored under: `evidence/incidents/INC-YYYY-NNNN/`

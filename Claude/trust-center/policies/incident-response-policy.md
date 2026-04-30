# Incident Response Policy

| Field | Value |
|---|---|
| **Owner** | CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual + after each P0/P1 incident |
| **Version** | 1.0 |

## 1. Purpose

Establish a consistent process to detect, respond to, recover from, and learn from security incidents to limit business impact and meet legal/contractual notification obligations.

## 2. Scope

Any actual or suspected event that compromises or threatens the confidentiality, integrity, or availability of Company information assets, including: data breaches, malware, account compromise, DDoS, insider threats, lost devices, vendor incidents impacting our data.

## 3. Severity Definitions

| Severity | Definition | Examples | Initial Response | Escalation |
|---|---|---|---|---|
| **SEV-1 / P0** | Confirmed breach of customer data; major outage; active intrusion | Database exfiltration; ransomware | Immediate | CEO, Legal, Customers |
| **SEV-2 / P1** | High likelihood of impact; significant control failure | Single account compromise; backup failure | < 1 hour | CISO, VP Eng |
| **SEV-3 / P2** | Lower-risk event requiring response | Phishing without compromise; minor misconfig | < 4 hours | Security Team |
| **SEV-4 / P3** | Informational / hygiene | Policy violation; lost laptop (encrypted) | Next business day | Manager |

## 4. Lifecycle (NIST SP 800-61 Aligned)

### 4.1 Preparation
- Maintained runbooks in [`incident-response/runbooks/`](../incident-response/runbooks/).
- 24/7 on-call rotation.
- Tabletop exercises ≥ annually.
- Pre-staged communications templates (customer notice, regulator notice).

### 4.2 Detection & Analysis
Sources: SIEM alerts, EDR, cloud audit logs, vulnerability scanners, customer reports, employee reports via `security@[company].com`.

Triage:
1. Validate alert (rule out false positive)
2. Assign severity
3. Open incident ticket
4. Activate IR team

### 4.3 Containment
- **Short term:** isolate affected systems, revoke credentials, block IPs.
- **Long term:** patch, harden, replace compromised assets.

### 4.4 Eradication
Remove threat: malware, unauthorized accounts, persistence mechanisms.

### 4.5 Recovery
- Restore from known-good backups.
- Monitor for recurrence (≥ 14 days enhanced monitoring post-recovery).

### 4.6 Lessons Learned
- Postmortem within **5 business days** of resolution for SEV-1/2.
- Blameless format; root cause and corrective actions tracked.
- Stored in [`incident-response/postmortems/`](../incident-response/postmortems/).

## 5. Notification Obligations

| Audience | When | Who Drafts | Who Approves |
|---|---|---|---|
| **Customers** | If their data confirmed impacted | Security + CS | CEO + Legal |
| **Regulators (e.g., GDPR DPAs)** | Within 72 hours of awareness for personal data breach | DPO + Legal | Legal |
| **Law enforcement** | As required or advisable | Legal | CEO |
| **Insurance** | Per cyber-insurance policy | Legal/Finance | CFO |
| **Public / Press** | Only if material | Comms | CEO |

## 6. Roles

| Role | Responsibility |
|---|---|
| **Incident Commander (IC)** | Runs the response; single decision-maker |
| **Security Lead** | Technical investigation, containment |
| **Comms Lead** | Internal updates, drafts external notices |
| **Legal** | Regulatory analysis, privilege, notification decisions |
| **Engineering Lead** | System recovery, code fixes |
| **Executive Sponsor** | CEO/CISO for SEV-1 |

## 7. Evidence Preservation

- Preserve logs, memory captures, disk images for SEV-1/2.
- Chain of custody documented.
- Retention: ≥ 1 year, longer if litigation hold.

## 8. SOC 2 Mapping

| Requirement | TSC |
|---|---|
| Incident response procedures | CC7.3, CC7.4, CC7.5 |
| Security event monitoring | CC7.2 |
| Communication of incidents | CC2.3, CC7.4 |
| Recovery from incidents | A1.3, CC7.5 |

## 9. Revision History

| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

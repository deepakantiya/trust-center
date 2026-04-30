# Cryptography Policy

| Field | Value |
|---|---|
| **Owner** | CISO |
| **Effective** | YYYY-MM-DD |
| **Review** | Annual |
| **Version** | 1.0 |

## 1. Purpose
Define cryptographic standards to protect Confidential and Restricted data at rest and in transit.

## 2. Approved Algorithms

| Use | Approved | Prohibited |
|---|---|---|
| Symmetric encryption | AES-256-GCM, ChaCha20-Poly1305 | DES, 3DES, RC4, AES-ECB |
| Asymmetric encryption | RSA-3072+, ECDSA P-256+, Ed25519 | RSA < 2048, DSA |
| Hashing | SHA-256, SHA-384, SHA-512, SHA-3 | MD5, SHA-1 |
| Password hashing | Argon2id, bcrypt (cost ≥ 12), scrypt | Plain SHA, unsalted |
| TLS | TLS 1.2 (minimum), TLS 1.3 (preferred) | TLS ≤ 1.1, SSLv3 |

## 3. Data at Rest
- All Restricted data encrypted with AES-256.
- Customer databases use envelope encryption with KMS-managed keys.
- Disk encryption (FileVault/BitLocker/dm-crypt) on all endpoints.

## 4. Data in Transit
- TLS 1.2+ for all external traffic.
- Internal service-to-service traffic in production uses mTLS where supported.
- Certificate management automated; no expired certs.

## 5. Key Management
- Keys stored in approved KMS (e.g., AWS KMS, GCP KMS, HSM-backed).
- Customer-managed keys (CMK) supported for enterprise customers.
- Key rotation:
  - Data encryption keys: annually or per KMS default
  - TLS certificates: ≤ 90 days for public-facing
  - Signing keys: per use case, documented
- Key access logged and reviewed.

## 6. Secrets Management
- No secrets in source code, environment files committed to Git, or container images.
- Use approved secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager).
- Detected leaks rotated within 24 hours and tracked as incidents.

## 7. SOC 2 Mapping
| Requirement | TSC |
|---|---|
| Encryption controls | CC6.1, CC6.7 |
| Key management | CC6.1 |

## 7.1 NIST SP 800-53 Rev 5 Mapping

| Requirement | NIST 800-53 |
|---|---|
| Cryptographic protection | SC-13 |
| Cryptographic key management | SC-12 |
| Public key infrastructure certificates | SC-17 |
| Protection of information at rest | SC-28 |
| Transmission confidentiality and integrity | SC-8 |

## 8. Revision History
| Version | Date | Changes |
|---|---|---|
| 1.0 | YYYY-MM-DD | Initial |

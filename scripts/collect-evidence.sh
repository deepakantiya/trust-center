#!/usr/bin/env bash
# collect-evidence.sh
# Sample evidence collection script (skeleton).
# Customize each section to your environment.

set -euo pipefail

EVIDENCE_DIR="${EVIDENCE_DIR:-./evidence}"
PERIOD="${PERIOD:-$(date +%Y-Q%q)}"
OUT="${EVIDENCE_DIR}/_collection_${PERIOD}_$(date +%Y%m%d_%H%M%S)"
mkdir -p "${OUT}"

log() { echo "[$(date -u +%FT%TZ)] $*"; }

log "Collecting evidence into ${OUT}"

# ----- Access Reviews -----
# Example: pull users + group memberships from your IdP via API
# okta-cli users list --json > "${OUT}/okta_users.json"
# Replace with your actual tooling.
log "TODO: implement IdP user export"

# ----- Change Management -----
# Example: GitHub: list PRs merged to main with reviewers
# gh pr list --state merged --base main --json number,author,reviews,mergedAt --limit 200 \
#   > "${OUT}/github_prs.json"
log "TODO: implement code-host PR export"

# ----- Vulnerability Scans -----
# Example: dependency scan summary export
# snyk test --json > "${OUT}/snyk_${PERIOD}.json" || true
log "TODO: implement vulnerability scan export"

# ----- Backups -----
# Example: list recent successful snapshots
# aws ec2 describe-snapshots --owner-ids self --query 'Snapshots[?StartTime>=`...`]' \
#   > "${OUT}/aws_snapshots.json"
log "TODO: implement backup status export"

# ----- Logging Coverage -----
# Example: confirm CloudTrail enabled in all regions
# aws cloudtrail describe-trails > "${OUT}/aws_cloudtrail.json"
log "TODO: implement logging coverage export"

# ----- Hash & manifest -----
log "Generating manifest"
( cd "${OUT}" && find . -type f -exec sha256sum {} \; > MANIFEST.sha256 ) || true

log "Done. Review and commit relevant non-sensitive outputs."

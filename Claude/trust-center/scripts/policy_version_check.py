#!/usr/bin/env python3
"""Ensure each policy file has a Version field and a Revision History section."""

import sys
from pathlib import Path

policies = sorted(Path("policies").glob("*.md"))
fail = False

for policy in policies:
    text = policy.read_text()
    if "| **Version**" not in text:
        print(f"::warning file={policy}::Missing Version field")
        fail = True
    if "Revision History" not in text:
        print(f"::warning file={policy}::Missing Revision History")
        fail = True

# Promote to exit 1 when ready:
# sys.exit(1 if fail else 0)

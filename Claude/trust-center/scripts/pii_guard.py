#!/usr/bin/env python3
"""Block obvious PII patterns (SSN, credit card numbers) in the evidence/ directory."""

import re
import sys
from pathlib import Path

SSN_RE = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")
CC_RE = re.compile(r"\b(4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\b")

evidence_dir = Path("evidence")
if not evidence_dir.is_dir():
    print("No evidence/ directory found — skipping.")
    sys.exit(0)

found = False
for path in sorted(evidence_dir.rglob("*")):
    if not path.is_file():
        continue
    try:
        text = path.read_text(errors="replace")
    except OSError:
        continue
    for lineno, line in enumerate(text.splitlines(), 1):
        if SSN_RE.search(line) or CC_RE.search(line):
            print(f"::error file={path},line={lineno}::Possible SSN or credit card number detected.")
            found = True

if found:
    print("Possible PII detected in evidence/. Remove before merging.")
    sys.exit(1)

print("No obvious PII patterns found.")

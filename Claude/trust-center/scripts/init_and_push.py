#!/usr/bin/env python3
"""
Initialize this directory as a Git repo and push it to your hosting provider.
Run from the repository root after editing the variables below.
"""

import subprocess
from pathlib import Path

# ---- EDIT THESE ----
GIT_PROVIDER = "github"            # github | gitlab | bitbucket | other
GIT_USER_OR_ORG = "your-username"  # your GitHub/GitLab username or org
REPO_NAME = "trust-center"
DEFAULT_BRANCH = "main"
COMMIT_MESSAGE = "chore: initial Trust Center scaffold"
# --------------------

REMOTE_URLS = {
    "github":    f"git@github.com:{GIT_USER_OR_ORG}/{REPO_NAME}.git",
    "gitlab":    f"git@gitlab.com:{GIT_USER_OR_ORG}/{REPO_NAME}.git",
    "bitbucket": f"git@bitbucket.org:{GIT_USER_OR_ORG}/{REPO_NAME}.git",
}


def run(cmd: str, check: bool = True) -> None:
    subprocess.run(cmd, shell=True, check=check)


def run_output(cmd: str) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, shell=True, capture_output=True, text=True)


if not Path(".git").is_dir():
    run(f"git init -b {DEFAULT_BRANCH}")

run("git add -A")
result = run_output(f"git commit -m {COMMIT_MESSAGE!r}")
if result.returncode != 0:
    print("Nothing to commit.")

remote_url = REMOTE_URLS.get(GIT_PROVIDER, "")

if remote_url:
    existing = run_output("git remote get-url origin")
    if existing.returncode == 0:
        run(f"git remote set-url origin {remote_url}")
    else:
        run(f"git remote add origin {remote_url}")
    print(f"Remote set to: {remote_url}")
    print()
    print(f"Now create the empty repo on {GIT_PROVIDER} (private recommended), then run:")
    print(f"  git push -u origin {DEFAULT_BRANCH}")
else:
    print("No known provider; set 'origin' manually:")
    print("  git remote add origin <YOUR_REMOTE_URL>")
    print(f"  git push -u origin {DEFAULT_BRANCH}")

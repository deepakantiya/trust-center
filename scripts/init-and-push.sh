#!/usr/bin/env bash
# init-and-push.sh
# Initialize this directory as a Git repo and push it to your hosting provider.
# Run this from the repository root after editing the variables below.

set -euo pipefail

# ---- EDIT THESE ----
GIT_PROVIDER="github"               # github | gitlab | bitbucket | other
GIT_USER_OR_ORG="your-username"     # your GitHub/GitLab username or org
REPO_NAME="trust-center"
DEFAULT_BRANCH="main"
COMMIT_MESSAGE="chore: initial Trust Center scaffold"
# --------------------

if [ ! -d .git ]; then
  git init -b "${DEFAULT_BRANCH}"
fi

git add -A
git commit -m "${COMMIT_MESSAGE}" || echo "Nothing to commit."

case "${GIT_PROVIDER}" in
  github)
    REMOTE_URL="git@github.com:${GIT_USER_OR_ORG}/${REPO_NAME}.git"
    ;;
  gitlab)
    REMOTE_URL="git@gitlab.com:${GIT_USER_OR_ORG}/${REPO_NAME}.git"
    ;;
  bitbucket)
    REMOTE_URL="git@bitbucket.org:${GIT_USER_OR_ORG}/${REPO_NAME}.git"
    ;;
  *)
    REMOTE_URL=""
    ;;
esac

if [ -n "${REMOTE_URL}" ]; then
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "${REMOTE_URL}"
  else
    git remote add origin "${REMOTE_URL}"
  fi
  echo "Remote set to: ${REMOTE_URL}"
  echo
  echo "Now create the empty repo on ${GIT_PROVIDER} (private recommended), then run:"
  echo "  git push -u origin ${DEFAULT_BRANCH}"
else
  echo "No known provider; set 'origin' manually:"
  echo "  git remote add origin <YOUR_REMOTE_URL>"
  echo "  git push -u origin ${DEFAULT_BRANCH}"
fi

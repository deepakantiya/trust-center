# How to Push This Repository to Your Git Account

This repo is **already initialized as a Git repository** with an initial commit on `main`. You just need to create the remote and push.

## Option A — GitHub via web + command line (fastest)

1. Go to **[github.com/new](https://github.com/new)** and create a new repository:
   - **Name:** `trust-center` (or whatever you prefer)
   - **Visibility:** **Private** is strongly recommended (this contains internal compliance materials)
   - **Do NOT** initialize with README, .gitignore, or license (we already have them)
2. Copy the SSH or HTTPS URL GitHub gives you, then run:

   ```bash
   cd trust-center

   # SSH (recommended if you have keys set up)
   git remote add origin git@github.com:<YOUR-USERNAME>/trust-center.git

   # OR HTTPS
   git remote add origin https://github.com/<YOUR-USERNAME>/trust-center.git

   git push -u origin main
   ```

## Option B — GitHub CLI (one-liner)

If you have [`gh`](https://cli.github.com/) installed and authenticated:

```bash
cd trust-center
gh repo create trust-center --private --source=. --push
```

## Option C — GitLab

```bash
cd trust-center
git remote add origin git@gitlab.com:<YOUR-USERNAME>/trust-center.git
git push -u origin main
```

## Option D — Use the included script

Edit the variables at the top of `scripts/init-and-push.sh`, then:

```bash
./scripts/init-and-push.sh
# Create the empty remote repo first, then:
git push -u origin main
```

## After Pushing — Recommended Settings

On GitHub (Settings → Branches → Add rule for `main`):

- ✅ Require a pull request before merging
- ✅ Require approvals (1 minimum, 2 for policies)
- ✅ Require review from Code Owners
- ✅ Require status checks to pass (the CI workflows in `.github/workflows/`)
- ✅ Require signed commits
- ✅ Do not allow bypassing the above settings

On GitHub (Settings → Pages) — if publishing the public site:

- Source: **Deploy from a branch**
- Branch: `main` / folder `/website`
- (Or, better: set up GitHub Actions for Pages with custom domain + HTTPS)

## What I (Claude) Could Not Do

- I cannot create the remote repository on your account, authenticate to GitHub/GitLab on your behalf, or push code from this environment. Pushing requires your credentials.
- Replace all `[Company Name]`, `example.com`, and other placeholder text with your real values before publishing the website.
- Replace the placeholder org/handles in `.github/CODEOWNERS` with your real GitHub teams.

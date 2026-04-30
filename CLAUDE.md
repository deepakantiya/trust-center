# Claude Code Project Configuration

## gstack

gstack is installed at `~/.claude/skills/gstack`. Run `/gstack-upgrade` periodically to stay current.

**Web browsing:** Always use the `/browse` skill from gstack for all web browsing.
Never use `mcp__Claude_in_Chrome__*` tools directly.

**Available gstack skills:**

| Skill | Purpose |
|---|---|
| `/browse` | Web browsing |
| `/connect-chrome` | Connect to Chrome browser |
| `/setup-browser-cookies` | Set up browser cookies |
| `/plan-ceo-review` | CEO review planning |
| `/plan-eng-review` | Engineering review planning |
| `/plan-design-review` | Design review planning |
| `/plan-devex-review` | DevEx review planning |
| `/design-consultation` | Design consultation |
| `/design-shotgun` | Design shotgun sessions |
| `/design-html` | HTML design output |
| `/design-review` | Design review |
| `/office-hours` | Office hours facilitation |
| `/review` | Code review |
| `/ship` | Ship a change |
| `/land-and-deploy` | Land and deploy |
| `/canary` | Canary deployment |
| `/qa` | QA with browser |
| `/qa-only` | QA only (no code changes) |
| `/benchmark` | Benchmarking |
| `/investigate` | Investigate an issue |
| `/document-release` | Document a release |
| `/retro` | Retrospective |
| `/autoplan` | Automated planning |
| `/careful` | Careful/cautious mode |
| `/freeze` | Freeze changes |
| `/guard` | Guard mode |
| `/unfreeze` | Unfreeze changes |
| `/codex` | Codex integration |
| `/cso` | CSO workflow |
| `/devex-review` | DevEx review |
| `/gstack-upgrade` | Upgrade gstack |
| `/learn` | Learning mode |

### Setup for new teammates

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

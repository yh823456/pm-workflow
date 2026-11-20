# PM Decision Flow V0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a small, honest, usable product manager decision workflow with five stages, five templates, a simulated B2B SaaS case, and a public documentation site.

**Architecture:** Markdown is the source of truth. A small Node validator checks required workflow content, evidence labels, internal links, and the state schema. VitePress presents the same content as a static GitHub Pages site.

**Tech Stack:** Node.js 22, Markdown, JSON, VitePress, GitHub Actions, GitHub Pages.

## Global Constraints

- Release must remain usable without Coze, Dify, an API key, or a paid platform.
- The workflow has exactly five stages in V0.1: intake, evidence, decision, PRD, and verify.
- Simulated interviews must be labeled `SIMULATED` and `NOT EXTERNALLY VALIDATED`.
- Do not claim that simulated evidence proves market demand or business impact.
- Do not invent before-and-after metrics, revenue, savings, or customer quotes.
- No secrets, personal data, company-confidential material, or unlicensed assets.
- The website must build with `npm run build`.
- All repository checks must pass with `npm test`.

---

### Task 1: Repository Scaffold and Validation Harness

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `LICENSE`
- Create: `scripts/validate.mjs`
- Create: `tests/content.test.mjs`
- Create: `README.md`

**Interfaces:**
- Produces: `npm test`, which runs `node --test`.
- Produces: `npm run validate`, which runs `node scripts/validate.mjs`.
- Produces: required file list at `README.md` for later tasks.

- [ ] **Step 1: Write the failing content contract test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { validateRepository } from "../scripts/validate.mjs";

test("repository contains the V0.1 workflow contract", () => {
  const errors = validateRepository(process.cwd());
  assert.deepEqual(errors, []);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL because `scripts/validate.mjs` does not exist.

- [ ] **Step 3: Add package metadata and validation**

Create `package.json` with ESM enabled, scripts `test`, `validate`, `docs:dev`, `docs:build`, and a VitePress dev dependency. Create `.gitignore` with `node_modules/`, `website/.vitepress/cache/`, and `website/.vitepress/dist/`.

Create `scripts/validate.mjs` exporting `validateRepository(root)`. It must check:

- Five required files under `skills/`.
- Five required files under `templates/`.
- `workflow/state.json` parses and contains the required fields.
- `workflow/log.md` exists.
- `case-study/customer-feedback-platform/README.md` contains the simulated-research disclosure.
- Required Markdown files contain no `TBD` or `TODO`.

Create a concise `README.md` that explains who the workflow is for, the five stages, the quick start, evidence rules, and repository map.

- [ ] **Step 4: Run the validation and test**

Run: `npm test`
Expected: FAIL until later content files exist. The validator itself must execute without an import error.

- [ ] **Step 5: Commit**

```bash
git add package.json .gitignore LICENSE README.md scripts/validate.mjs tests/content.test.mjs
git commit -m "chore: scaffold PM workflow validation"
```

### Task 2: Five Skills, Templates, State, and Log

**Files:**
- Create: `skills/01-intake.md`
- Create: `skills/02-evidence.md`
- Create: `skills/03-decision.md`
- Create: `skills/04-prd.md`
- Create: `skills/05-verify.md`
- Create: `templates/problem-brief.md`
- Create: `templates/evidence-log.md`
- Create: `templates/decision-record.md`
- Create: `templates/lightweight-prd.md`
- Create: `templates/result-review.md`
- Create: `workflow/state.json`
- Create: `workflow/log.md`

**Interfaces:**
- Consumes: the five stage names from the design spec.
- Produces: one input, action, output, gate, and state transition per stage.
- Produces: a valid `state.json` consumed by `scripts/validate.mjs`.

- [ ] **Step 1: Create the state contract**

Create `workflow/state.json` with:

```json
{
  "initiative": "Customer feedback to product decision",
  "stage": "intake",
  "owner": "Product Manager",
  "evidence_level": "simulated",
  "status": "in_progress",
  "gate": "Problem and impact are clear enough for evidence collection",
  "next_action": "Complete the problem brief",
  "updated_at": "2026-11-20"
}
```

- [ ] **Step 2: Create five executable skills**

Each skill must contain:

- Stage purpose.
- Required inputs.
- Three to five actions.
- One primary artifact.
- Pass gate.
- Stop or escalate conditions.
- Exact next state value.

The skills must not ask the agent to invent evidence. The evidence skill must classify sources as `FACT`, `ASSUMPTION`, or `SIMULATED`.

- [ ] **Step 3: Create five copy-ready templates**

Each template must be usable without an AI agent. Templates should be concise and include a short example line explaining how to fill each section.

- [ ] **Step 4: Create the decision log**

Create `workflow/log.md` with the columns: date, stage, new evidence, decision, impact, next action. Add one initial entry stating that the workflow and case are simulated.

- [ ] **Step 5: Run repository checks**

Run: `npm test`
Expected: FAIL only because the flagship case and site links are not complete yet.

- [ ] **Step 6: Commit**

```bash
git add skills templates workflow
git commit -m "feat: add five-stage PM decision workflow"
```

### Task 3: Simulated B2B SaaS Case

**Files:**
- Create: `case-study/customer-feedback-platform/README.md`
- Create: `case-study/customer-feedback-platform/01-problem-brief.md`
- Create: `case-study/customer-feedback-platform/02-evidence-log.md`
- Create: `case-study/customer-feedback-platform/03-decision-record.md`
- Create: `case-study/customer-feedback-platform/04-lightweight-prd.md`
- Create: `case-study/customer-feedback-platform/05-result-plan.md`
- Create: `prototype/README.md`

**Interfaces:**
- Consumes: templates from Task 2.
- Produces: one traceable example from request to decision, PRD, and verification plan.

- [ ] **Step 1: Define the fictional context**

Create a fictional B2B SaaS company with 80 to 250 employees. State clearly that all company names, respondents, quotes, and data are fictional. Add this disclosure near the top of the case README:

```text
SIMULATED CASE: The company, users, interviews, quotes, and data are fictional.
The material is for workflow practice only and is NOT EXTERNALLY VALIDATED.
```

- [ ] **Step 2: Write the problem brief**

Use this request: "Add bulk export because the customer success team spends too long preparing customer review packets."

Define user, scenario, pain, frequency, current workaround, business impact hypothesis, and what evidence is missing.

- [ ] **Step 3: Write the evidence log**

Include:

- At least two `SIMULATED` interview records.
- At least one public/competitor observation labeled `FACT` with a URL placeholder? No. Use a general observation that requires no external citation, such as "Many B2B SaaS tools provide filterable exports."
- At least two `ASSUMPTION` entries.
- One contradictory signal suggesting bulk export may not solve the underlying problem.

Do not fabricate real customer quotes or quantitative market research.

- [ ] **Step 4: Write the decision and PRD**

Compare three options:

1. Full unrestricted bulk export.
2. Filtered export with role permissions.
3. Saved view or scheduled report.

Recommend the filtered export with permission checks as the smallest testable option. The PRD must include scope, non-goals, user stories, acceptance criteria, risks, dependencies, analytics events, and result-review timing.

- [ ] **Step 5: Write the verification plan and Axure handoff**

Define baseline and target measures for export completion time, error rate, support requests, and repeat usage. Label targets as hypotheses.

In `prototype/README.md`, define Axure screens for export entry, filter selection, permission warning, progress, completion, and failure states. Require `.rp`, HTML export, screenshots, and prototype notes in the final prototype release.

- [ ] **Step 6: Run repository checks**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add case-study prototype
git commit -m "docs: add simulated B2B SaaS PM case"
```

### Task 4: VitePress Documentation Site

**Files:**
- Create: `website/.vitepress/config.mts`
- Create: `website/.vitepress/theme/custom.css`
- Create: `website/index.md`
- Create: `website/workflow/index.md`
- Create: `website/case-study/index.md`
- Create: `website/templates/index.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: repository Markdown from Tasks 1 to 3.
- Produces: `website/.vitepress/dist` from `npm run docs:build`.

- [ ] **Step 1: Configure VitePress**

Set the project root to `website`, title to `PM Decision Flow`, and navigation for Home, Workflow, Case Study, and Templates. Include a GitHub social link placeholder only after the final repository URL is known.

- [ ] **Step 2: Build the home page**

The first screen must explain:

- What problem the workflow solves.
- The five stages.
- That the case is simulated and not externally validated.
- The primary action: read the workflow.

Do not use a marketing hero or claim proven business results.

- [ ] **Step 3: Link repository content**

Create concise site pages that explain the workflow and case, then link to the canonical files in the repository. Avoid duplicating full documents in ways that drift.

- [ ] **Step 4: Build and verify**

Run: `npm install`
Run: `npm run docs:build`
Run: `npm test`
Expected: all commands exit successfully and the site contains no broken local links.

- [ ] **Step 5: Commit**

```bash
git add website .gitignore
git commit -m "feat: add PM workflow documentation site"
```

### Task 5: GitHub Pages Deployment and Release

**Files:**
- Create: `.github/workflows/pages.yml`
- Create: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: `npm run docs:build`.
- Produces: a GitHub Pages artifact.
- Produces: release version `0.1.0`.

- [ ] **Step 1: Add the Pages workflow**

Use `actions/checkout`, `actions/setup-node`, `npm ci`, `npm test`, `npm run docs:build`, `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. Set permissions for `contents: read`, `pages: write`, and `id-token: write`.

- [ ] **Step 2: Add release notes and live links**

Add `CHANGELOG.md` with the V0.1 scope and explicit next steps: real interviews and Axure prototype. Add repository and Pages placeholders only after the remote URL is known; replace them before release.

- [ ] **Step 3: Validate the complete repository**

Run: `npm ci`
Run: `npm test`
Run: `npm run docs:build`
Run: `git status --short`
Expected: tests and build pass; only intended release changes remain.

- [ ] **Step 4: Commit and tag**

```bash
git add .github/workflows/pages.yml CHANGELOG.md README.md package.json package-lock.json
git commit -m "chore: prepare v0.1.0 release"
git tag v0.1.0
```

- [ ] **Step 5: Publish**

Create or connect a GitHub repository, push `main` and `v0.1.0`, enable Pages with GitHub Actions, wait for deployment, and verify the live URL.

Expected: the repository and public site are reachable without authentication.

## Plan Self-Review

**Spec coverage:** The plan covers the five-stage workflow, state/log model, five templates, simulated case, Axure handoff, VitePress site, verification, and publishing. Real interviews and full Axure production are intentionally outside V0.1.

**Placeholder scan:** The plan contains no `TBD` implementation step. It explicitly defers only the final remote URL and social link until the repository exists.

**Type consistency:** `state.json` fields match the design spec and validator contract. Stage names match the five skills and workflow pages.

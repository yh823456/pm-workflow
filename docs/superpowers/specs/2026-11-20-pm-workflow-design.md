# PM Decision Flow V0.1 Design

## 1. Objective

Build a public, reusable product manager workflow that turns an ambiguous request into an evidence-based decision, a lightweight PRD, and a measurable follow-up.

The repository serves two purposes:

1. Provide a practical workflow that can be used in real B2B SaaS product work.
2. Serve as a public portfolio artifact for a new graduate entering a product manager role.

The first release must be honest about evidence quality. Simulated interviews are allowed, but they must be labeled as simulated and must not be presented as real customer research.

## 2. Target Context

- Owner: new graduate with no formal product management experience.
- Primary PM mode: generalist product manager.
- Flagship case: a customer feedback and product decision platform for B2B SaaS companies with 50 to 300 employees.
- Core user in the case: a product manager responsible for collecting feedback, deciding priorities, writing PRDs, and coordinating delivery.
- Main outcome: reduce requirement misunderstanding and development rework.

## 3. Core Problem

Product managers often move directly from a stakeholder request to a solution. This creates four failures:

- The underlying user problem is not defined.
- Evidence and assumptions are mixed together.
- Decisions cannot be explained later.
- Design and engineering discover ambiguity after implementation starts.

The workflow should create a short, auditable chain from evidence to decision to specification.

## 4. Workflow

The V0.1 workflow has five stages:

1. Intake: clarify user, scenario, problem, impact, and current workaround.
2. Evidence: collect public, interview, product, and stakeholder evidence; label facts, assumptions, and simulations.
3. Decision: choose whether to proceed, defer, or stop; record rationale and alternatives.
4. PRD: define scope, non-goals, acceptance criteria, risks, dependencies, and success measures.
5. Verify: record what happened after release and decide to continue, adjust, or stop.

Each stage has:

- One primary artifact.
- One usage skill.
- One pass condition.
- A state transition in `workflow/state.json`.
- An append-only entry in `workflow/log.md` when a decision changes.

## 5. Architecture

```text
pm-workflow/
|-- README.md
|-- docs/
|   |-- workflow/
|   |-- case-study/
|   `-- superpowers/specs/
|-- skills/
|   |-- 01-intake.md
|   |-- 02-evidence.md
|   |-- 03-decision.md
|   |-- 04-prd.md
|   `-- 05-verify.md
|-- workflow/
|   |-- state.json
|   `-- log.md
|-- templates/
|   |-- problem-brief.md
|   |-- evidence-log.md
|   |-- decision-record.md
|   |-- lightweight-prd.md
|   `-- result-review.md
|-- case-study/
|   `-- customer-feedback-platform/
|-- prototype/
|   `-- README.md
|-- website/
|   `-- .vitepress/
|-- .github/workflows/
`-- LICENSE
```

The workflow is Markdown-first. Coze and Dify are not required for V0.1. The repository must remain usable without a paid platform or an AI agent.

## 6. State and Audit Model

`workflow/state.json` stores the current initiative and active stage. It is deliberately small and readable by both humans and agents.

Required fields:

- `initiative`
- `stage`
- `owner`
- `evidence_level`
- `status`
- `gate`
- `next_action`
- `updated_at`

Allowed evidence levels:

- `public`
- `interview`
- `product-data`
- `stakeholder`
- `simulated`
- `mixed`

`workflow/log.md` records changes in reverse chronological order. Each entry includes date, stage, new evidence, decision, impact, and next action.

## 7. Flagship Case

The case uses a fictional B2B SaaS company and a fictional customer feedback platform. The scenario is:

A customer success lead asks the product team to add a bulk export feature. The product manager must determine whether this is a real user problem, what evidence exists, which alternatives are available, whether the request fits the strategy, and how to define and validate the smallest useful solution.

The case includes:

- Mixed evidence with source labels.
- Simulated interview data clearly marked as simulated.
- At least three solution alternatives.
- A decision record with a recommendation.
- A lightweight PRD.
- An Axure prototype plan and shell.
- Expected success measures, not fabricated results.

## 8. Success Measures

The workflow is evaluated on practical outcomes:

- Time from request intake to a review-ready decision.
- Number of clarification rounds before design or development.
- Number of material requirement changes after implementation starts.
- Percentage of decisions with traceable evidence.
- Percentage of initiatives with a defined post-release measure.

The public case may state targets and measurement plans. It must not invent before-and-after data or claim business impact that was not observed.

## 9. Non-goals

- Building a complete product management SaaS platform.
- Creating dozens of skills.
- Full customer portal, billing, enterprise permission model, or advanced roadmap.
- Dify, Coze, or workflow-platform integration in V0.1.
- Claiming simulated evidence validates a real market opportunity.
- Professional visual design for every Axure screen on the first day.

## 10. Verification

Before publishing:

- The Markdown site builds successfully.
- All internal links resolve.
- The JSON state file parses successfully.
- The five skills and five templates are connected in the README.
- Simulated evidence is visibly labeled.
- No secret, company name, or personal data is committed.
- GitHub Pages publishes from the selected branch and directory.

## 11. Release Scope

The first public release is `v0.1.0` and includes:

- Repository structure.
- Five-stage workflow.
- Five reusable templates.
- Five skill files.
- State and log examples.
- A concise simulated B2B SaaS case.
- Axure handoff instructions.
- A simple VitePress documentation site.
- GitHub Pages deployment.

Real interviews, a complete Axure prototype, and optional AI automation are follow-up work after the first release.

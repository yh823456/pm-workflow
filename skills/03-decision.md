---
name: pm-decision
description: Compare alternatives and record an explicit proceed, revise, defer, or stop decision.
---

# Stage 03: Decision

## Purpose

Make a reviewable product decision. The output explains what will be done, what will not be done, and why the chosen path is better than the alternatives.

## Required Inputs

- Problem brief
- Evidence log
- Product strategy, target segment, and current commitments
- Delivery constraints and known risks

## Actions

1. Define the decision to make in one sentence.
2. Compare at least three options, including "do nothing" or a non-software alternative.
3. Evaluate options on user impact, evidence confidence, effort, strategic fit, and risk.
4. Select `proceed`, `revise`, `defer`, or `stop`.
5. Record the rationale, assumptions, owner, date, and conditions for revisiting.

## Required Output

Complete `templates/decision-record.md`.

## Pass Gate

Proceed only when:

- The decision type is explicit.
- Alternatives and trade-offs are visible.
- The recommendation follows from the evidence rather than request volume.
- A reviewer can explain what would cause the decision to change.

## Stop or Escalate

- Stop when the decision requires authority the product manager does not have.
- Escalate when evidence is contradictory and the cost of the wrong choice is high.
- Defer when the decision depends on a named future signal.

## State Transition

- If the decision is `proceed` or `revise`, set `stage` to `prd`.
- If the decision is `defer` or `stop`, set `status` to `closed` and record the follow-up trigger.
- Append the decision, impact, and next action to `workflow/log.md`.

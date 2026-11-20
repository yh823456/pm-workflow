---
name: pm-verify
description: Compare observed results with the original decision and record whether to continue, adjust, or stop.
---

# Stage 05: Verify

## Purpose

Close the loop between product action and actual outcome. Verification protects the team from treating delivery as success.

## Required Inputs

- Approved lightweight PRD
- Baseline or current-state measure
- Expected outcome and guardrail measures
- Observation window and data source

## Actions

1. Confirm the measure definitions and observation window before interpreting results.
2. Compare observed results with the hypothesis, baseline, and guardrails.
3. Separate product effect from seasonality, release issues, and other explanations.
4. Record what changed, what did not, and what remains uncertain.
5. Decide to continue, adjust, stop, or run another validation.

## Required Output

Complete `templates/result-review.md`.

## Pass Gate

Complete the stage only when:

- The result is based on observed data or explicitly marked as unavailable.
- The original decision and expected outcome are visible.
- The review contains a continue, adjust, or stop recommendation.
- A follow-up owner or explicit closure is recorded.

## Stop or Escalate

- Do not declare success when data is missing.
- Escalate if the result creates a material customer, revenue, or compliance risk.
- Reopen intake if the result reveals a different problem.

## State Transition

Set `status` to `completed` or begin a new initiative at `intake`. Append the observed result and final recommendation to `workflow/log.md`.

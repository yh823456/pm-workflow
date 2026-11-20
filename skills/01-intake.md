---
name: pm-intake
description: Turn an ambiguous request into a clear problem brief without accepting the proposed solution at face value.
---

# Stage 01: Intake

## Purpose

Clarify the problem behind a request before discussing features. The output is a short problem brief, not a solution document.

## Required Inputs

- Original request and requester
- Target user or customer segment
- Scenario in which the problem occurs
- Current workaround
- Known business or user impact
- Deadline, commitment, or organizational constraint

If the requester can provide only a solution, ask what happened that made this solution feel necessary.

## Actions

1. Separate the requested solution from the underlying problem.
2. Describe who experiences the problem and when.
3. Record the current workaround and its cost.
4. State the desired outcome without naming a feature.
5. List what is still unknown and must be checked in the evidence stage.

## Required Output

Complete `templates/problem-brief.md`.

## Pass Gate

Proceed only when all of the following are true:

- The target user and scenario are specific.
- The problem is stated without assuming a feature.
- There is a plausible user or business impact.
- Missing evidence is visible.

## Stop or Escalate

- Stop if the request is primarily a legal, security, or compliance obligation.
- Escalate if the requested change conflicts with an existing executive commitment.
- Return to the requester if the problem, affected user, or impact cannot be stated.

## State Transition

When the gate passes, set `stage` to `evidence`, update `next_action`, and append the intake decision to `workflow/log.md`.

---
name: pm-prd
description: Convert an approved decision into a lightweight PRD that design and engineering can execute without guessing.
---

# Stage 04: Lightweight PRD

## Purpose

Define the smallest coherent solution that can test the decision. The PRD should remove execution ambiguity, not create a long requirements document.

## Required Inputs

- Approved decision record
- Problem brief and cited evidence
- Relevant customer or product constraints
- Initial design and engineering feedback

## Actions

1. State the problem, goal, success measure, and non-goals.
2. Describe the target user and the core user journey.
3. Use user stories and acceptance criteria instead of vague feature names.
4. Record permissions, error states, dependencies, analytics, and rollout needs when relevant.
5. Mark unresolved issues by owner and decision deadline.

## Required Output

Complete `templates/lightweight-prd.md`.

## Pass Gate

Proceed only when:

- Design and engineering can estimate and test the scope.
- In-scope and out-of-scope work are both explicit.
- Every critical requirement has acceptance criteria.
- Success and guardrail measures are defined.
- No critical question is hidden in a meeting instead of the document.

## Stop or Escalate

- Stop if the decision record is missing or contradictory.
- Escalate if the solution introduces material legal, security, or operational risk.
- Return to decision if the PRD no longer tests the original decision.

## State Transition

When the gate passes, set `stage` to `verify`, define the observation window, and append the approved scope to `workflow/log.md`.

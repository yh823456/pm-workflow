---
name: pm-evidence
description: Collect and classify evidence before deciding whether a product request should move forward.
---

# Stage 02: Evidence

## Purpose

Replace a debate based on opinions with a visible evidence record. The goal is not to prove the request is right; it is to learn whether the problem is real, important, and worth solving.

## Required Inputs

- Completed problem brief
- Available customer, support, sales, product, or public evidence
- Known assumptions and open questions

Start with evidence that already exists. Do not schedule new research until existing sources have been reviewed.

## Evidence Labels

- `FACT`: directly verifiable through data, documents, or observed behavior.
- `ASSUMPTION`: plausible but not yet verified.
- `SIMULATED`: fictional or AI role-play data used for practice.

Any simulated interview must also be labeled `NOT EXTERNALLY VALIDATED`.

## Actions

1. Collect the smallest useful set of evidence from at least two source types when available.
2. Record the exact claim each source supports.
3. State limitations and conflicting signals.
4. Separate user statements from observed behavior.
5. Summarize what is strong, weak, missing, and contradictory.

## Required Output

Complete `templates/evidence-log.md` and update the source labels in `workflow/state.json`.

## Pass Gate

Proceed only when:

- Every material claim has a source label.
- The strongest assumption and the largest evidence gap are explicit.
- Simulated evidence is not treated as external validation.
- The next step is clear even if the evidence is incomplete.

## Stop or Escalate

- Stop if no relevant evidence exists and the cost of being wrong is high.
- Escalate if teams disagree about the same metric or customer segment.
- Do not manufacture a quote, metric, or market conclusion.

## State Transition

When the gate passes, set `stage` to `decision`, choose the appropriate `evidence_level`, and append the new evidence summary to `workflow/log.md`.

# Axure Prototype Handoff

The V0.1 repository reserves this directory for the interactive Axure prototype. A clickable prototype is a follow-up item and is not represented by fake screenshots.

## Required Screens

1. Filtered feedback list with account and date scope.
2. Export entry point and field summary.
3. Permission denied state.
4. Processing state.
5. Download complete state.
6. Export failed and retry state.

## Required Interactions

- Account and date filters remain visible in the export confirmation.
- Users without permission cannot start an export.
- The confirmation state shows included fields and internal-note exclusion.
- Processing can move to complete or failed.
- A failed export explains the category and offers a safe retry.

## Deliverables

- `source/pm-decision-flow.rp`: editable Axure source.
- `html/`: Axure HTML export that opens locally.
- `screens/`: exported PNG screenshots for quick review.
- `notes.md`: page goals, key interactions, and test tasks.

## Publication Rule

Do not add dummy screenshots, copied premium templates, or customer data. When the prototype is ready, add all four deliverables and link the HTML entry point from the case study and website.

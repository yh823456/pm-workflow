# Decision Record: Customer Review Export

## Decision

- Decision question: What is the smallest response that improves customer review preparation without creating a data-governance risk?
- Owner: Product Manager
- Date: 2026-11-19
- Decision: Revise and proceed to a lightweight PRD

## Context

- Problem brief: Review owners manually assemble filtered feedback into review packets.
- Key evidence: Account and date filters are necessary; internal notes must remain protected.
- Strategy or segment fit: Strategic customer retention is a current company priority.
- Constraints: Export must respect role, account access, internal-only fields, and deletion state.

## Options

| Option | User value | Evidence confidence | Effort | Risk | Notes |
|---|---|---|---|---|---|
| Full unrestricted bulk export | High volume | Low | Low | High | Simplest to build but conflicts with governance |
| Filtered export with role permissions | Preserves current review set | Medium | Medium | Medium | Tests the core workflow without building a report system |
| Scheduled or formatted report | Closest to final packet | Low | High | Medium | Valuable later, but too much scope for the first test |

## Rationale

Choose the filtered export with role permissions because it tests whether preserving a useful feedback set reduces preparation effort. It avoids unrestricted exposure and does not assume that a scheduled report is the correct long-term solution.

The PRD must include:

- Account and date filters.
- Internal-note exclusion.
- Role-based access.
- CSV export.
- Export progress and failure states.

## Revisit Conditions

- Trigger: Users continue manually formatting most of the packet after export.
- Date or review point: 30 days after the first internal release or after 20 completed exports.
- Owner: Product Manager

## Consequences

- Accepted risk: CSV does not solve final presentation formatting.
- Dependency: Security confirmation for exported fields and permission checks.
- Follow-up: Evaluate scheduled or formatted reports only if export usage and qualitative feedback support it.

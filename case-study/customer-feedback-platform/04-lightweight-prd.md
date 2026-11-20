# Lightweight PRD: Filtered Customer Feedback Export

## Metadata

- Initiative: Customer review preparation
- Owner: Product Manager
- Decision record: [03-decision-record.md](./03-decision-record.md)
- Status: Ready for design and engineering review
- Last updated: 2026-11-20

## Problem and Goal

- Problem: Review owners manually copy feedback because the current filtered view cannot be exported consistently.
- Target user: Customer success managers and product managers with account access
- Goal: Let a review owner export the currently relevant feedback into a consistent evidence file.
- Success measure: Median packet preparation time is lower than the baseline recorded during the pilot.
- Guardrail measure: No export may include an account, field, or internal note the user is not authorized to view.

## Evidence

- Primary evidence: Simulated account and date filter needs; public pattern of role-based export controls.
- Important uncertainty: Final formatting and scheduled delivery may matter more than raw export.
- Evidence boundary: The case is simulated and not externally validated.

## Scope

### In Scope

1. Export feedback from the current account and date filter.
2. Exclude internal-only notes.
3. Generate a CSV containing approved feedback fields.
4. Enforce the user's existing account and role permissions.
5. Show progress, completion, and failure states.

### Non-goals

1. PDF or slide generation.
2. Scheduled or automatically delivered reports.
3. Customer-facing sharing or public links.
4. A custom report builder.
5. Cross-account unrestricted export.

## User Journey

| Step | User action | System response | Failure state |
|---|---|---|---|
| 1 | Open a filtered feedback list | Preserve the active account and date filters | Filters are invalid or no longer permitted |
| 2 | Select Export CSV | Show included fields and internal-note exclusion | User does not have export permission |
| 3 | Confirm export | Create an asynchronous export and show progress | Export fails or exceeds row limit |
| 4 | Download the file | Make the file available only to the requesting user | File expires or access changes |

## Requirements and Acceptance Criteria

### Requirement 1: Permission-safe scope

- User story: As an authorized review owner, I can export only the feedback visible in my current filtered view.
- Acceptance criteria:
  1. The export uses the same account and date scope as the visible result set.
  2. The export fails closed when permission cannot be checked.
  3. Internal-only notes are excluded from the file.

### Requirement 2: Clear export content

- User story: As a review owner, I know which fields will be included before the file is created.
- Acceptance criteria:
  1. The confirmation state lists included field groups.
  2. The user can cancel before creating the export.
  3. The file contains a stable header row and one feedback item per row.

### Requirement 3: Reliable completion

- User story: As a review owner, I can tell whether the export is still running, completed, or failed.
- Acceptance criteria:
  1. The interface shows a progress or processing state for exports that do not complete immediately.
  2. A failed export explains the failure category and offers a safe retry.
  3. A completed file expires after the policy-defined period.

## Permissions and Security

- Roles: Existing account viewer and export permission are required.
- Data visibility: Only fields visible to the requesting user are exported.
- Audit requirement: Record requester, timestamp, scope, row count, and outcome without storing the file content in analytics.

## Analytics

| Event or measure | Purpose | Property |
|---|---|---|
| export_started | Measure intent and scope | row_count, filter_count |
| export_completed | Measure successful completion | duration_ms, row_count |
| export_failed | Diagnose reliability | failure_category |
| export_downloaded | Measure actual use | duration_since_completion |
| export_expired | Measure delayed use | hours_to_expiry |

## Dependencies and Rollout

- Design dependency: Confirmation, progress, completion, and failure states.
- Engineering dependency: Permission enforcement and asynchronous file generation.
- Data dependency: Stable account, date, field, and internal-note model.
- Rollout plan: Internal pilot with customer success and product teams, then staged customer rollout after security review.

## Risks and Open Questions

| Item | Owner | Decision deadline |
|---|---|---|
| Users may still need manual formatting | Product Manager | After first 20 exports |
| Large account histories may exceed the row limit | Engineering | Before pilot |
| Sensitive field export policy is incomplete | Security | Before pilot |

## Verification Plan

- Baseline: Time three simulated packet preparations and replace with real observations when possible.
- Target or hypothesis: Median preparation time decreases and repeated exports occur for more than one review cycle.
- Observation window: 30 days after pilot release or 20 completed exports.
- Data source: Export events, timed observation, short follow-up interviews, and support requests.

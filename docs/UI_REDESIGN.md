# UI redesign implementation

## Scope and design

Applied the supplied full-viewport brief to all existing frontend routes. Impeccable informed composition and state coverage; design-taste guided the restrained discovery presentation; Emil's engineering guidance informed press feedback, reduced motion, and interaction details.

Tokens and layout decisions are recorded in ../DESIGN.md and frontend/src/styles/global.css. The existing Tailwind/Vite stack remains; no component framework or animation dependency was added.

## Page changes

- Home: split hero, explicit media placeholder, real API-backed destination/guide sections, published experiences when available, planning steps, responsible travel.
- Directories: consistent media/card proportions, search, guide-specialty filter, destination page-local category/sort controls, server pagination and count. Sparse results use wider compositions.
- Destination, guide, and experience details: breadcrumbs, readable content, contextual booking rail, real related experiences, public social links, honest missing-media states.
- Booking: destination defaults from selected package, selected guide/experience summary, pending submit state, offline protection, explicit request-sent success view.
- Auth/application: balanced layouts, autocomplete, native validation, pending feedback, safe internal return paths, clear application review wording.
- Tourist: status filtering, recent-request summaries, cancellation feedback, next actions.
- Guide: request response workspace, date availability management, draft creation and publication, pending action states.
- Admin: application status filter, summary counts, required review reason, decision feedback.
- Shared: role-aware workspace navigation, signed-in header actions/logout, keyboard mobile menu, skip link, footer, skeleton/error states, offline/update notices.

## Verification

Browser QA uses isolated test fixtures, never production database writes. The repeatable script is frontend/scripts/ui-qa.mjs. It expects Playwright to be installed or UI_PLAYWRIGHT_MODULE to point to an available Playwright module.

The matrix covers 17 routes at 320, 375, 430, 768, 1024, 1280, 1440, and 1920px. Interactions cover mobile Escape, guide search, destination pagination, booking request success, offline booking protection, guest discovery, guest workspace sign-in, and homepage empty states.

## Existing product boundaries

No backend changes were made. Current API responses do not supply permissioned image galleries, destination/guide associations, genuine review data, or public package capacity. UI does not fabricate these. Favorites, super-admin management, reports, and other unimplemented backend workflows have no invented dashboard controls.

Destination category and alphabetical sorting apply to the current server page and are labeled accordingly. Guide/package list sizes remain limited by existing API contracts. Privacy/terms/contact retain their existing pending-content status.

Browser emulation verifies responsive geometry, not physical-device installation or native keyboard behavior. Service-worker private-data runtime caching remains disabled. Actual installed-app update lifecycle requires a deployed update and is not claimed as tested.

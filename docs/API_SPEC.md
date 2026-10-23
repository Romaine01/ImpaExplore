# API implemented so far

Base URL: `/api/v1`. Successful responses use `{ "data": ... }`; lists may also include `meta`. Errors use `{ "error": { "code", "message" } }`. Authenticated requests use an HttpOnly session cookie. Mutations require the configured `FRONTEND_ORIGIN` Origin header.

Public: `GET /health`, `/destinations`, `/destinations/:slug`, `/guides`, `/guides/:slug`, `/packages`, `/packages/:slug`.

Accounts: `POST /auth/register`, `/auth/login`, `/auth/logout`; `GET /auth/me`.

Guide application: `POST /guide-applications`, `GET /guide-applications/mine`. Admin: `GET /admin/guide-applications`, `PATCH /admin/guide-applications/:id/review` with `status: approved|rejected` and `reason`.

Guide management: `GET/PATCH /guide/profile`, `GET/POST /guide/packages`, `PATCH/DELETE /guide/packages/:id`, `GET/PUT /guide/availability`. Package creation produces a draft. Publishing requires a subsequent owner update. Availability stores blocked `YYYY-MM-DD` dates in Asia/Manila.

Bookings: `POST /bookings`, `GET /bookings/mine`, `GET /bookings/:id`, `PATCH /bookings/:id/cancel`; guide: `GET /guide/bookings`, `PATCH /guide/bookings/:id/respond` with `status: CONFIRMED|DECLINED`.

`POST /bookings` requires `guideId`, `destinationId`, ISO UTC `requestedStartAt`, numeric `partySize`, optional `packageId` and `notes`, and UUID `requestKey`. Initial status is `PENDING`; a guide response changes it. A unique MongoDB partial index enforces at most one `CONFIRMED` booking per guide per Manila calendar day. The index must exist before live traffic; bookings created by older versions need a `serviceDay` migration before deployment.

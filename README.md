# ImpaExplore

Independent tourism discovery and guide request Progressive Web App for Impasugong, Bukidnon. This repository is an early working implementation, not a launched service. It has no government affiliation.

## Local development

Requires Node.js 24 or a supported current LTS release and a running MongoDB instance.

Backend terminal:

```sh
cd backend
npm install
cp .env.example .env
# Set SESSION_SECRET to a unique value of at least 32 characters.
npm run dev
```

Frontend terminal:

```sh
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173. On PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

## Current implementation

Public pages and API routes for destinations, guides, and experiences; session based registration and login; guide applications and admin review; guide profile, package and blocked-date management; tourist booking requests, cancellation, and guide responses; basic PWA manifest and offline fallback. MongoDB starts empty. No real guides, prices, or destinations are supplied. Public browsing requires no account or installation.

## Important limitations

This is not production ready. Email verification and reset, protected uploads, multi-day booking policy, reviews, favorites, notifications, full policy text, and deployment validation remain to be implemented. Do not use it for real customer data or bookings until these are complete and independently reviewed. A role-isolated admin portal now uses `platform_admin` and `super_admin`, server-side API authorization, TOTP MFA, rate limits, no-store private responses, and audit records for implemented privileged mutations. Before deploying a database with earlier booking records, migrate their `serviceDay` values and verify the unique index was created.

API details and implementation notes are in [docs/API_SPEC.md](docs/API_SPEC.md) and [docs/DECISIONS.md](docs/DECISIONS.md).

The source layout now follows the implemented portions of the project scaffolding: see [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md). Scaffold areas for features not yet built (such as favorites, reviews, super-admin, and uploads) have not been added as empty directories.

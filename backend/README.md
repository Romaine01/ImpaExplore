# ImpaExplore backend

Express + TypeScript API. See the root README for product status and limitations.

## Run

```sh
npm install
cp .env.example .env
# Set MONGODB_URI, FRONTEND_ORIGIN, and a random SESSION_SECRET (32+ characters).
npm run dev
```

The API defaults to port 5001 and exposes `GET /api/v1/health`. Use the Atlas connection URI and database-user credentials from Atlas, not the MongoDB Compass connection display. The `Explore` database must be named in the URI path; credentials must be URL-encoded. Never put the URI in the frontend environment.

To create or repair the default platform administrator, add `ADMIN_PASSWORD` and a private base32 `ADMIN_MFA_SECRET` to `.env`, then run `npm run seed:admin`. The default email is `admin@impaexplore.local`; set `ADMIN_EMAIL` to change it. The idempotent command preserves an existing password, migrates the legacy `admin` role to `platform_admin`, and enables TOTP MFA. Run `npm run admin:mfa` locally to display the private authenticator enrollment value. To intentionally reset an existing admin password once, run `ADMIN_RESET_PASSWORD=true npm run seed:admin`.

## Organization

`src/app.ts` mounts middleware and feature routers; `src/server.ts` connects the database and listens. `src/config` owns environment validation, `src/db` connection setup, `src/middleware` shared HTTP/session/error logic, and `src/modules` owns models, validation, services, controllers, and routes by feature. Controllers translate HTTP requests and responses; services own workflow and database rules. Tests live beside the relevant module.

`npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` verify the backend. API contracts are documented in `../docs/API_SPEC.md`.

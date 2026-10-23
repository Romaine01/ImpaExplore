# ImpaExplore frontend

React + Vite + TypeScript PWA. See the root README for product status and limitations.

## Run

```sh
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` to the backend's `/api/v1` base URL. Never put MongoDB credentials or backend secrets in a `VITE_` variable.

## Organization

`src/app` owns the app shell, route table, and providers. `src/pages` contains route-level screens grouped by public, auth, tourist, guide, and admin. `src/features` owns domain-specific API hooks, actions, and types; `src/services/httpClient.ts` is the shared HTTP boundary. `src/components` contains reusable layout/common/UI components, `src/pwa` offline presentation, and `src/styles` global styling.

`npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` verify the frontend. Backend roles and ownership are enforced by the API, not by client routing.

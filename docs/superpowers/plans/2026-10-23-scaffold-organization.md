# ImpaExplore scaffold organization

Goal: align the existing runnable app with sections 7, 19, and 20 of the project scaffolding without changing the public routes or inventing unfinished features.

1. Characterize existing API route surface and verify baseline builds/tests.
2. Split backend into config, database, middleware, and feature modules. Keep route handlers thin; move business rules to services and Mongoose definitions beside their owning features.
3. Split frontend into app/router/providers, layout/common UI, feature API/hook modules, page directories, PWA support, and styles. Preserve visible behavior and API paths.
4. Add package-specific README files and document any scaffold areas not yet implemented.
5. Run backend and frontend typecheck, lint, tests, and builds; inspect for stale imports and accidental secret exposure.

No new product behavior or database migration is intended in this refactor.

# Effi-Dashboard

Next.js App Router. Use `lib/api.ts` for backend calls and `useRealtime` for live case/transcript events.

Keep the civic paper/ink/moss palette. Status edits PATCH `/cases/{id}` with `source: dashboard`.

Staff auth is Clerk. Wrap the tree in `ClerkProvider`, keep `middleware.ts` at the project root (Next 15), and call `auth.protect()` on case detail and the resident call page. Account Portal buttons live in `AuthControls`.

---
name: effi-dashboard-ui
description: EffiGov Next.js case desk. Use when changing inbox, case detail, resident call booth, LiveKit UI, or dashboard styling.
---

# Effi dashboard

Next.js App Router. Run `npm run dev` in `Effi-Dashboard`.

| Route | Purpose |
|---|---|
| `/` | Case inbox (`CaseInbox`) |
| `/cases/[id]` | Detail, status controls, transcript, audit |
| `/call` | Resident LiveKit booth |

## Rules

- Fetch through `lib/api.ts`. Browser calls go to `/api/backend/*`, which requires a Clerk session and adds `EFFI_API_KEY`.
- Live updates use `useRealtime`. The socket asks `/api/ws-token` (Clerk) then connects to `/ws?token=...`.
- Server components may load a case once; keep mutating UI in client components.
- Civic palette: paper `#f3efe6`, ink `#1c2430`, moss `#1f6b5a`. No purple gradients.
- After API shape changes, update `lib/types.ts` in the same PR as the backend.
- Auth is Clerk (`@clerk/nextjs`). `ClerkProvider` in `app/layout.tsx`, `middleware.ts` at the repo root, Account Portal via `AuthControls`. Protect `/cases/[id]` and `/call` with `auth.protect()`. Set server-only `EFFI_API_KEY` to match Effi-Backend.

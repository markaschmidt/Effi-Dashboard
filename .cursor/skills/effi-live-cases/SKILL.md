---
name: effi-live-cases
description: Real-time case and transcript updates on the EffiGov dashboard. Use when changing WebSocket handling, live transcripts, or inbox merge behavior.
---

# Live cases

`useRealtime` opens `/ws` and retries on close.

Handle:

- `case.created` — prepend inbox row
- `case.updated` — patch matching row or detail
- `call.transcript` — append finals; show `is_final=false` as the ghost "speaking" line

Ignore events for other cases on the detail page. Keep merge functions idempotent; transcript ids must not duplicate if a frame is replayed.

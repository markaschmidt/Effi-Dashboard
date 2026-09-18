# EffiGov Dashboard

Internal case desk (Next.js) plus a resident call booth for the demo.

Full local setup for all three services, including seeded Clerk logins, is in the workspace [instructions](https://github.com/markaschmidt/Effigov/blob/main/instructions.md).

Sign in with username `root` / `helloworld1!` (admin) or `user` / `test123!` (staff).

## Run

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

The inbox lists cases from Effi-Backend. `/call` mints a LiveKit token and joins a room so the agent can run a real conversation.

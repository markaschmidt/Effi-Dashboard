import { auth } from "@clerk/nextjs/server";
import { AppShell, CallLauncher } from "@/components";

export default async function CallPage() {
  await auth.protect();
  return (
    <AppShell title="Resident call">
      <CallLauncher />
    </AppShell>
  );
}

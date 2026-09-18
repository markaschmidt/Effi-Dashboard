import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppShell, CallLauncher } from "@/components";
import { getMe } from "@/lib/api-server";
import { deskHref } from "@/lib/desk";

export const dynamic = "force-dynamic";

export default async function CallPage() {
  await auth.protect();
  let staff = false;
  try {
    staff = (await getMe()).is_staff;
  } catch {
    staff = false;
  }
  if (staff) redirect("/dashboard/admin");
  return (
    <AppShell title="Resident call" isStaff={false} deskHref={deskHref(false)}>
      <CallLauncher />
    </AppShell>
  );
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppShell, CaseDesk } from "@/components";
import { loadDesk, type DeskSearch } from "@/lib/loadDesk";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<DeskSearch> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  let desk;
  try {
    desk = await loadDesk(searchParams);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not load the case desk";
    return (
      <AppShell title="All cases">
        <p className="text-clay">{message} Make sure Effi-Backend is running.</p>
      </AppShell>
    );
  }
  const { viewer, caseId, detail, detailError } = desk;
  if (!viewer.is_staff) redirect("/dashboard");
  return (
    <CaseDesk
      deskHref="/dashboard/admin"
      title="All cases"
      scope="all"
      viewer={viewer}
      caseId={caseId}
      detail={detail}
      detailError={detailError}
    />
  );
}

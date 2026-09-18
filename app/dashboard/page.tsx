import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppShell, CaseDesk } from "@/components";
import { loadDesk, type DeskSearch } from "@/lib/loadDesk";

export const dynamic = "force-dynamic";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<DeskSearch> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  try {
    const { viewer, caseId, detail, detailError } = await loadDesk(searchParams);
    return (
      <CaseDesk
        deskHref="/dashboard"
        title="Case desk"
        scope="mine"
        viewer={viewer}
        caseId={caseId}
        detail={detail}
        detailError={detailError}
      />
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not load the case desk";
    return (
      <AppShell title="Case desk">
        <p className="text-clay">{message} Make sure Effi-Backend is running.</p>
      </AppShell>
    );
  }
}

import { auth } from "@clerk/nextjs/server";
import { AppShell, CaseDetailView } from "@/components";
import { getCase } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  await auth.protect();
  const { id } = await params;
  let detail = null;
  let error = "";
  try {
    detail = await getCase(id);
  } catch (err) {
    error = err instanceof Error ? err.message : "Case could not be loaded";
  }

  return (
    <AppShell title={detail?.resident_name ?? "Case"}>
      {detail ? <CaseDetailView initial={detail} /> : <p className="text-clay">{error}</p>}
    </AppShell>
  );
}

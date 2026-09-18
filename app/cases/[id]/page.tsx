import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMe } from "@/lib/api-server";
import { caseDeskHref, deskHref } from "@/lib/desk";

export const dynamic = "force-dynamic";

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const { id } = await params;
  let staff = false;
  try {
    staff = (await getMe()).is_staff;
  } catch {
    staff = false;
  }
  redirect(caseDeskHref(deskHref(staff), id));
}

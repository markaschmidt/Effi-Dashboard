import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell, CaseInbox, buttonVariants } from "@/components";

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <AppShell
      title="Case desk"
      actions={
        <Link href="/call" className={buttonVariants({ variant: "primary" })}>
          Start resident call
        </Link>
      }
    >
      <CaseInbox />
    </AppShell>
  );
}

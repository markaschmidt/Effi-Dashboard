import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInLanding } from "@/components/auth";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const { userId } = await auth();
  if (userId) redirect("/auth/continue");
  return <SignInLanding mode="sign-in" />;
}

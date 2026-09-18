import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInLanding } from "@/components";

export default async function SignInPage() {
  const { userId } = await auth();
  if (userId) redirect("/");
  return <SignInLanding mode="sign-in" />;
}

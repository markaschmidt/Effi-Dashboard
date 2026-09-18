"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import type { SignInLandingMode } from "./types";

export function ClerkAuthPanel({ mode }: { mode: SignInLandingMode }) {
  if (mode === "sign-up") {
    return <SignUp signInUrl="/sign-in" />;
  }

  return <SignIn signUpUrl="/sign-up" />;
}

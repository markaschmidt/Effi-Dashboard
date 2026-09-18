"use client";

import { SignIn, SignUp, useAuth } from "@clerk/nextjs";
import { LoadingState } from "@/components/LoadingState";
import { appUrl } from "@/lib/appUrl";
import type { SignInLandingMode } from "./types";

const AFTER_AUTH = "/auth/continue";

export function ClerkAuthPanel({ mode }: { mode: SignInLandingMode }) {
  const { isLoaded } = useAuth();
  const afterAuth = appUrl(AFTER_AUTH);
  const label = mode === "sign-up" ? "Signing up" : "Signing in";

  if (!isLoaded) {
    return <LoadingState label={label} />;
  }

  if (mode === "sign-up") {
    return (
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl={afterAuth}
        forceRedirectUrl={afterAuth}
      />
    );
  }

  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl={afterAuth}
      forceRedirectUrl={afterAuth}
    />
  );
}

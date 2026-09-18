"use client";

import { useClerk } from "@clerk/nextjs";
import { SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import { appUrl } from "@/lib/appUrl";
import { LoadingState } from "../../LoadingState";
import { IconButton } from "../../IconButton";
import type { SignOutControlProps } from "./types";

const DEFAULT_SIGN_IN_PATH = "/sign-in";

export function SignOutControl({ redirectUrl = DEFAULT_SIGN_IN_PATH }: SignOutControlProps) {
  const { signOut } = useClerk();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    if (pending) return;
    setPending(true);
    try {
      await signOut();
    } catch {
      // Session may already be cleared.
    }
    window.location.replace(appUrl(redirectUrl));
  }

  return (
    <>
      {pending ? <LoadingState variant="overlay" label="Signing out" /> : null}
      <IconButton
        label={pending ? "Signing out…" : "Sign out"}
        loading={pending}
        disabled={pending}
        aria-busy={pending}
        onClick={() => void handleSignOut()}
      >
        <SignOut size={20} weight="regular" />
      </IconButton>
    </>
  );
}

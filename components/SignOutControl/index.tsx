"use client";

import { SignOutButton } from "@clerk/nextjs";
import { SignOut } from "@phosphor-icons/react";
import { IconButton } from "../IconButton";
import type { SignOutControlProps } from "./types";

export function SignOutControl({ redirectUrl = "/" }: SignOutControlProps) {
  return (
    <SignOutButton redirectUrl={redirectUrl}>
      <IconButton label="Sign out">
        <SignOut size={20} weight="regular" />
      </IconButton>
    </SignOutButton>
  );
}

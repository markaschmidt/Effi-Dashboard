"use client";

import { useUser } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import type { StaffGreetingProps } from "./types";
import { displayFirstName } from "./utils";

export function StaffGreeting({ firstName, fullName }: StaffGreetingProps) {
  const { user, isLoaded } = useUser();
  if (!isLoaded && !firstName && !fullName) {
    return <Spinner className="size-4 text-ink/40" />;
  }
  const name = displayFirstName(firstName ?? user?.firstName, fullName ?? user?.fullName);

  return <p className="text-sm text-ink/70">welcome back {name}!</p>;
}

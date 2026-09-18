"use client";

import { useUser } from "@clerk/nextjs";
import type { StaffGreetingProps } from "./types";
import { displayFirstName } from "./utils";

export function StaffGreeting({ firstName, fullName }: StaffGreetingProps) {
  const { user, isLoaded } = useUser();
  if (!isLoaded && !firstName && !fullName) return null;
  const name = displayFirstName(firstName ?? user?.firstName, fullName ?? user?.fullName);

  return <p className="text-sm text-ink/70">welcome back {name}!</p>;
}

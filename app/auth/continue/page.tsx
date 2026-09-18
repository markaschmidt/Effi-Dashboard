"use client";

import { useEffect } from "react";
import { LoadingState } from "@/components";

export default function AuthContinuePage() {
  useEffect(() => {
    window.location.replace("/dashboard/admin");
  }, []);

  return <LoadingState variant="page" label="Signing in" className="min-h-screen" />;
}

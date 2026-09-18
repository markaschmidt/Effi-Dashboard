"use client";

import { Phone } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type CallScreenProps = {
  status: string;
  subtitle?: string;
  extra?: ReactNode;
  error?: string;
  children: ReactNode;
};

export function CallScreen({ status, subtitle = "Resident services", extra, error, children }: CallScreenProps) {
  return (
    <div className="flex min-h-[36rem] flex-col items-center justify-between px-8 py-10 text-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-paper/45">{status}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-paper">Effi</h2>
        <p className="text-sm text-paper/55">{subtitle}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-moss text-4xl font-semibold text-paper shadow-[0_0_0_12px] shadow-moss/20">
          EG
        </div>
        {extra}
      </div>

      <div className="w-full space-y-4">
        {error ? <p className="text-sm text-clay">{error}</p> : null}
        {children}
      </div>
    </div>
  );
}

type CallActionProps = {
  label: string;
  tone: "decline" | "answer";
  disabled?: boolean;
  onClick: () => void;
};

export function CallAction({ label, tone, disabled, onClick }: CallActionProps) {
  const decline = tone === "decline";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-xs text-paper/70 disabled:opacity-50"
    >
      <span
        className={
          decline
            ? "flex h-16 w-16 items-center justify-center rounded-full bg-clay text-paper"
            : "flex h-16 w-16 items-center justify-center rounded-full bg-moss text-paper"
        }
      >
        <Phone size={28} weight="fill" className={decline ? "-rotate-[135deg]" : undefined} />
      </span>
      {label}
    </button>
  );
}

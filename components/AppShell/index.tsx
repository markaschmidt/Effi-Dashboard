import Link from "next/link";
import { BrandMark } from "../BrandMark";
import { SignOutControl } from "../SignOutControl";
import { StaffGreeting } from "../StaffGreeting";
import type { AppShellProps } from "./types";

export function AppShell({ children, title, actions }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-8">
            <BrandMark compact />
            <nav className="flex gap-4 text-sm text-ink/70">
              <Link href="/" className="hover:text-ink">
                Cases
              </Link>
              <Link href="/call" className="hover:text-ink">
                Resident call
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <StaffGreeting />
            <SignOutControl />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}

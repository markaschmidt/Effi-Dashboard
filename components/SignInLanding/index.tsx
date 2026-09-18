import { Buildings, PhoneCall, ShieldCheck } from "@phosphor-icons/react/ssr";
import { BrandMark } from "../BrandMark";
import type { SignInLandingProps } from "./types";
import { ClerkAuthPanel } from "./utils";

function LandingAside() {
  return (
    <aside className="relative hidden overflow-hidden bg-moss md:flex md:flex-col md:justify-center md:px-12 lg:px-16">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-ink/20" />
      <div className="relative z-10 grid max-w-sm gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <PhoneCall className="text-moss" size={22} />
          <p className="mt-3 text-sm leading-relaxed text-ink/70">Voice intake becomes a case the moment the call is saved.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-moss" size={22} />
            <Buildings className="text-ink/40" size={20} />
          </div>
          <p className="mt-3 font-medium text-ink">Staff desk, city rules</p>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">Cases stay on the Concierge desk. Sign in to review them.</p>
        </div>
      </div>
    </aside>
  );
}

export function SignInLanding({ mode = "sign-in" }: SignInLandingProps) {
  const isSignUp = mode === "sign-up";

  return (
    <div className="grid min-h-screen bg-white md:grid-cols-2">
      <section className="flex flex-col px-8 py-8 sm:px-12">
        <div className="mb-10 flex items-center justify-between gap-4 text-sm text-ink/50">
          <BrandMark />
          {isSignUp ? (
            <p>
              Already on staff?{" "}
              <a href="/sign-in" className="font-medium text-moss hover:underline">
                Sign in
              </a>
            </p>
          ) : (
            <p>
              Need an account?{" "}
              <a href="/sign-up" className="font-medium text-moss hover:underline">
                Sign up
              </a>
            </p>
          )}
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <h1 className="text-3xl font-semibold tracking-tight">{isSignUp ? "Sign up" : "Sign in"}</h1>
          <p className="mt-2 text-sm text-ink/55">
            {isSignUp
              ? "Create a staff account for the EffiGov Concierge desk."
              : "Use your username, email, or Google to open the case desk."}
          </p>
          <div className="mt-8">
            <ClerkAuthPanel mode={mode} />
          </div>
        </div>
      </section>
      <LandingAside />
    </div>
  );
}

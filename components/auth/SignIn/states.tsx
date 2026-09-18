import { LoadingState } from "@/components/LoadingState";
import { BrandMark } from "../../BrandMark";

export function AuthLoadingScreen({ label = "Signing in" }: { label?: string }) {
  return (
    <div className="grid min-h-screen bg-white md:grid-cols-2">
      <section className="flex flex-col px-8 py-8 sm:px-12">
        <div className="mb-10">
          <BrandMark />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <LoadingState label={label} variant="page" className="min-h-0 py-16" />
        </div>
      </section>
      <aside className="hidden bg-moss md:block" />
    </div>
  );
}

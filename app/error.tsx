'use client';

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-border/70 bg-panel p-8 shadow-xl shadow-black/5">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Something went wrong
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              We hit an error while loading this page.
            </h1>
          </div>

          <div className="rounded-2xl bg-muted/70 p-4 text-sm text-foreground/80">
            <p className="font-medium">Error message</p>
            <p className="mt-2 break-words">{error?.message ?? "Unknown error"}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-border/80 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Go home
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            If this keeps happening, try clearing your browser cookies or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}

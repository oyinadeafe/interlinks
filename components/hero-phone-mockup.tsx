export function HeroPhoneMockup() {
  return (
    <div className="hidden lg:block">
      <div className="relative isolate h-[700px] w-[360px] rounded-[3rem] border border-border/70 bg-slate-950/90 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.35)]">
        <div className="absolute inset-x-0 top-4 mx-auto h-1 w-20 rounded-full bg-white/20" />
        <div className="absolute inset-x-0 top-8 mx-auto h-2 w-2 rounded-full bg-emerald-400" />
        <div className="absolute inset-x-0 top-8 right-10 flex justify-end gap-2 px-4 text-[10px] uppercase tracking-[0.25em] text-white/60">
          <span>9:41</span>
        </div>

        <div className="absolute inset-x-3 top-16 bottom-3 rounded-[2.25rem] bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950/90 shadow-inner shadow-black/40 ring-1 ring-white/5">
          <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-slate-950/95">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 p-4 text-white/90">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Dashboard</p>
                <p className="text-sm font-semibold">Your links</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 text-white/80">+</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 text-white/80">•••</span>
              </div>
            </div>

            <div className="space-y-3 border-b border-white/10 p-4 text-sm text-white/80">
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-3 py-2">
                <span className="text-xs uppercase tracking-[0.22em] text-white/50">Links</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] font-semibold text-emerald-300">2 / 5</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-3 py-2">
                <span className="text-xs uppercase tracking-[0.22em] text-white/50">Views</span>
                <span className="text-sm font-semibold text-white">142</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-sm shadow-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Product Design Portfolio</p>
                      <p className="mt-1 text-xs text-white/60">behance.net/oyinade</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] font-semibold text-emerald-200">Enabled</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                    <span>0 clicks</span>
                    <span>live</span>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-sm shadow-black/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">LinkedIn</p>
                      <p className="mt-1 text-xs text-white/60">linkedin.com/in/oyinade</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/70">Enabled</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                    <span>1 click</span>
                    <span>live</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="grid gap-3 text-white/80 text-xs">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                  <span>Appearance</span>
                  <span className="text-white/60">Edit</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                  <span>Billing</span>
                  <span className="text-white/60">View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

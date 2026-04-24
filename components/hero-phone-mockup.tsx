export function HeroPhoneMockup() {
  return (
    <div className="hidden lg:block">
      <div className="relative isolate h-[300px] w-[140px] rounded-[1.75rem] border border-border/70 bg-slate-950/90 shadow-[0_22px_64px_-24px_rgba(15,23,42,0.35)]">
        <div className="absolute inset-x-0 top-4 mx-auto h-1 w-10 rounded-full bg-white/20" />
        <div className="absolute inset-x-0 top-8 mx-auto h-2 w-2 rounded-full bg-emerald-400" />
        <div className="absolute inset-x-0 top-8 right-6 flex justify-end gap-2 px-3 text-[9px] uppercase tracking-[0.25em] text-white/60">
          <span>9:41</span>
        </div>

        <div className="absolute inset-x-2 top-14 bottom-3 rounded-[1.35rem] bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950/90 shadow-inner shadow-black/30 ring-1 ring-white/5">
          <div className="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/5 bg-slate-950/95">
            <div className="border-b border-white/10 p-3 text-white/90">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">Preview only</p>
              <p className="mt-2 text-sm font-semibold text-white">@yourhandle</p>
              <p className="text-[10px] text-white/60">Example page content</p>
            </div>

            <div className="space-y-2 p-3 text-sm text-white/90">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-2 shadow-sm shadow-black/10">
                <p className="font-medium text-white">Website</p>
                <p className="mt-1 text-[10px] text-white/60">example.com</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-2 shadow-sm shadow-black/10">
                <p className="font-medium text-white">Social</p>
                <p className="mt-1 text-[10px] text-white/60">x.com/yourname</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-2 shadow-sm shadow-black/10">
                <p className="font-medium text-white">Contact</p>
                <p className="mt-1 text-[10px] text-white/60">demo@example.com</p>
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 p-3 text-[10px] text-white/60">
              <div className="flex items-center justify-between">
                <span>Visits</span>
                <span className="font-semibold text-white">198</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Since</span>
                <span className="text-white/70">2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

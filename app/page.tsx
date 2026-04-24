import Link from "next/link";
import { ArrowRight, BarChart3, Globe2, Palette, Wallet } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

const features = [
  {
    icon: Palette,
    title: "Design your bio page",
    body: "Upload a photo, pick a colour, drop your links. No designer needed.",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    body: "See which link is winning, where the traffic comes from, and on what device.",
  },
  {
    icon: Wallet,
    title: "Paid in Naira",
    body: "Pay with your debit card, bank transfer or USSD. No dollar card, no stress.",
  },
  {
    icon: Globe2,
    title: "Custom domain",
    body: "Bring your own domain so the link in your bio matches your brand.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="font-semibold tracking-tight">
            {APP_NAME}
          </Link>
          <nav className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ size: "sm" })}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden px-4 sm:px-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-primary/10 blur-3xl" />
          <div className="mx-auto w-full max-w-6xl py-20 sm:py-24">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/95 p-6 sm:p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.18)]">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl space-y-6">
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Built for Nigerian creators
                  </span>
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    One link for everything you make.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                    {APP_NAME} is the link-in-bio tool designed for Nigerian creators. Fast on 3G, priced in Naira, and built to show analytics that actually reflect how your audience finds you.
                  </p>
                  <div className="grid w-full gap-3 sm:max-w-max sm:grid-flow-col sm:auto-cols-min">
                    <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                      Claim your handle <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link href="#features" className={buttonVariants({ size: "lg", variant: "outline" })}>
                      See what you get
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto grid w-full max-w-6xl gap-4 px-4 sm:px-6 pb-28 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="border border-border/60 bg-background/80 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-foreground">{f.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} {APP_NAME}</span>
          <nav className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

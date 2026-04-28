"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  Globe,
  Link as LinkIcon,
  Menu,
  Palette,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkIcon,
  BarChart3,
  Palette,
  Globe,
  CreditCard,
  Settings,
};

export function DashboardMobileNav({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-start bg-black/30 p-4">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 flex w-full max-w-xs flex-col gap-4 overflow-hidden rounded-3xl border border-border/60 bg-popover p-4 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">Navigation</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              {nav.map((item) => {
                const isActive = pathname?.startsWith(item.href);
                const Icon = iconMap[item.icon];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      "flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-150 " +
                      (isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground")
                    }
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

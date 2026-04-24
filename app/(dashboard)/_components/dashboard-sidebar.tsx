"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export function DashboardSidebar({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm">
      {nav.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={
              "flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-150 " +
              (isActive
                ? "bg-muted text-foreground font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

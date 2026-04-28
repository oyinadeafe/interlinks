"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  Globe,
  Link as LinkIcon,
  Palette,
  Settings,
} from "lucide-react";

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

export function DashboardSidebar({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm">
      {nav.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        const Icon = iconMap[item.icon];
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
            {Icon && <Icon className="h-4 w-4" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

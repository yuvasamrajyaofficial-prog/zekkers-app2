'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Bell,
  Lock,
  FolderKanban,
  KeyRound,
} from 'lucide-react';

const navLinks = [
  { href: "/global-employers-dashboard/settings", label: "Account Settings", icon: User, exact: true },
  { href: "/global-employers-dashboard/settings/notifications", label: "Notification Settings", icon: Bell },
  { href: "/global-employers-dashboard/settings/security", label: "Security & Login", icon: Lock },
  { href: "/global-employers-dashboard/settings/data", label: "Data Export / Delete", icon: FolderKanban },
  { href: "/global-employers-dashboard/settings/api-keys", label: "API Keys", icon: KeyRound },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navLinks.map(link => {
        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-md transition-colors",
              isActive
                ? "bg-slate-100 text-primary"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

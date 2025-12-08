
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building,
  ShieldCheck,
  Users2,
  Plug,
  CreditCard,
  Briefcase,
  BookOpen,
  Bell,
  Lock,
  Palette,
  FolderKanban,
  FileText,
  Repeat,
  Code,
  ListOrdered
} from 'lucide-react';

const navLinks = [
  { href: "/ngo-dashboard/settings", label: "Organization Profile", icon: Building, exact: true },
  { href: "/ngo-dashboard/settings/branding", label: "Branding & Appearance", icon: Palette },
  { href: "/ngo-dashboard/settings/users", label: "User Management", icon: Users2 },
  { href: "/ngo-dashboard/settings/roles", label: "Roles & Permissions", icon: ShieldCheck },
  { href: "/ngo-dashboard/settings/programs", label: "Program Configuration", icon: BookOpen },
  { href: "/ngo-dashboard/settings/integrations", label: "Integrations", icon: Plug },
  { href: "/ngo-dashboard/settings/sso", label: "SSO Setup", icon: Lock },
  { href: "/ngo-dashboard/settings/notifications", label: "Notifications & Alerts", icon: Bell },
  { href: "/ngo-dashboard/settings/security", label: "Security & Access", icon: Lock },
  { href: "/ngo-dashboard/settings/data", label: "Data Management", icon: FolderKanban },
  { href: "/ngo-dashboard/settings/compliance", label: "Compliance & Legal", icon: FileText },
  { href: "/ngo-dashboard/settings/billing", label: "Billing & Plans", icon: CreditCard },
  { href: "/ngo-dashboard/settings/automation", label: "Automation Rules", icon: Repeat },
  { href: "/ngo-dashboard/settings/developer", label: "Developer & API", icon: Code },
  { href: "/ngo-dashboard/settings/audit", label: "Audit Logs", icon: ListOrdered },
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

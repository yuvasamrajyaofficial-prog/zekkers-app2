
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
  Globe,
  Palette,
  Bell,
  Lock
} from 'lucide-react';

const navLinks = [
  { href: "/employer-dashboard/settings", label: "Organization", icon: Building, exact: true },
  { href: "/employer-dashboard/settings/branding", label: "Branding", icon: Palette },
  { href: "/employer-dashboard/settings/team", label: "Team & Roles", icon: Users2 },
  { href: "/employer-dashboard/settings/kyc", label: "KYC & Verification", icon: ShieldCheck },
  { href: "/employer-dashboard/settings/billing", label: "Billing & Plans", icon: CreditCard },
  { href: "/employer-dashboard/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/employer-dashboard/settings/job-defaults", label: "Job Defaults", icon: Briefcase },
  { href: "/employer-dashboard/settings/integrations", label: "Integrations & API", icon: Plug },
  { href: "/employer-dashboard/settings/security", label: "Security", icon: Lock },
  { href: "/employer-dashboard/settings/global-hiring", label: "Global Hiring", icon: Globe },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navLinks.map(link => {
        // Updated logic to handle nested routes better
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

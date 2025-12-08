
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Shield,
  Bell,
  Sparkles,
  Palette,
  Globe,
  FolderKanban,
  Plug,
  LifeBuoy,
  Trash2,
  Lock,
} from 'lucide-react';

const navLinks = [
  { href: "/dashboard/settings", label: "Profile", icon: User, exact: true },
  { href: "/dashboard/settings/account", label: "Account & Security", icon: Lock },
  { href: "/dashboard/settings/privacy", label: "Privacy & Permissions", icon: Shield },
  { href: "/dashboard/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings/ai", label: "AI Personalization", icon: Sparkles },
  { href: "/dashboard/settings/theme", label: "Appearance", icon: Palette },
  { href: "/dashboard/settings/language", label: "Language & Region", icon: Globe },
  { href: "/dashboard/settings/data", label: "Data & Documents", icon: FolderKanban },
  { href: "/dashboard/settings/integrations", label: "Integrations", icon: Plug },
  { href: "/dashboard/settings/support", label: "Support & Help", icon: LifeBuoy },
  { href: "/dashboard/settings/danger-zone", label: "Danger Zone", icon: Trash2 },
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

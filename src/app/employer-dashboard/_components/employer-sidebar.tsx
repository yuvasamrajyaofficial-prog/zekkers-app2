

'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import {
  Sidebar,
  useSidebar,
} from '@/components/ui/sidebar';
import { menuItems } from './menu-items';


function EmployerSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const isItemActive = (item: any) => {
    if (item.exact) return pathname === item.to;
    if (item.subItems) {
      return item.subItems.some((sub: any) => pathname.startsWith(sub.to));
    }
    if (item.to) {
        return pathname.startsWith(item.to);
    }
    return false;
  };

  return (
    <Sidebar className="flex flex-col bg-white border-r border-slate-200">
      <Link
        href="/employer-dashboard/company/profile"
        className="flex items-center gap-3 px-3 py-4 hover:bg-slate-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            ZK
        </div>
        {sidebarState === 'expanded' && (
          <div className="overflow-hidden">
            <div className="font-semibold">ZekkTech</div>
            <div className="text-xs text-slate-500 truncate">Employer Panel</div>
          </div>
        )}
      </Link>

      <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {menuItems.map((item) =>
          item.subItems ? (
            <Collapsible key={item.key} defaultOpen={isItemActive(item)}>
              <CollapsibleTrigger
                className={`group flex items-center justify-between w-full gap-3 p-2 rounded-md hover:bg-slate-100 ${
                  isItemActive(item) ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-slate-500 group-hover:text-primary ${
                      isItemActive(item) ? 'text-primary' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
                  {sidebarState === 'expanded' && (
                    <div className="text-sm">{item.label}</div>
                  )}
                </div>
                {sidebarState === 'expanded' && (
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                )}
              </CollapsibleTrigger>
              {sidebarState === 'expanded' && (
                <CollapsibleContent className="pl-6">
                  <div className="flex flex-col gap-1 mt-1 border-l-2 border-slate-200 pl-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.key}
                        href={subItem.to || '#'}
                        className={`group flex items-center gap-2 p-2 rounded-md text-sm ${
                          pathname === subItem.to
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                         {subItem.icon && <span className="text-slate-400 group-hover:text-primary">{subItem.icon}</span>}
                        <div className="text-xs">
                          {subItem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          ) : (
            <Link
              key={item.key}
              href={item.to || '#'}
              className={`group flex items-center gap-3 p-2 rounded-md ${
                isItemActive(item) ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div
                className={`text-slate-500 group-hover:text-primary ${
                  isItemActive(item) ? 'text-primary' : ''
                }`}
              >
                {item.icon}
              </div>
              {sidebarState === 'expanded' && (
                <div className="text-sm">{item.label}</div>
              )}
            </Link>
          )
        )}
      </nav>
    </Sidebar>
  );
}
export default EmployerSidebar;

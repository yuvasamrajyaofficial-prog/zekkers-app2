
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
import { menuItems } from './menu-items';

interface MobileGlobalSidebarProps {
  closeSheet: () => void;
}

export default function MobileGlobalSidebar({ closeSheet }: MobileGlobalSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => pathname.startsWith(sub.to));
    }
    return item.to ? pathname.startsWith(item.to) : false;
  };

  return (
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
                <div className="text-sm">{item.label}</div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6">
              <div className="flex flex-col gap-1 mt-1 border-l-2 border-slate-200 pl-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.key}
                    href={subItem.to}
                    onClick={closeSheet}
                    className={`group flex items-center gap-3 p-2 rounded-md text-sm ${
                      pathname === subItem.to
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="text-xs">
                      {subItem.label}
                    </div>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Link
            key={item.key}
            href={item.to || '#'}
            onClick={closeSheet}
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
            <div className="text-sm">{item.label}</div>
          </Link>
        )
      )}
    </nav>
  );
}

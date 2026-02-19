"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function StudentSidebar({ userEmail }: { userEmail?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/programs", icon: Dumbbell, label: "My Program" },
    { href: "/dashboard/programs/browse", icon: Search, label: "Browse Programs" },
    { href: "/dashboard/progress", icon: TrendingUp, label: "Progress Tracking" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = async () => {
    // We'll use a form submission or an API call to handle logout
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/auth/signout';
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-950 flex items-center justify-between px-6 z-50 border-b border-neutral-800">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Dumbbell className="text-red-600 h-6 w-6 transform -rotate-45" />
          <span className="text-xl font-black tracking-tighter text-white">
            COACH<span className="text-red-600">HUB</span>
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-neutral-950 border-r border-neutral-800 flex flex-col pt-16 md:pt-0 transform transition-all duration-300 ease-in-out",
          "md:static md:translate-x-0 md:h-screen md:min-h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "md:w-20" : "md:w-64",
          "w-64" // default mobile width
        )}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex h-20 items-center justify-between px-6 border-b border-neutral-900">
          <Link href="/dashboard" className="flex items-center">
            <Dumbbell className={cn("text-red-600 transition-all", isCollapsed ? "h-8 w-8 mx-auto -rotate-45" : "h-6 w-6 mr-3 -rotate-45")} />
            {!isCollapsed && (
              <span className="text-2xl font-black tracking-tighter text-white overflow-hidden whitespace-nowrap">
                COACH<span className="text-red-600">HUB</span>
              </span>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
              title="Collapse Sidebar"
            >
              <PanelLeftClose size={20} />
            </button>
          )}
        </div>

        {/* Collapsed Toggle Button */}
        {isCollapsed && (
          <div className="hidden md:flex justify-center p-4">
             <button
                onClick={() => setIsCollapsed(false)}
                className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                title="Expand Sidebar"
              >
                <PanelLeftOpen size={20} />
              </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                title={isCollapsed ? item.label : ""}
                className={cn(
                  "flex items-center rounded-lg transition-all group font-medium text-sm",
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/50",
                  isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3"
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    isActive
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-red-500 transition-colors",
                    !isCollapsed && "min-w-5"
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Email */}
        <div className={cn("p-4 border-t border-neutral-900 bg-neutral-950/50", isCollapsed ? "flex flex-col items-center" : "")}>
          {!isCollapsed && userEmail && (
            <div className="mb-4 px-2 overflow-hidden">
                <p className="text-xs text-neutral-500 truncate" title={userEmail}>
                    {userEmail}
                </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
            className={cn(
              "flex w-full items-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors",
              isCollapsed ? "justify-center p-3" : "px-4 py-2"
            )}
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

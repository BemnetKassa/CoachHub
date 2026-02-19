"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Database,
  Users,
  Camera,
  CreditCard,
  Dumbbell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LogoutButton } from "./logout-button";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/programs", icon: Dumbbell, label: "Programs" },
    { href: "/admin/students", icon: Users, label: "Students" },
    { href: "/admin/transformations", icon: Camera, label: "Transformations" },
    { href: "/admin/pricing", icon: CreditCard, label: "Pricing" },
    { href: "/admin/workouts", icon: Database, label: "Workouts" },
    { href: "/admin/subscriptions", icon: Settings, label: "Subscriptions" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 flex items-center justify-between px-6 z-50 border-b border-gray-800">
        <Link href="/admin" className="text-xl font-black tracking-tighter text-white">
          COACH<span className="text-red-600">HUB</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
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
          "fixed inset-y-0 left-0 z-40 bg-gray-900 border-r border-gray-800 flex flex-col pt-16 md:pt-0 transform transition-all duration-300 ease-in-out",
          "md:static md:translate-x-0 md:h-screen md:min-h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "md:w-20" : "md:w-64",
          "w-64" // default mobile width
        )}
      >
        <div className="hidden md:flex h-20 items-center justify-between px-6 border-b border-gray-800">
          {!isCollapsed && (
            <Link href="/admin" className="text-2xl font-black tracking-tighter text-white overflow-hidden whitespace-nowrap">
              COACH<span className="text-red-600">HUB</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

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
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                  isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3"
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-red-500 transition-colors",
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

        <div className={cn("p-4 border-t border-gray-800 bg-gray-900/50", isCollapsed ? "flex justify-center" : "")}>
          <LogoutButton hideLabel={isCollapsed} />
        </div>
      </aside>
    </>
  );
}

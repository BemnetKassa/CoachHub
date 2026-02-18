"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md transition-colors"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </button>
  );
}

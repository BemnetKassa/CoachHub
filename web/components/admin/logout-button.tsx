"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoutButton({ hideLabel = false }: { hideLabel?: boolean }) {
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
      title={hideLabel ? "Logout" : ""}
      className={cn(
        "flex w-full items-center text-white hover:bg-gray-700 rounded-md transition-colors",
        hideLabel ? "justify-center p-3" : "px-4 py-2"
      )}
    >
      <LogOut className={cn("h-4 w-4", !hideLabel && "mr-2")} />
      {!hideLabel && <span>Logout</span>}
    </button>
  );
}

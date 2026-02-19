import { createClient } from "@/lib/supabase/server";
import SettingsClient from "./client";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .eq("user_id", user.id)
    .order("created", { ascending: false })
    .limit(1)
    .single();

  const isActive = subscription?.status === "active" || subscription?.status === "trialing";

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-8 space-y-12">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase italic">
          SETTINGS
        </h1>
        <div className="h-1 w-20 bg-red-600 mt-4" />
        <p className="text-neutral-500 mt-4 text-sm font-medium italic">
          Manage your elite coaching experience.
        </p>
      </div>

      <SettingsClient 
        user={user} 
        profile={profile} 
        subscription={subscription} 
        isActive={isActive} 
      />
    </div>
  );
}

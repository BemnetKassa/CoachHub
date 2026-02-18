import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminPricingClient from "./client";

export default async function AdminPricingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Check if user is admin
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userError || userData?.role !== "admin") {
    return redirect("/dashboard");
  }

  const { data: plans } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("order_index", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Pricing Plans
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Manage your subscription tiers and prices.
          </p>
        </div>
      </div>

      <AdminPricingClient initialPlans={plans || []} />
    </div>
  );
}

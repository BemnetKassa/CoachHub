import { createClient } from "@/lib/supabase/server";
import { Users, LayoutList, DollarSign, Activity, Dumbbell, CreditCard } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Queries for stats
  const { count: studentCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "student");

  const { count: transformationCount } = await supabase
    .from("transformations")
    .select("*", { count: "exact", head: true });

  const { count: pricingCount } = await supabase
    .from("pricing_plans")
    .select("*", { count: "exact", head: true });

  const { count: programCount } = await supabase
    .from("programs")
    .select("*", { count: "exact", head: true });
    
  const { count: workoutCount } = await supabase
    .from("workouts")
    .select("*", { count: "exact", head: true });

  // Subscriptions count (if exists)
  const { count: subscriptionCount } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Students" 
            value={studentCount?.toString() || "0"} 
            subtext="Registered Users" 
            icon={<Users className="w-6 h-6 text-blue-500" />}
          />
          <StatsCard 
            title="Active Subscriptions" 
            value={subscriptionCount?.toString() || "0"} 
            subtext="Recurring Revenue" 
            icon={<CreditCard className="w-6 h-6 text-indigo-500" />}
          />
          <StatsCard 
            title="Workouts"
            value={workoutCount?.toString() || "0"}
            subtext="Exercise Library"
            icon={<Dumbbell className="w-6 h-6 text-red-500" />}
          />
          <StatsCard 
            title="Training Programs" 
            value={programCount?.toString() || "0"} 
            subtext="Available Courses" 
            icon={<Activity className="w-6 h-6 text-orange-500" />}
          />
          <StatsCard 
            title="Pricing Plans" 
            value={pricingCount?.toString() || "0"} 
            subtext="Tiers" 
            icon={<DollarSign className="w-6 h-6 text-green-500" />}
          />
          <StatsCard 
            title="Transformations" 
            value={transformationCount?.toString() || "0"} 
            subtext="Success Stories" 
            icon={<LayoutList className="w-6 h-6 text-purple-500" />}
          />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, subtext, icon }: { title: string, value: string, subtext: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-sm font-medium text-gray-500 truncate mb-1">{title}</h3>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="mt-1 text-xs font-medium text-gray-400">
          {subtext}
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-full">
        {icon}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { AdminWorkoutsClient } from "./client";

export default async function AdminWorkoutsPage() {
  const supabase = await createClient();

  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching workouts:", error);
    return <div>Error loading workouts</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Workouts
        </h1>
      </div>

      <AdminWorkoutsClient initialData={workouts || []} />
    </div>
  );
}

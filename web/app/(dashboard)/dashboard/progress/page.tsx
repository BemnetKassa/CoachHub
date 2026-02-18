import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudentProgressClient from "./client";

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch progress logs
  let logs = [];
  try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
        
      if (!error && data) logs = data;
  } catch (error) {
      console.error("Error fetching progress logs:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Track Progress
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Log your achievements and visualize your journey.
          </p>
        </div>
      </div>

      <StudentProgressClient initialLogs={logs} />
    </div>
  );
}

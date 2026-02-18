import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminProgramsClient from "./client";

export default async function AdminProgramsPage() {
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

  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Training Programs
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create and manage fitness programs and challenges.
          </p>
        </div>
      </div>

      <AdminProgramsClient initialPrograms={programs || []} />
    </div>
  );
}

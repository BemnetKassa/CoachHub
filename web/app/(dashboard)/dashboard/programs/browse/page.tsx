import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BrowseProgramsClient from "./client";

export default async function BrowsePage() {
  const supabase = await createClient();
  const {
      data: { user },
      } = await supabase.auth.getUser();
  
  if (!user) {
      redirect("/login");
  }
  
  // 1. Fetch User's Program ID
  let currentProgramId = null;
  const { data: userData } = await supabase
      .from("users")
      .select("current_program_id")
      .eq("id", user.id)
      .single();
  
  if (userData) {
      currentProgramId = userData.current_program_id;
  }
  
  // 2. Fetch All Programs
  const { data: programs, error } = await supabase
      .from("programs")
      .select("*")
      .order("created_at", { ascending: false });
  
  if (error) {
      console.error("Error fetching programs:", error);
      return <div>Error loading programs.</div>;
  }
  
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Explore Programs</h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">
            Choose a program that fits your goals and level. Get started today with structure and guidance.
        </p>

        <BrowseProgramsClient programs={programs || []} currentProgramId={currentProgramId} />
      </div>
  );
}

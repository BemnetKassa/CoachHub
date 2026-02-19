import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Dumbbell } from "lucide-react";
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
      console.error("Error fetching programs:", JSON.stringify(error, null, 2));
      console.error("Full Error Object:", error);
      return (
          <div className="p-8">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                      <div className="ml-3">
                          <p className="text-sm text-red-700">
                              Error loading programs: {error.message || "Unknown error"}
                              <br />
                              <span className="text-xs">{error.details || ""}</span>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
  
  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Explore Programs</h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">
            Choose a program that fits your goals and level. Get started today with structure and guidance.
        </p>

        {(!programs || programs.length === 0) ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900">No Programs Available Yet</h2>
                <p className="text-gray-500 mt-2">Check back soon or contact your coach for an invitation.</p>
            </div>
        ) : (
            <BrowseProgramsClient programs={programs || []} currentProgramId={currentProgramId} />
        )}
      </div>
  );
}

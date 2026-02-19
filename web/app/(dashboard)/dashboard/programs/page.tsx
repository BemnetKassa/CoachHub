import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import StudentProgramClient from "./client";

// Define safe types for initial null states
type Program = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  level: string;
  duration_weeks: number;
  created_at: string;
};

type Workout = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
};

type ProgramWorkout = {
  id: string;
  program_id: string;
  workout_id: string;
  week_number: number;
  day_number: number;
  created_at: string;
  workout: Workout; // Joined data
};

export default async function ProgramPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let program: Program | null = null;
  let schedule: ProgramWorkout[] = [];

  try {
    // 1. Get User's Program ID
    const { data: userData } = await supabase
      .from("users")
      .select("current_program_id")
      .eq("id", user.id)
      .single();

    if (userData?.current_program_id) {
      // 2. Fetch Program Details
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("*")
        .eq("id", userData.current_program_id)
        .single();
      
      if (!programError && programData) {
        program = programData as Program;

        // 3. Fetch Schedule with Workouts
        const { data: scheduleData, error: scheduleError } = await supabase
          .from("program_workouts")
          .select(`
            id,
            program_id,
            workout_id,
            week_number,
            day_number,
            created_at,
            workout:workouts (
              id,
              title,
              description,
              video_url,
              duration_minutes,
              difficulty,
              category
            )
          `)
          .eq("program_id", userData.current_program_id)
          .order("week_number", { ascending: true })
          .order("day_number", { ascending: true });

        if (!scheduleError && scheduleData) {
          schedule = scheduleData as any; // Type assertion needed for complex join
        }
      }
    }
  } catch (error) {
    console.error("Error fetching program:", error);
  }

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Program</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          You haven't been assigned a program yet. Select one from the available programs to start your journey.
        </p>
        <div className="flex gap-4">
            <a 
            href="/dashboard/programs/browse" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
            Browse Programs
            </a>
            <a 
            href="/dashboard/settings" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
            Settings
            </a>
        </div>
      </div>
    );
  }

  return <StudentProgramClient program={program} schedule={schedule} />;
}

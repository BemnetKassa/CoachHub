import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProgramBuilderClient from "./client";

export default async function ProgramBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch Program
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("id", id)
    .single();

  if (!program) {
    return <div>Program not found</div>;
  }

  // Fetch all available workouts
  const { data: allWorkouts } = await supabase
    .from("workouts")
    .select("*")
    .order("title");

  // Fetch existing schedule
  const { data: schedule } = await supabase
    .from("program_workouts")
    .select("*, workout:workouts(*)")
    .eq("program_id", id)
    .order("week_number")
    .order("day_number");

  return (
    <ProgramBuilderClient
      program={program}
      allWorkouts={allWorkouts || []}
      initialSchedule={schedule || []}
    />
  );
}

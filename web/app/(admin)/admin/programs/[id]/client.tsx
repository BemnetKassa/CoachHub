"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { Plus, X, Trash2, Calendar, Dumbbell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Type definitions
type Program = {
  id: string;
  title: string;
  duration_weeks: number;
};

type Workout = {
  id: string;
  title: string;
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
  workout: Workout;
};

export default function ProgramBuilderClient({
  program,
  allWorkouts,
  initialSchedule,
}: {
  program: Program;
  allWorkouts: Workout[];
  initialSchedule: ProgramWorkout[];
}) {
  const [schedule, setSchedule] = useState<ProgramWorkout[]>(initialSchedule);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [addingWorkout, setAddingWorkout] = useState<number | null>(null); // day_number for adding
  const [addingDay, setAddingDay] = useState(1);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleAddWorkout = async () => {
    if (!selectedWorkoutId || addingDay < 1) return;

    try {
      const workoutToAdd = allWorkouts.find((w) => w.id === selectedWorkoutId);
      if (!workoutToAdd) return;

      const newEntry = {
        program_id: program.id,
        workout_id: selectedWorkoutId,
        week_number: selectedWeek,
        day_number: addingDay,
      };

      const { data, error } = await supabase
        .from("program_workouts")
        .insert([newEntry])
        .select("*, workout:workouts(*)")
        .single();

      if (error) throw error;

      if (data) {
        setSchedule([...schedule, data as unknown as ProgramWorkout]);
        setAddingWorkout(null);
        setSelectedWorkoutId("");
      }

      router.refresh();
    } catch (error: any) {
      console.error("Error adding workout:", error);
      alert("Failed to add workout: " + error.message);
    }
  };

  const handleRemoveWorkout = async (id: string) => {
    if (!confirm("Remove workout from schedule?")) return;
    try {
      const { error } = await supabase
        .from("program_workouts")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setSchedule(schedule.filter((s) => s.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error removing workout:", error);
    }
  };

  const getWorkoutsForWeek = (week: number) => {
    return schedule.filter((s) => s.week_number === week);
  };

  const workoutsByDay = (weekWorkouts: ProgramWorkout[]) => {
      const grouped: Record<number, ProgramWorkout[]> = {};
      weekWorkouts.forEach(s => {
          if (!grouped[s.day_number]) grouped[s.day_number] = [];
          grouped[s.day_number].push(s);
          // Sort by time or order if applicable
      });
      return grouped;
  }

  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/programs"
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Program Builder</h1>
          <p className="text-gray-500">{program.title} • {program.duration_weeks} Weeks</p>
        </div>
      </div>

      {/* Week Selector */}
      <div className="flex gap-2 overflow-x-auto pb-4">
        {Array.from({ length: program.duration_weeks }, (_, i) => i + 1).map((week) => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedWeek === week
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Week {week}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Week {selectedWeek} Schedule</h2>
          </div>

          <div className="divide-y divide-gray-100">
              {days.map((day) => {
                  const dayWorkouts = getWorkoutsForWeek(selectedWeek).filter(s => s.day_number === day);
                  const isAdding = addingWorkout === day;

                  return (
                      <div key={day} className="p-6 hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-start gap-4">
                              <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shrink-0">
                                  <span className="text-xs font-bold text-gray-500 uppercase">Day</span>
                                  <span className="text-xl font-bold text-gray-900 leading-none">{day}</span>
                              </div>
                              
                              <div className="flex-1 space-y-4">
                                  {/* Existing Workouts */}
                                  {dayWorkouts.length > 0 ? (
                                      <div className="space-y-3">
                                          {dayWorkouts.map((entry) => (
                                              <div key={entry.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                  <div className="flex items-center gap-3">
                                                      <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                                          <Dumbbell className="w-5 h-5" />
                                                      </div>
                                                      <div>
                                                          <h4 className="font-semibold text-gray-900">{entry.workout.title}</h4>
                                                          <p className="text-xs text-gray-500">
                                                              {entry.workout.duration_minutes} min • {entry.workout.difficulty} • {entry.workout.category}
                                                          </p>
                                                      </div>
                                                  </div>
                                                  <button 
                                                      onClick={() => handleRemoveWorkout(entry.id)}
                                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  >
                                                      <Trash2 className="w-4 h-4" />
                                                  </button>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      !isAdding && (
                                          <div className="text-sm text-gray-400 italic py-2">Rest Day</div>
                                      )
                                  )}

                                  {/* Add Workout Form */}
                                  {isAdding ? (
                                      <div className="bg-gray-50 p-4 rounded-lg flex gap-2 items-center border border-gray-200 animate-in fade-in slide-in-from-top-2">
                                          <select
                                              value={selectedWorkoutId}
                                              onChange={(e) => setSelectedWorkoutId(e.target.value)}
                                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          >
                                              <option value="">Select a workout...</option>
                                              {allWorkouts.map((w) => (
                                                  <option key={w.id} value={w.id}>
                                                      {w.title} ({w.duration_minutes} min)
                                                  </option>
                                              ))}
                                          </select>
                                          <button
                                              onClick={() => { setAddingDay(day); handleAddWorkout(); }}
                                              disabled={!selectedWorkoutId}
                                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                                          >
                                              Add
                                          </button>
                                          <button
                                              onClick={() => setAddingWorkout(null)}
                                              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md"
                                          >
                                              <X className="w-5 h-5" />
                                          </button>
                                      </div>
                                  ) : (
                                      <button
                                          onClick={() => { setAddingWorkout(day); setAddingDay(day); }}
                                          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                      >
                                          <Plus className="w-4 h-4 mr-1" /> Add Workout
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
}

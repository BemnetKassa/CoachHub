"use client";

import { useState } from "react";
import { Dumbbell, Clock, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

type Workout = {
  id: string;
  title: string;
  duration_minutes: number;
  difficulty: string;
  category: string;
};

type ProgramWorkout = {
  id: string;
  week_number: number;
  day_number: number;
  workout: Workout;
};

type Program = {
  id: string;
  title: string;
  description: string;
  duration_weeks: number;
  level: string;
};

export default function StudentProgramClient({
  program,
  schedule,
}: {
  program: Program;
  schedule: ProgramWorkout[];
}) {
  const [expandedWeek, setExpandedWeek] = useState<number>(1);

  // Group workouts by week
  const weeks = Array.from({ length: program.duration_weeks }, (_, i) => i + 1);

  const getWorkoutsForWeek = (week: number) => {
    return schedule
      .filter((s) => s.week_number === week)
      .sort((a, b) => a.day_number - b.day_number);
  };

  return (
    <div className="space-y-6">
      {/* Program Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{program.title}</h1>
            <p className="text-gray-600 mt-2">{program.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {program.duration_weeks} Weeks
              </span>
              <span className="flex items-center capitalize">
                <Dumbbell className="w-4 h-4 mr-1" /> {program.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {weeks.map((week) => {
          const isExpanded = expandedWeek === week;
          const weekWorkouts = getWorkoutsForWeek(week);

          return (
            <div
              key={week}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedWeek(isExpanded ? 0 : week)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Week {week}
                </h3>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-gray-100">
                      {weekWorkouts.length > 0 ? (
                        <div className="space-y-3 mt-4">
                          {weekWorkouts.map((pw) => (
                            <div
                              key={pw.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                  D{pw.day_number}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {pw.workout?.title || "Workout"}
                                  </h4>
                                  <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                                    <span>{pw.workout?.duration_minutes} min</span>
                                    <span>•</span>
                                    <span className="capitalize">
                                      {pw.workout?.difficulty}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                                <PlayCircle className="w-4 h-4 mr-1.5" /> Start
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-400 italic">
                          No workouts scheduled for this week.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

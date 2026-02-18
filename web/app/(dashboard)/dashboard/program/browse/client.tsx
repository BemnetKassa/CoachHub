"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Check, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

type Program = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  level: string;
  duration_weeks: number;
};

export default function BrowseProgramsClient({
  programs,
  currentProgramId,
}: {
  programs: Program[];
  currentProgramId: string | null;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleStartProgram = async (programId: string) => {
    setLoadingId(programId);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase
        .from("users")
        .update({ current_program_id: programId })
        .eq("id", user.id);

      if (error) throw error;

      router.refresh();
      router.push("/dashboard/program");
    } catch (error: any) {
      console.error("Error starting program:", error);
      alert("Failed to start program. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => {
        const isCurrent = currentProgramId === program.id;
        
        return (
          <div
            key={program.id}
            className={`bg-white rounded-xl overflow-hidden shadow-sm border transition-all ${isCurrent ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200 hover:shadow-md'}`}
          >
            <div className="relative h-48 bg-gray-100">
              {program.image_url ? (
                <Image
                  src={program.image_url}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
                  <span className="text-4xl font-light opacity-30">Gym</span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 uppercase tracking-wide shadow-sm">
                      {program.level}
                  </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{program.description || "No description."}</p>

              <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                  {program.duration_weeks} Weeks
                </div>
              </div>

              <button
                onClick={() => handleStartProgram(program.id)}
                disabled={loadingId === program.id || isCurrent}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
                    isCurrent 
                    ? 'bg-green-50 text-green-700 cursor-default border border-green-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'
                }`}
              >
                {loadingId === program.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : isCurrent ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Active Program
                  </>
                ) : (
                  <>
                    Start Program <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

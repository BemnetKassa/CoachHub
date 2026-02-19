import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Dumbbell, TrendingUp, Calendar, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Fetch User's Program
  let currentProgram = null;
  // Use maybeSingle to safely handle if column is missing or data is missing
  try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('current_program_id, programs(*)')
        .eq('id', user.id)
        .single();
      
      if (!error && userData?.programs) {
        currentProgram = userData.programs;
      }
  } catch (error) {
      console.error("Error fetching program:", error);
  }

  // 2. Fetch Recent Progress
  let progressLogs: any[] = [];
  try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("weight, date")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(3);
      if (!error && data) progressLogs = data;
  } catch (error) {
      console.error("Error fetching progress:", error);
  }
    
  // 3. Fetch Completed Workouts Count
  let completedWorkouts = 0;
  try {
      const { count, error } = await supabase
        .from("user_workout_logs")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id);
      if (!error && count) completedWorkouts = count;
  } catch (error) {
      console.error("Error fetching logs:", error);
  }
  
  const currentWeight = progressLogs && progressLogs.length > 0 ? progressLogs[0].weight : "N/A";

  // Dummy stats for now
  const streak = "3"; // Calculate this later based on logs

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.user_metadata?.full_name || "Athlete"}!
          </h1>
          <p className="text-gray-500 mt-1">Here's your activity overview.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            href="/dashboard/programs" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go to Workout <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Current Weight" 
          value={currentWeight !== "N/A" ? `${currentWeight} kg` : "N/A"} 
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          trend="Last updated"
        />
        <StatsCard 
          title="Workouts Done" 
          value={completedWorkouts.toString()} 
          icon={<Dumbbell className="w-5 h-5 text-blue-500" />}
          trend="Total completed"
        />
        <StatsCard 
          title="Active Program" 
          value={currentProgram ? (currentProgram as any).title : "None"} 
          icon={<Calendar className="w-5 h-5 text-purple-500" />}
          trend={currentProgram ? "In progress" : "No active plan"}
        />
        <StatsCard 
          title="Streak" 
          value={`${streak} Days`} 
          icon={<Trophy className="w-5 h-5 text-orange-500" />}
          trend="Current streak"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Workout Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Next Up</h3>
            <Link href="/dashboard/programs" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Full Plan</Link>
          </div>

          {currentProgram ? (
            <div className="border border-gray-100 rounded-lg p-5 bg-gray-50">
               <div className="flex items-center gap-4">
                 <div className="bg-blue-100 p-4 rounded-full">
                   <Dumbbell className="w-8 h-8 text-blue-600" />
                 </div>
                 <div>
                   <h4 className="text-lg font-semibold text-gray-900">Today's Session</h4>
                   <p className="text-sm text-gray-500">45 mins • Strength • Intermediate</p>
                 </div>
               </div>
               <div className="mt-6 flex gap-3">
                 <Link href="/dashboard/programs" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 text-center transition-colors shadow-sm">
                    Start Workout
                 </Link>
               </div>
            </div>
          ) : (
             <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
               <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
               <p className="text-gray-500 font-medium">No active program found.</p>
               <p className="text-sm text-gray-400 mb-4">Select a program to get started.</p>
               <Link href="/dashboard/settings" className="mt-2 text-blue-600 hover:text-blue-700 font-medium">Select a program</Link>
             </div>
          )}
        </div>

        {/* Recent Activity / Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">History</h3>
            <Link href="/dashboard/progress" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</Link>
          </div>
          
          {progressLogs && progressLogs.length > 0 ? (
            <div className="space-y-3">
               {progressLogs.map((log: any, i: number) => (
                 <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Weight Check-in</p>
                        <p className="text-xs text-gray-500">{format(new Date(log.date), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-700 text-sm">{log.weight} kg</span>
                 </div>
               ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
               <p className="text-sm">No progress logged yet.</p>
               <Link href="/dashboard/progress" className="mt-2 text-sm text-blue-600 hover:underline block">Log your first check-in</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-400 font-medium">{trend}</p>
    </div>
  );
}

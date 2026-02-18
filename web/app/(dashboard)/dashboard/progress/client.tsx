"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, Save, Trash2, Camera } from "lucide-react";
import { format } from "date-fns";

type ProgressLog = {
  id: string;
  date: string;
  weight: number;
  body_fat_percentage?: number;
  notes?: string;
};

export default function StudentProgressClient({
  initialLogs,
}: {
  initialLogs: ProgressLog[];
}) {
  const [logs, setLogs] = useState<ProgressLog[]>(initialLogs);
  const [formData, setFormData] = useState({
    weight: "",
    bodyFat: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not authenticated");

      const newLog = {
        user_id: user.user.id,
        date: formData.date,
        weight: parseFloat(formData.weight),
        body_fat_percentage: formData.bodyFat ? parseFloat(formData.bodyFat) : null,
        notes: formData.notes,
      };

      const { error } = await supabase.from("user_progress").insert([newLog]);

      if (error) throw error;

      setFormData({
        weight: "",
        bodyFat: "",
        notes: "",
        date: new Date().toISOString().split("T")[0],
      });
      router.refresh();
      
      // Optimistic update or refetch
      const { data: updatedLogs } = await supabase
        .from("user_progress")
        .select("*")
        .order("date", { ascending: true });
        
      if (updatedLogs) setLogs(updatedLogs as unknown as ProgressLog[]);

    } catch (error: any) {
      console.error("Error saving progress:", error);
      alert("Failed to save progress.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from("user_progress").delete().eq("id", id);
      if (error) throw error;
      setLogs(logs.filter((l) => l.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  // Prepare chart data (sort by date)
  const chartData = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(log => ({
    date: format(new Date(log.date), 'MMM d'),
    weight: log.weight
  }));

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Log Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Log Check-in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                required
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  required
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body Fat %
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional"
                  value={formData.bodyFat}
                  onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How are you feeling?"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* Photo Upload Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-50 transition-colors cursor-not-allowed opacity-60 relative group">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 font-medium">Upload Photos</p>
                <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Charts & History */}
      <div className="lg:col-span-2 space-y-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Weight Trend</h3>
           {chartData.length > 1 ? (
             <div className="h-75 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                   <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
                   <XAxis 
                     dataKey="date" 
                     stroke="#9ca3af" 
                     fontSize={12} 
                     tickLine={false} 
                     axisLine={false}
                   />
                   <YAxis 
                     stroke="#9ca3af" 
                     fontSize={12} 
                     tickLine={false} 
                     axisLine={false}
                     domain={['auto', 'auto']}
                   />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                   />
                   <Line 
                     type="monotone" 
                     dataKey="weight" 
                     stroke="#2563eb" 
                     strokeWidth={3} 
                     dot={{ fill: '#2563eb', r: 4, strokeWidth: 0 }} 
                     activeDot={{ r: 6, strokeWidth: 0 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           ) : (
             <div className="h-75 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
               Need at least 2 entries to show trend
             </div>
           )}
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">History</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-700 w-12 h-12 rounded-lg flex flex-col items-center justify-center border border-blue-100">
                       <span className="text-xs font-bold uppercase">{format(new Date(log.date), 'MMM')}</span>
                       <span className="text-lg font-bold leading-none">{format(new Date(log.date), 'd')}</span>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                         <span className="font-bold text-gray-900">{log.weight} kg</span>
                         {log.body_fat_percentage && (
                           <span className="text-sm text-gray-500">• {log.body_fat_percentage}% BF</span>
                         )}
                      </div>
                      {log.notes && (
                        <p className="text-sm text-gray-500 mt-0.5 max-w-50 sm:max-w-md truncate">{log.notes}</p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(log.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No entries yet. Start logging your progress above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

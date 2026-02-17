import { createClient } from '@/lib/supabase/server';
import { Users, LayoutList, DollarSign, Activity } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { count: studentCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: transformationCount } = await supabase
    .from('transformations')
    .select('*', { count: 'exact', head: true });

  const { count: pricingCount } = await supabase
    .from('pricing_plans')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatsCard 
          title="Total Students" 
          value={studentCount?.toString() || '0'} 
          change="Live" 
          icon={<Users className="text-blue-500" />}
        />
        <StatsCard 
          title="Transformations" 
          value={transformationCount?.toString() || '0'} 
          change="Published" 
          icon={<LayoutList className="text-purple-500" />}
        />
        <StatsCard 
          title="Pricing Plans" 
          value={pricingCount?.toString() || '0'} 
          change="Active" 
          icon={<DollarSign className="text-green-500" />}
        />
        <StatsCard 
          title="Programs" 
          value="-" 
          change="Coming Soon" 
          icon={<Activity className="text-orange-500" />}
        />
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-500 truncate">{title}</h3>
                <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
                <div className={`mt-2 text-xs font-medium text-gray-400`}>
                    {change}
                </div>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
                {icon}
            </div>
        </div>
    );
}

// Remove old exports if any

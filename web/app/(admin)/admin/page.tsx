export default function AdminDashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatsCard title="Total Students" value="42" change="+12%" />
        <StatsCard title="Active Programs" value="5" change="+0%" />
        <StatsCard title="Revenue (Mo)" value="$4,158" change="+8.2%" />
        <StatsCard title="New Signups" value="8" change="+2" />
      </div>
    </div>
  )
}

function StatsCard({ title, value, change }: { title: string, value: string, change: string }) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 truncate">{title}</h3>
            <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
            <div className={`mt-2 text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change} from last month
            </div>
        </div>
    )
}

export default function Dashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
      <p className="mb-4">Here you can view your programs, track your progress, and more.</p>
      
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <DashboardCard 
          title="Current Program" 
          description="View your active workout plan"
          link="/dashboard/program"
          color="bg-blue-500"
        />
        <DashboardCard 
          title="Log Progress" 
          description="Update your weight and photos"
          link="/dashboard/progress"
          color="bg-green-500"
        />
        <DashboardCard 
          title="Nutrition" 
          description="See your meal plan"
          link="/dashboard/nutrition"
          color="bg-orange-500"
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, description, link, color }: { title: string, description: string, link: string, color: string }) {
    return (
        <a href={link} className={`block p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-white ${color}`}>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="opacity-90">{description}</p>
        </a>
    )
}

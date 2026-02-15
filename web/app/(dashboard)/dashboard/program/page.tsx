export default function ProgramPage() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Your Current Program</h1>
      
      <div className="border border-gray-200 rounded-md p-4">
        <h2 className="text-lg font-semibold mb-2">12-Week Transformation - Week 1</h2>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Day 1: Chest & Triceps</span>
            <button className="text-indigo-600 hover:text-indigo-800">Start Workout</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Day 2: Back & Biceps</span>
            <button className="text-indigo-600 hover:text-indigo-800">View</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Day 3: Legs & Shoulders</span>
            <button className="text-indigo-600 hover:text-indigo-800">View</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgramsPage() {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Training Programs</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
          Create New Program
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Students</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">12-Week Transformation</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Intermediate</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$99/mo</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a></td>
            </tr>
             <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fat Loss Blueprint</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Beginner</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$99/mo</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

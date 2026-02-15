export default function ProgressPage() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Track Your Progress</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Log New Check-in</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Weight (kg)</label>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="80.5" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Body Fat % (Optional)</label>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="15" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progress Photos</label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload photo</span></p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">
              Save Progress
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">History</h2>
          {/* Chart placeholder */}
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 mb-6">
            Weight Chart
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Feb 14, 2026</span>
                <span className="font-medium">80.2 kg</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Feb 07, 2026</span>
                <span className="font-medium">81.0 kg</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

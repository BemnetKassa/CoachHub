import Link from 'next/link';

export default function ProgramsPage() {
const programs = [
    {
      id: '1',
      title: '12-Week Transformation',
      description: 'The ultimate guide to transforming your body in 12 weeks.',
      level: 'Intermediate',
      price: '$99/month',
    },
    {
      id: '2',
      title: 'Muscle Gain Program',
      description: 'Focus on building lean muscle mass with scientifically backed methods.',
      level: 'Advanced',
      price: '$99/month',
    },
    {
      id: '3',
      title: 'Fat Loss Blueprint',
      description: 'Shed body fat while maintaining muscle.',
      level: 'All Levels',
      price: '$99/month',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Our Programs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs font-semibold tracking-wide text-indigo-500 uppercase bg-indigo-50 rounded-full mb-2">
                  {program.level}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h2>
                <p className="text-gray-500 mb-4">{program.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{program.price}</span>
                  <Link
                    href={`/programs/${program.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

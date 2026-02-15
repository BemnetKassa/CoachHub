import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 text-white flex items-center min-h-[80vh]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80"
            alt="Training"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Transform Your Body,<br />
            Transform Your Life
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10">
            Professional bodybuilding coaching tailored to your goals. Join thousands who have changed their lives.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose CoachHub?</h2>
            <p className="mt-4 text-lg text-gray-500">Everything you need to succeed in your fitness journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Personalized Plans"
              description="Custom workout and nutrition plans designed specifically for your body type and goals."
              icon="📋"
            />
            <FeatureCard
              title="Progress Tracking"
              description="Visualize your transformation with weekly check-ins, photo uploads, and weight tracking."
              icon="📈"
            />
            <FeatureCard
              title="Expert Guidance"
              description="Direct access to professional coaching advice and community support."
              icon="🤝"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

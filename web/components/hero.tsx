export default function Hero() {
	return (
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
					<a
						href="/register"
						className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-colors"
					>
						Start Your Journey
					</a>
					<a
						href="/programs"
						className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
					>
						View Programs
					</a>
				</div>
			</div>
		</section>
	);
}

export default function About() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-5xl mx-auto px-4 text-center">
				<h2 className="text-3xl font-extrabold text-gray-900 mb-4">About CoachHub</h2>
				<p className="text-lg text-gray-600 mb-6">
					CoachHub is Ethiopia's leading online bodybuilding coaching platform, empowering athletes and everyday people to achieve their fitness goals. Our programs are designed by top coaches and tailored to your unique needs.
				</p>
				<div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
					<div className="flex-1 bg-white p-6 rounded-lg shadow">
						<h3 className="text-xl font-bold mb-2">Personalized Plans</h3>
						<p className="text-gray-500">Every client receives a custom workout and nutrition plan based on their goals and lifestyle.</p>
					</div>
					<div className="flex-1 bg-white p-6 rounded-lg shadow">
						<h3 className="text-xl font-bold mb-2">Expert Support</h3>
						<p className="text-gray-500">Get direct access to your coach for feedback, motivation, and accountability every step of the way.</p>
					</div>
				</div>
			</div>
		</section>
	);
}

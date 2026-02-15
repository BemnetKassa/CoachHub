export default function Testimony() {
	return (
		<section className="py-20 bg-white">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Transformations & Testimonials</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-gray-50 p-6 rounded-lg shadow">
						<p className="text-gray-700 mb-4">“CoachHub changed my life! I lost 15kg and gained confidence I never thought possible.”</p>
						<div className="flex items-center">
							<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="w-12 h-12 rounded-full mr-3" />
							<div>
								<div className="font-bold">Abel T.</div>
								<div className="text-xs text-gray-500">Addis Ababa</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 p-6 rounded-lg shadow">
						<p className="text-gray-700 mb-4">“The personalized plans and weekly check-ins kept me motivated. Highly recommend!”</p>
						<div className="flex items-center">
							<img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" className="w-12 h-12 rounded-full mr-3" />
							<div>
								<div className="font-bold">Mimi G.</div>
								<div className="text-xs text-gray-500">Bahir Dar</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 p-6 rounded-lg shadow">
						<p className="text-gray-700 mb-4">“I never thought online coaching could be this effective. The results speak for themselves.”</p>
						<div className="flex items-center">
							<img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Client" className="w-12 h-12 rounded-full mr-3" />
							<div>
								<div className="font-bold">Samuel K.</div>
								<div className="text-xs text-gray-500">Hawassa</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function Contact() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-3xl mx-auto px-4">
				<h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Contact Us</h2>
				<form className="bg-white p-8 rounded-lg shadow space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
						<input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="Your Name" />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input type="email" className="w-full border border-gray-300 rounded-md p-2" placeholder="you@email.com" />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
						<textarea className="w-full border border-gray-300 rounded-md p-2" rows={4} placeholder="How can we help?" />
					</div>
					<button type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700">Send Message</button>
				</form>
				<div className="text-center text-gray-500 mt-8">
					Or email us at <a href="mailto:info@coachhub.et" className="text-indigo-600">info@coachhub.et</a>
				</div>
			</div>
		</section>
	);
}

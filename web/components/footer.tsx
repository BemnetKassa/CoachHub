export default function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200">
			<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
				<div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} CoachHub. All rights reserved.</div>
				<div className="flex space-x-4 mt-4 md:mt-0">
					<a href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
					<a href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
				</div>
			</div>
		</footer>
	);
}

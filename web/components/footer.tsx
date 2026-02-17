import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 md:py-16 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
             <div className="font-black text-2xl text-white tracking-tighter">
                COACH<span className="text-red-600">HUB</span>
             </div>
             <p className="text-sm">
               Forging elite physiques with Sofonias Nebiyu through science, intensity, and unwavering commitment.
             </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs" className="hover:text-red-600 transition-colors">12-Week Transformation</Link></li>
              <li><Link href="/programs" className="hover:text-red-600 transition-colors">Competition Prep</Link></li>
              <li><Link href="/programs" className="hover:text-red-600 transition-colors">Lifestyle Coaching</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Sofonias</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Newsletter</h4>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-neutral-900 border border-neutral-800 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
              />
              <button className="bg-white text-black font-bold text-sm uppercase px-4 py-2 hover:bg-neutral-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>&copy; {new Date().getFullYear()} CoachHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

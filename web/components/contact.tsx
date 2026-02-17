'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="bg-neutral-900 py-24 md:py-32 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-neutral-950 p-6 md:p-12 rounded-xl border border-neutral-800 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-red-600/5 rounded-full blur-3xl -z-10" />

          <h2 className="text-2xl md:text-4xl font-black text-white mb-2 text-center uppercase">
            READY TO <span className="text-red-600">START?</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 text-center mb-8 md:mb-10 max-w-xl mx-auto">
            Fill out the form below to get in touch about coaching. I'll get back to you within 24 hours.
          </p>

          <form className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-bold text-neutral-300 uppercase tracking-wide">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-sm md:text-base text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Your Full Name"
                />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-bold text-neutral-300 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-sm md:text-base text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-bold text-neutral-300 uppercase tracking-wide">Goals</label>
              <select className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors appearance-none">
                <option value="" disabled selected>Select Your Goal</option>
                <option value="fat_loss">Fat Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="competition_prep">Competition Prep</option>
                <option value="strength">Strength & Conditioning</option>
              </select>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-bold text-neutral-300 uppercase tracking-wide">Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-sm md:text-base text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                placeholder="Tell us about yourself and what you're looking to achieve..."
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 rounded-md uppercase tracking-widest transition-all hover:scale-[1.01] shadow-lg shadow-red-900/20 text-sm md:text-base"
            >
              Send Application
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

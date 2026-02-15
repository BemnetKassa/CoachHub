'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Users, Trophy } from 'lucide-react';

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="bg-neutral-900 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-bold uppercase tracking-wider text-sm mb-2 block">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            BUILT DIFFERENT
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-400">
            CoachHub isn't just a platform; it's a commitment to excellence. We combine science-based training with the raw intensity of bodybuilding to forge elite physiques.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={item} className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-red-600 transition-colors group">
            <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
              <Dumbbell className="text-red-600 group-hover:text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Custom Programming</h3>
            <p className="text-neutral-400 leading-relaxed">
              No cookie-cutter plans. Every workout is tailored to your unique biomechanics, goals, and schedule for maximum efficiency.
            </p>
          </motion.div>

          <motion.div variants={item} className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-yellow-500 transition-colors group">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
              <Users className="text-yellow-500 group-hover:text-black" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Elite Community</h3>
            <p className="text-neutral-400 leading-relaxed">
              Join a brotherhood of like-minded individuals pushing past their limits. Iron sharpens iron.
            </p>
          </motion.div>

          <motion.div variants={item} className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-red-600 transition-colors group">
            <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
              <Trophy className="text-red-600 group-hover:text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Proven Results</h3>
            <p className="text-neutral-400 leading-relaxed">
              Decades of combined experience and hundreds of successful transformations back our methodology.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/40 z-10" />
        <img
          src="/pictures/sofi1.png"
          alt="Sofonias Nebiyu Training"
          className="w-full h-full object-cover opacity-60 object-top"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-600 font-bold tracking-widest text-sm md:text-base mb-4 block uppercase">
            Sofonias Nebiyu • Elite Performance Coach
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-6">
            UNLEASH YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
              TRUE POTENTIAL
            </span>
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
            I don't just build bodies; I build mindsets. Join my elite coaching program and let's sculpt the best version of you together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/register" 
              className="group relative px-8 py-4 bg-red-600 text-white font-bold text-lg tracking-wide overflow-hidden rounded-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                START TRAINING <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
            
            <Link 
              href="/programs" 
              className="px-8 py-4 border border-neutral-700 text-white font-bold text-lg tracking-wide hover:bg-neutral-800 transition-colors rounded-sm flex items-center justify-center"
            >
              VIEW PROGRAMS
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-neutral-800 pt-8"
        >
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">500+</div>
            <div className="text-sm text-neutral-500 font-bold uppercase tracking-wider">Clients Transformed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">10+</div>
            <div className="text-sm text-neutral-500 font-bold uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">100%</div>
            <div className="text-sm text-neutral-500 font-bold uppercase tracking-wider">Commitment</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

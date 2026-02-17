'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/40 z-10" />
        <img
          src="/pictures/sofi1.png"
          alt="Sofonias Nebiyu Training"
          className="w-full h-full object-cover opacity-60 object-top"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start pt-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <span className="text-red-600 font-bold tracking-widest text-xs md:text-sm lg:text-base mb-2 md:mb-4 block uppercase">
            Sofonias Nebiyu • Elite Performance Coach
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-4 md:mb-6">
            UNLEASH YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
              TRUE POTENTIAL
            </span>
          </h1>
          <p className="max-w-xl text-base sm:text-lg md:text-xl text-neutral-400 mb-8 md:mb-10 leading-relaxed">
            I don't just build bodies; I build mindsets. Join my elite coaching program and let's sculpt the best version of you together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/register" 
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-red-600 text-white font-bold text-base md:text-lg tracking-wide overflow-hidden rounded-sm text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                START TRAINING <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
            
            <Link 
              href="/programs" 
              className="px-6 py-3 md:px-8 md:py-4 border border-neutral-700 text-white font-bold text-base md:text-lg tracking-wide hover:bg-neutral-800 transition-colors rounded-sm flex items-center justify-center text-center"
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
          className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 border-t border-neutral-800 pt-8 w-full"
        >
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white">500+</div>
            <div className="text-xs md:text-sm text-neutral-500 font-bold uppercase tracking-wider">Clients Transformed</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white">10+</div>
            <div className="text-xs md:text-sm text-neutral-500 font-bold uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="text-center md:text-left col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white">100%</div>
            <div className="text-xs md:text-sm text-neutral-500 font-bold uppercase tracking-wider">Commitment</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

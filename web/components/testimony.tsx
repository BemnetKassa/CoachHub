'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimony() {
  const testimonials = [
    {
      name: "Abel T.",
      role: "Competitor",
      location: "Addis Ababa",
      text: "Sofonias changed my life! I lost 15kg and gained confidence specifically for my first show.",
      stars: 5,
    },
    {
      name: "Mimi G.",
      role: "Lifestyle Client",
      location: "Bahir Dar",
      text: "The personalized plans and weekly check-ins with Sofonias kept me motivated. Highly recommend.",
      stars: 5,
    },
    {
      name: "Samuel K.",
      role: "Athlete",
      location: "Hawassa",
      text: "I never thought online coaching could be this effective. The results speak for themselves.",
      stars: 5,
    },
  ];

  return (
    <section className="bg-neutral-950 py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950 z-0 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Real <span className="text-red-600">Results</span>
          </h2>
          <p className="text-lg text-neutral-400">Whatever your goal, I have a track record of success.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-neutral-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-neutral-800 shadow-xl hover:shadow-2xl hover:border-yellow-500/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4 md:mb-6 text-yellow-500">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} className="md:w-[18px] md:h-[18px]" />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl text-white font-medium mb-6 md:mb-8 leading-relaxed">
                "{t.text}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-neutral-500 mr-3 md:mr-4 border border-neutral-700 text-sm md:text-base">
                   {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white tracking-wide text-sm md:text-base">{t.name}</div>
                  <div className="text-xs md:text-sm text-neutral-500 font-medium">{t.role} • {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

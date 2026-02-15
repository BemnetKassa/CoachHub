'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const transformations = [
  {
    before: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80',
    name: "Michael R.",
    achievement: "Lost 45lbs Fat, Gained 10lbs Muscle",
    quote: "The discipline required was insane, but the results speak for themselves. CoachHub guided me every step of the way.",
    program: "12-Week Transformation"
  },
  {
    before: 'https://images.unsplash.com/photo-1616279967983-ec413476e824?auto=format&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80',
    name: "Sarah J.",
    achievement: "Competition Ready Physique",
    quote: "Prep is never easy, but having a coach who understands the science made all the difference. Placed 1st in my show.",
    program: "Competition Prep"
  },
  {
    before: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80',
    after: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80',
    name: "David K.",
    achievement: "Full Body Recomposition",
    quote: "I was stuck at a plateau for 3 years. 12 weeks with CoachHub and I'm in the best shape of my life.",
    program: "Muscle Gain Blueprint"
  }
];

export default function Transformations() {
  return (
    <section className="bg-neutral-950 py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3 block">
            Proven Results
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Galleries</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-400">
            Real people. Real work. Real results. No shortcuts, just pure dedication and expert coaching.
          </p>
        </motion.div>

        <div className="space-y-32">
          {transformations.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                
                {/* Images Container */}
                <div className="flex-1 relative w-full group">
                  <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider block text-center">Before</span>
                       <div className="aspect-[3/4] overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-500">
                          <img 
                            src={item.before} 
                            alt={`Before transformation of ${item.name}`} 
                            className="w-full h-full object-cover" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <span className="text-red-600 text-xs font-bold uppercase tracking-wider block text-center">After</span>
                       <div className="aspect-[3/4] overflow-hidden rounded-lg border-2 border-red-600 shadow-2xl shadow-red-900/40">
                          <img 
                            src={item.after} 
                            alt={`After transformation of ${item.name}`} 
                            className="w-full h-full object-cover" 
                          />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">{item.name}</h2>
                    <p className="text-red-500 font-bold text-lg uppercase tracking-wide">{item.achievement}</p>
                  </div>
                  
                  <blockquote className="text-neutral-300 text-xl leading-relaxed italic border-l-4 border-neutral-800 pl-6 py-2">
                    "{item.quote}"
                  </blockquote>

                  <div className="pt-4">
                     <span className="text-neutral-500 text-sm font-bold uppercase">Program:</span>
                     <span className="text-white ml-2 font-medium">{item.program}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

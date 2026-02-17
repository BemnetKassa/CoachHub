'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Programs() {
  const programs = [
    {
      id: '1',
      title: '12-Week Transformation',
      description: 'The ultimate guide to transforming your body in 12 weeks. Designed for beginners and intermediates looking to build muscle and burn fat.',
      level: 'Intermediate',
      features: [
        'Custom Workout Plan',
        'Personalized Nutrition Guide',
        'Weekly Video Check-ins',
        'Direct Messaging Support',
        'Form Correction Analysis'
      ],
      popular: true,
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800",
      price: "$99"
    },
    {
      id: '2',
      title: 'Muscle Gain Blueprint',
      description: 'Focus purely on hypertrophy. Scientifically backed volume and intensity progression to pack on lean mass.',
      level: 'Advanced',
      features: [
        'Advanced Hypertrophy Splits',
        'Macronutrient Cycling',
        'Supplementation Guide',
        'Bi-Weekly Adjustments',
        'Priority Support'
      ],
      popular: false,
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800",
      
    },
    {
      id: '3',
      title: 'Competition Prep',
      description: 'Strict, dialed-in coaching to get you stage-ready. Every rep, every gram of food, every detail accounted for.',
      level: 'Elite',
      features: [
        'Daily Check-ins (Peak Week)',
        'Posing Practice Feedback',
        'Peak Week Protocol',
        'Post-Show Reverse Diet',
        '24/7 Access'
      ],
      popular: false,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
      price: "$199"
    },
  ];

  return (
    <section className="bg-neutral-950 py-16 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight"
          >
            Choose Your <span className="text-red-600">Path</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto"
          >
            Whether you're stepping on stage or just want to look better naked, we have a program engineered for your goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative bg-neutral-900 rounded-2xl overflow-hidden border ${program.popular ? 'border-red-600 shadow-2xl shadow-red-900/20' : 'border-neutral-800'} flex flex-col h-full`}
            >
              {program.popular && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg z-10">
                  Most Popular
                </div>
              )}
              
              <div className="h-40 md:h-48 overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10" />
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{program.title}</h3>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] md:text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
                      {program.level}
                    </span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs md:text-sm mb-4 md:mb-6 h-auto md:h-12 leading-relaxed">
                  {program.description}
                </p>

                <div className="mb-6 md:mb-8">
                   <div className="flex items-baseline">
                      <span className="text-2xl md:text-3xl font-black text-white">{program.price}</span>
                   </div>
                   <p className="text-[10px] md:text-xs text-neutral-500 mt-1">Billed monthly. Cancel anytime.</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-xs md:text-sm text-neutral-300">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-red-600 mr-2 md:mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/programs/${program.id}`}
                  className={`block w-full py-3 px-4 rounded-lg font-bold text-xs md:text-sm text-center transition-all mt-auto ${
                    program.popular 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/20' 
                      : 'bg-white text-neutral-900 hover:bg-neutral-200'
                  }`}
                >
                  SELECT PROGRAM
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 md:mt-20 text-center">
            <p className="text-neutral-400 mb-4 md:mb-6 text-sm md:text-base">Not sure which program is right for you?</p>
            <Link href="/contact" className="text-white border-b border-red-600 hover:text-red-500 transition-colors pb-1 font-bold text-sm md:text-base">
                Talk to a Coach <ArrowRight className="inline w-3 h-3 md:w-4 md:h-4 ml-1" />
            </Link>
        </div>
      </div>
    </section>
  );
}

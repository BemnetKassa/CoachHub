'use client';

import { motion } from 'framer-motion';
import { Users, Award, Zap, CheckCircle2, Dumbbell, Trophy } from 'lucide-react';
import Link from 'next/link';

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
    <div className="bg-neutral-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-red-600 font-bold uppercase tracking-wider text-sm mb-4 block">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
            About <span className="text-red-600">CoachHub</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            We are more than just a coaching platform. We are a movement dedicated to
            transforming lives through science-based training and unyielding dedication.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Members', value: '10k+' },
              { label: 'Pro Coaches', value: '50+' },
              { label: 'Years Experience', value: '15+' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-neutral-400 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section (Original Content Integration) */}
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
            {[
              {
                title: "Custom Programming",
                desc: "No cookie-cutter plans. Every workout is tailored to your unique biomechanics, goals, and schedule for maximum efficiency.",
                icon: Dumbbell
              },
              {
                title: "Elite Community",
                desc: "Join a brotherhood of like-minded individuals pushing past their limits. Iron sharpens iron.",
                icon: Users
              },
              {
                title: "Proven Results",
                desc: "Decades of combined experience and hundreds of successful transformations back our methodology.",
                icon: Trophy
              }
            ].map((feature, idx) => (
              <motion.div key={feature.title} variants={item} className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-red-600 transition-colors group">
                <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 font-bold uppercase tracking-wider text-sm mb-2 block">
                Our Story
              </span>
              <h2 className="text-4xl font-black text-white mb-6 uppercase">
                Forged in Iron
              </h2>
              <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                <p>
                  CoachHub began with a simple observation: the fitness industry was broken.
                  Generic plans, cookie-cutter advice, and zero accountability were the norm.
                  We knew there had to be a better way.
                </p>
                <p>
                  Founded by a team of elite athletes and data scientists, we set out to build
                  a platform that bridges the gap between professional-grade coaching and
                  accessible technology.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border-2 border-neutral-800"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent z-10" />
              <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-700">
                <Users size={64} className="mb-4 opacity-50" />
                <span className="font-bold text-xl opacity-50">Team Photo</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6 uppercase">Our Core Values</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Principles that guide every rep, every set, and every decision we make.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                desc: 'We define the standard. Good enough is never enough.',
              },
              {
                icon: Zap,
                title: 'Intensity',
                desc: 'We bring 100% effort to everything we do. No shortcuts.',
              },
              {
                icon: CheckCircle2,
                title: 'Integrity',
                desc: 'Honest coaching. Real results. No false promises.',
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-red-600/50 transition-colors"
              >
                <value.icon className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-neutral-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic">
            Start Your Legend
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            The only thing standing between you and your goals is action.
            Join the elite community of CoachHub today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-100 transition-colors"
            >
              Join Now
            </Link>
            <Link
              href="/programs"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

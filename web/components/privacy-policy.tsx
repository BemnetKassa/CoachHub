'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Database, CreditCard } from 'lucide-react';

export default function PrivacyPolicy() {
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

  const sections = [
    {
      title: "1. Information We Collect",
      icon: <Eye className="w-6 h-6 text-red-600" />,
      content: "We collect information you provide directly to us when you create an account, purchase a program, or communicate with us. This includes your name, email address, physical fitness data provided for coaching, and payment information processed through our secure partners."
    },
    {
      title: "2. How We Use Your Data",
      icon: <Database className="w-6 h-6 text-red-600" />,
      content: "Your data is used to provide personalized coaching services, track your transformation progress, process safe transactions via Stripe, and send you important updates regarding your programs. We do not sell your personal data to third parties."
    },
    {
      title: "3. Secure Payments",
      icon: <CreditCard className="w-6 h-6 text-red-600" />,
      content: "All financial transactions are handled through Stripe. We do not store your credit card details on our servers. Stripe uses industry-standard encryption to protect your financial information."
    },
    {
      title: "4. Data Security",
      icon: <Lock className="w-6 h-6 text-red-600" />,
      content: "We use Supabase for secure data storage and authentication. We implement various security measures to maintain the safety of your personal information when you enter, submit, or access your profile."
    },
    {
      title: "5. Your Rights",
      icon: <Shield className="w-6 h-6 text-red-600" />,
      content: "You have the right to access, correct, or delete your personal data at any time. You can manage your profile settings directly through the CoachHub dashboard or contact us for assistance."
    },
    {
      title: "6. Cookies & Tracking",
      icon: <FileText className="w-6 h-6 text-red-600" />,
      content: "We use essential cookies to keep you logged in and analyze site traffic to improve our user experience. By using CoachHub, you agree to our use of these necessary technologies."
    }
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">
            Legal Transparency
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-neutral-400 text-lg">
            Last Updated: February 18, 2026. Your privacy and data security are fundamental to the CoachHub experience.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-12"
        >
          {sections.map((section, index) => (
            <motion.section key={index} variants={item} className="border-l-2 border-neutral-800 pl-8 relative">
              <div className="absolute -left-[13px] top-0 bg-neutral-950 p-1 border border-neutral-800 rounded-full">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                {section.title}
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {section.content}
              </p>
            </motion.section>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center"
        >
          <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Need more clarity?</h3>
          <p className="text-neutral-400 mb-6">
            If you have questions about how we handle your data, reach out directly.
          </p>
          <a 
            href="mailto:contact@coachhub.sofi" 
            className="inline-block bg-white text-black font-bold py-3 px-8 rounded hover:bg-neutral-200 transition-colors"
          >
            Contact Privacy Team
          </a>
        </motion.div>
      </div>
    </div>
  );
}

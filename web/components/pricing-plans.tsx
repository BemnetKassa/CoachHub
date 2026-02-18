'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { getStripe } from '@/lib/stripe/client';
import { useRouter } from 'next/navigation';

interface PricingPlan {
  id: string; // db id
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  price_id: string; // stripe price id
  popular: boolean;
}

interface PricingPlansProps {
  initialPlans?: PricingPlan[];
}

export default function PricingPlans({ initialPlans = [] }: PricingPlansProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const defaultPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for beginners starting their journey.',
      features: ['Basic workout plans', 'Progress tracking', 'Community access', 'Email support'],
      price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER!,
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$49',
      period: '/month',
      description: 'Serious gains for improved performance.',
      features: ['Advanced programming', 'Nutrition guidance', 'Form checks (2/mo)', 'Priority support'],
      price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO!,
      popular: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$99',
      period: '/month',
      description: 'Maximum results with 1-on-1 coaching.',
      features: ['Custom roadmap', 'Weekly check-ins', 'Daily form checks', '24/7 Coach access'],
      price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE!,
      popular: false,
    },
  ];

  const plans = (initialPlans && initialPlans.length > 0) ? initialPlans : defaultPlans;

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login?redirect=/pricing');
          return;
        }
        throw new Error(data.error || 'Something went wrong');
      }

      const { sessionId } = data;
      const stripe = await getStripe();
      if (stripe) {
        // @ts-ignore
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(null);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 uppercase italic">
            Choose Your <span className="text-red-600">Path</span>
          </h1>
          <p className="text-sm md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Invest in yourself. Select the plan that matches your ambition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan: any, index: number) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 md:p-8 rounded-2xl border ${
                plan.popular ? 'border-red-600 bg-neutral-900 shadow-xl shadow-red-900/10' : 'border-neutral-800 bg-neutral-900/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 md:px-4 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{plan.name}</h3>
              <p className="text-xs md:text-sm text-neutral-400 mb-4 md:mb-6 leading-relaxed">{plan.description}</p>
              
              <div className="flex items-baseline mb-6 md:mb-8">
                <span className="text-3xl md:text-5xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-xs md:text-base text-neutral-500 ml-1 md:ml-2 font-medium">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start text-xs md:text-sm text-neutral-300">
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-red-500 mr-2 md:mr-3 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleCheckout(plan.priceId || plan.price_id)}
                disabled={loading === (plan.priceId || plan.price_id)}
                className={`w-full py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                  plan.popular
                    ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02] shadow-lg shadow-red-900/20'
                    : 'bg-white text-black hover:bg-neutral-200'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {loading === (plan.priceId || plan.price_id) ? 'Processing...' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

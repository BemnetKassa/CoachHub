import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2026-01-28.clover',
  // @ts-ignore
  typescript: true,
  appInfo: {
    name: 'CoachHub',
    version: '0.1.0',
  },
});


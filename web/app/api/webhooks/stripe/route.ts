import { stripe } from '@/lib/stripe/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('Stripe-Signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return new NextResponse('Webhook secret not found.', { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      const supabase = createAdminClient();
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(event.data.object as Stripe.Product, supabase);
          break;
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object as Stripe.Price, supabase);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await upsertSubscriptionRecord(subscription, supabase);
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            // Link customer if needed
            if (checkoutSession.client_reference_id && checkoutSession.customer) {
                const { error: customerError } = await supabase
                    .from('customers')
                    .upsert({ 
                        id: checkoutSession.client_reference_id, 
                        stripe_customer_id: checkoutSession.customer as string 
                    });
                if (customerError) console.error('Error updating customer:', customerError);
            }
            
            await upsertSubscriptionRecord(
              subscriptionId as string,
              supabase
            );
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.error(error);
      return new NextResponse('Webhook handler failed. View your nextjs function logs.', { status: 400 });
    }
  }
  return NextResponse.json({ received: true });
}

async function upsertProductRecord(product: Stripe.Product, supabase: any) {
  const productData = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };
  const { error } = await supabase.from('products').upsert([productData]);
  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
}

async function upsertPriceRecord(price: Stripe.Price, supabase: any) {
  const priceData = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata,
  };
  const { error } = await supabase.from('prices').upsert([priceData]);
  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
}

async function upsertSubscriptionRecord(subscription: Stripe.Subscription | string, supabase: any) {
    let subscriptionData: Stripe.Subscription;
    if (typeof subscription === 'string') {
        subscriptionData = await stripe.subscriptions.retrieve(subscription);
    } else {
        subscriptionData = subscription;
    }
    
    // Check if customer exists in customers table logic would go here if needed, 
    // but usually user mapping happens at checkout session creation or earlier.
    // For now assuming we map by customer ID if we store it.
    
    // We need to find the user_id associated with this stripe_customer_id
    // This part assumes we invoke a function to link them or query our `customers` table
    const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('stripe_customer_id', subscriptionData.customer)
        .single();

    if (!customerData) {
        console.error(`Customer record not found for Stripe Customer: ${subscriptionData.customer}`);
        // In a real app, you might want to create a customer record here or handle differently
        return; 
    }

    const userId = customerData.id;

    const data = {
        id: subscriptionData.id,
        user_id: userId,
        metadata: subscriptionData.metadata,
        status: subscriptionData.status,
        price_id: subscriptionData.items.data[0].price.id,
        quantity: 1, // simplified
        cancel_at_period_end: subscriptionData.cancel_at_period_end,
        cancel_at: subscriptionData.cancel_at ? new Date(subscriptionData.cancel_at * 1000).toISOString() : null,
        canceled_at: subscriptionData.canceled_at ? new Date(subscriptionData.canceled_at * 1000).toISOString() : null,
        current_period_start: new Date(subscriptionData.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString(),
        created: new Date(subscriptionData.created * 1000).toISOString(),
        ended_at: subscriptionData.ended_at ? new Date(subscriptionData.ended_at * 1000).toISOString() : null,
        trial_start: subscriptionData.trial_start ? new Date(subscriptionData.trial_start * 1000).toISOString() : null,
        trial_end: subscriptionData.trial_end ? new Date(subscriptionData.trial_end * 1000).toISOString() : null,
    };

    const { error } = await supabase.from('subscriptions').upsert([data]);
    if (error) throw error;
    console.log(`Subscription inserted/updated: ${subscription.id}`);
}

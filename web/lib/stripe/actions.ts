import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/server';

export async function upsertProductRecord(product: Stripe.Product) {
  const supabase = createAdminClient();
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

export async function upsertPriceRecord(price: Stripe.Price) {
  const supabase = createAdminClient();
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

export async function upsertSubscriptionRecord(subscriptionId: string) {
    const supabase = createAdminClient();
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Check if customer exists in customers table logic would go here if needed, 
    // but usually user mapping happens at checkout session creation or earlier.
    // For now assuming we map by customer ID if we store it.
    
    // We need to find the user_id associated with this stripe_customer_id
    // This part assumes we invoke a function to link them or query our `customers` table
    const { data: customerData } = await supabase
        .from('customers')
        .select('id')
        .eq('stripe_customer_id', subscription.customer)
        .single();

    if (!customerData) {
        console.error(`Customer record not found for Stripe Customer: ${subscription.customer}`);
        // In a real app, you might want to create a customer record here or handle differently
        return; 
    }

    const userId = customerData.id;

    const data = {
        id: subscription.id,
        user_id: userId,
        metadata: subscription.metadata,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
        quantity: 1, // simplified
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
        // @ts-ignore
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        // @ts-ignore
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        created: new Date(subscription.created * 1000).toISOString(),
        ended_at: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
        trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
    };

    const { error } = await supabase.from('subscriptions').upsert([data]);
    if (error) throw error;
    console.log(`Subscription inserted/updated: ${subscription.id}`);
}

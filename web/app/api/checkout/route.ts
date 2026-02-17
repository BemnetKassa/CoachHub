import { stripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: customerData } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    let stripeCustomerId = customerData?.stripe_customer_id;

    if (!stripeCustomerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      stripeCustomerId = customer.id;
      
      // Save mapping to Supabase
      const { error } = await supabase
          .from('customers')
          .insert({ id: user.id, stripe_customer_id: stripeCustomerId });
          
      if (error) throw error;
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

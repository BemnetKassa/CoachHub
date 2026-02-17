import PricingPlans from '@/components/pricing-plans';
import { createClient } from '@/lib/supabase/server';

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: plans } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('order_index', { ascending: true }); // Ensure ordering if column exists, otherwise fallback to created_at

  return (
    <PricingPlans initialPlans={plans || []} />
  );
}

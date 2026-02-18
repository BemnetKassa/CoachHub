import { createClient } from '@/lib/supabase/server';
import AdminProgramsClient from './client';

export const dynamic = 'force-dynamic';

export default async function ProgramsPage({}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();
  const { data: plans } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('created_at', { ascending: true });

  return <AdminProgramsClient initialPlans={plans || []} />;
}

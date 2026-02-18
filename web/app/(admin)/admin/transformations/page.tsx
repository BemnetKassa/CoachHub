import { createClient } from '@/lib/supabase/server';
import AdminTransformationsClient from './client';

export const dynamic = 'force-dynamic';

export default async function AdminTransformationsPage() {
  const supabase = await createClient();
  const { data: transformations } = await supabase
    .from('transformations')
    .select('*')
    .order('created_at', { ascending: false });

  return <AdminTransformationsClient initialData={transformations || []} />;
}

import Transformations from '@/components/transformations';
import { createClient } from '@/lib/supabase/server';

export default async function TransformationsPage() {
  const supabase = await createClient();
  const { data: transformations } = await supabase
    .from('transformations')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="bg-neutral-950 min-h-screen">
      <Transformations initialData={transformations || []} />
    </div>
  );
}

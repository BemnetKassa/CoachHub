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
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-red-600 font-semibold text-sm mb-2">{item.achievement}</p>
              <p className="text-gray-500 text-sm italic mb-4 line-clamp-2">"{item.quote}"</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit' : 'New'} Transformation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Program Name</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={formData.program || ''}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Achievement</label>
                <input
                  required
                  className="w-full p-2 border rounded"
                  value={formData.achievement || ''}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quote</label>
                <textarea
                  required
                  className="w-full p-2 border rounded h-24"
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Before Image URL</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={formData.image_before_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_before_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">After Image URL</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={formData.image_after_url || ''}
                    onChange={(e) => setFormData({ ...formData, image_after_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

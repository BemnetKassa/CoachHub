'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, X, Loader2, Link as LinkIcon, Quote, User, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Transformation = {
  id: string;
  name: string;
  achievement: string;
  quote: string;
  program: string;
  image_before_url: string;
  image_after_url: string;
};

export default function AdminTransformationsClient({ initialData }: { initialData: Transformation[] }) {
  const [transformations, setTransformations] = useState<Transformation[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Transformation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const initialFormState = {
    name: '',
    achievement: '',
    quote: '',
    program: '',
    image_before_url: '',
    image_after_url: '',
  };

  const [formData, setFormData] = useState<Partial<Transformation>>(initialFormState);

  const handleOpenModal = (item?: Transformation) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSave = {
        name: formData.name,
        achievement: formData.achievement,
        quote: formData.quote,
        program: formData.program,
        image_before_url: formData.image_before_url,
        image_after_url: formData.image_after_url,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('transformations')
          .update(dataToSave)
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('transformations')
          .insert([dataToSave]);

        if (error) throw error;
      }

      router.refresh();
      // Fetch fresh data to update UI immediately without full page reload
      const { data: updatedData } = await supabase
        .from('transformations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (updatedData) setTransformations(updatedData as Transformation[]);
      
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving transformation:', error);
      alert(`Failed to save transformation: ${error.message || JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transformation?')) return;
    setIsDeleting(id);

    try {
      const { error } = await supabase
        .from('transformations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTransformations(transformations.filter(t => t.id !== id));
      router.refresh();
    } catch (error) {
      console.error('Error deleting transformation:', error);
      alert('Failed to delete transformation.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client Transformations</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          Add Transformation
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transformations.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            No transformations yet. Add your first success story!
          </div>
        ) : (
          transformations.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="grid grid-cols-2 h-40">
                <div className="relative h-full bg-gray-100">
                  <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">Before</span>
                  {item.image_before_url ? (
                    <img src={item.image_before_url} className="w-full h-full object-cover" alt="Before" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=No+Image')} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                </div>
                <div className="relative h-full bg-gray-100 border-l border-white">
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded shadow-sm">After</span>
                  {item.image_after_url ? (
                    <img src={item.image_after_url} className="w-full h-full object-cover" alt="After" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=No+Image')} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.name}</h3>
                </div>
                
                <p className="text-sm text-indigo-600 font-medium mb-2">{item.program}</p>
                <div className="bg-green-50 text-green-700 text-xs p-2 rounded mb-3 line-clamp-2">
                  <span className="font-bold mr-1">Result:</span> {item.achievement}
                </div>
                <p className="text-gray-500 text-sm italic mb-4 line-clamp-3 flex-1 relative pl-3 border-l-2 border-gray-300">
                  "{item.quote}"
                </p>

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-auto">
                   <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting === item.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {isDeleting === item.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 border border-gray-200"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {editingItem ? <Edit2 size={24} className="text-indigo-600" /> : <Plus size={24} className="text-indigo-600" />}
                  {editingItem ? 'Edit Transformation' : 'New Transformation'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500 p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <User size={14} /> Client Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                      placeholder="e.g. Michael R."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <Trophy size={14} /> Program Taken
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.program}
                      onChange={(e) => setFormData({...formData, program: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                      placeholder="e.g. 12-Week Transformation"
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Key Achievement</label>
                   <input 
                      type="text" 
                      required
                      value={formData.achievement}
                      onChange={(e) => setFormData({...formData, achievement: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                      placeholder="e.g. Lost 45lbs Fat, Gained 10lbs Muscle"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <LinkIcon size={14} /> Before Image URL
                    </label>
                    <input 
                      type="url" 
                      required
                      value={formData.image_before_url}
                      onChange={(e) => setFormData({...formData, image_before_url: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-xs font-mono text-black"
                      placeholder="https://..."
                    />
                    {formData.image_before_url && (
                      <div className="mt-2 text-xs text-gray-500">
                        Preview:
                        <img src={formData.image_before_url} alt="Preivew" className="h-20 w-auto rounded mt-1 border" onError={(e) => e.currentTarget.style.display = 'none'} />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      <LinkIcon size={14} /> After Image URL
                    </label>
                    <input 
                      type="url" 
                      required
                      value={formData.image_after_url}
                      onChange={(e) => setFormData({...formData, image_after_url: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-xs font-mono text-black"
                      placeholder="https://..."
                    />
                     {formData.image_after_url && (
                      <div className="mt-2 text-xs text-gray-500">
                        Preview:
                        <img src={formData.image_after_url} alt="Preivew" className="h-20 w-auto rounded mt-1 border" onError={(e) => e.currentTarget.style.display = 'none'} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Quote size={14} /> Testimonial Quote
                  </label>
                  <textarea 
                    required
                    value={formData.quote}
                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                    placeholder="The discipline required was insane, but..."
                  />
                </div>

                <div className="pt-4 border-t flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-sm"
                  >
                    {isLoading && <Loader2 className="animate-spin" size={16} />}
                    {editingItem ? 'Save Changes' : 'Create Transformation'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

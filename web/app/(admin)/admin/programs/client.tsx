'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, X, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  price_id: string;
  popular: boolean;
  order_index?: number;
};

export default function AdminProgramsClient({ initialPlans }: { initialPlans: PricingPlan[] }) {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState<Partial<PricingPlan>>({
    name: '',
    price: '',
    period: '/month',
    description: '',
    features: [''],
    price_id: '',
    popular: false,
  });

  const handleOpenModal = (plan?: PricingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({ ...plan });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        price: '',
        period: '/month',
        description: '',
        features: [''],
        price_id: '',
        popular: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...(formData.features || []), ''] });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const planData = {
        name: formData.name,
        price: formData.price,
        period: formData.period,
        description: formData.description,
        features: formData.features?.filter(f => f.trim() !== '') || [], // Filter empty features
        price_id: formData.price_id,
        popular: formData.popular,
      };

      if (editingPlan) {
        const { error } = await supabase
          .from('pricing_plans')
          .update(planData)
          .eq('id', editingPlan.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pricing_plans')
          .insert([planData]);

        if (error) throw error;
      }

      router.refresh();
      // Optimistic update or refetch could be better, but refresh is simple
      const { data: updatedPlans } = await supabase.from('pricing_plans').select('*').order('created_at', { ascending: true }); // Simplistic refetch
      if (updatedPlans) setPlans(updatedPlans as PricingPlan[]);
      
      handleCloseModal();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    setIsDeleting(id);

    try {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPlans(plans.filter(p => p.id !== id));
      router.refresh();
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Training Programs (Marketing)</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          Add Program
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popular</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             {plans.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                   No programs found. Create one to get started.
                 </td>
               </tr>
             ) : (
               plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.price}{plan.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono text-xs">{plan.price_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {plan.features?.length || 0} features
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.popular ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Yes</span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(plan)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(plan.id)}
                      disabled={isDeleting === plan.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {isDeleting === plan.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    </button>
                  </td>
                </tr>
               ))
             )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8" // Added my-8 for vertical spacing if content overflows
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPlan ? 'Edit Program' : 'Create New Program'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                      placeholder="e.g. 12-Week Transformation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Price ID</label>
                    <input 
                      type="text" 
                      required
                      value={formData.price_id}
                      onChange={(e) => setFormData({...formData, price_id: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 font-mono text-sm text-black"
                      placeholder="price_12345..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input 
                      type="text" 
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                      placeholder="$99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                    <select 
                      value={formData.period}
                      onChange={(e) => setFormData({...formData, period: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                    >
                      <option value="/month">/month</option>
                      <option value="/year">/year</option>
                      <option value=" one-time">one-time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-black"
                    placeholder="Brief description of the program..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="space-y-2">
                    {formData.features?.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input 
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 text-sm text-black"
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button 
                          type="button" 
                          onClick={() => removeFeatureField(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={addFeatureField}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="popular" className="text-sm font-medium text-gray-700">Tag as "Most Popular"</label>
                </div>

                <div className="pt-4 border-t flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading && <Loader2 className="animate-spin" size={16} />}
                    {editingPlan ? 'Save Changes' : 'Create Program'}
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

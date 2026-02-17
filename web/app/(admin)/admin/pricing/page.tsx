'use client';

import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  price_id: string;
  popular: boolean;
}

export default function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState<Partial<PricingPlan>>({});
  const [showModal, setShowModal] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    setLoading(true);
    const { data } = await supabase.from('pricing_plans').select('*').order('created_at', { ascending: true });
    setPlans(data || []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEditing) {
      await supabase.from('pricing_plans').update(formData).eq('id', isEditing.id);
    } else {
      await supabase.from('pricing_plans').insert([formData]);
    }
    setShowModal(false);
    setIsEditing(null);
    setFormData({});
    fetchPlans();
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return;
    await supabase.from('pricing_plans').delete().eq('id', id);
    fetchPlans();
  }

  function openEdit(plan: PricingPlan) {
    setFormData(plan);
    setIsEditing(plan);
    setShowModal(true);
  }

  function openCreate() {
    setFormData({ features: [], popular: false });
    setIsEditing(null);
    setShowModal(true);
  }

  function handleFeatureChange(index: number, value: string) {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  }

  function addFeature() {
    setFormData({ ...formData, features: [...(formData.features || []), ''] });
  }

  function removeFeature(index: number) {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pricing Plans</h1>
        <button
          onClick={openCreate}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between">
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                POPULAR
              </span>
            )}
            <div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-black text-gray-900 mb-1">
                {plan.price} <span className="text-sm font-normal text-gray-500">{plan.period}</span>
              </p>
              <p className="text-gray-500 mb-4 text-sm">{plan.description}</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                {plan.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">✓ {f}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <button onClick={() => openEdit(plan)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(plan.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit' : 'New'} Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Plan Name</label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Stripe Price ID</label>
                    <input
                        className="w-full p-2 border rounded"
                        value={formData.price_id || ''}
                        onChange={(e) => setFormData({ ...formData, price_id: e.target.value })}
                    />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (e.g. $29)</label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Period (e.g. /month)</label>
                  <input
                    required
                    className="w-full p-2 border rounded"
                    value={formData.period || ''}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded h-20"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Features</label>
                {formData.features?.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      className="flex-1 p-2 border rounded"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 px-2 hover:bg-red-50"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Feature
                </button>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.popular || false}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-red-600"
                />
                <span className="text-sm font-medium">Mark as Popular / Best Value</span>
              </label>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
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

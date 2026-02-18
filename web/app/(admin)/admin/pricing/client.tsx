"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function AdminPricingClient({
  initialPlans,
}: {
  initialPlans: PricingPlan[];
}) {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState<Partial<PricingPlan>>({
    name: "",
    price: "",
    period: "/month",
    description: "",
    features: [""],
    price_id: "",
    popular: false,
  });

  const handleOpenModal = (plan?: PricingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({ ...plan });
    } else {
      setEditingPlan(null);
      setFormData({
        name: "",
        price: "",
        period: "/month",
        description: "",
        features: [""],
        price_id: "",
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
    setFormData({ ...formData, features: [...(formData.features || []), ""] });
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
        features: formData.features?.filter((f) => f.trim() !== "") || [],
        price_id: formData.price_id,
        popular: formData.popular,
      };

      if (editingPlan) {
        const { error } = await supabase
          .from("pricing_plans")
          .update(planData)
          .eq("id", editingPlan.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("pricing_plans")
          .insert([planData]);

        if (error) throw error;
      }

      router.refresh();
      // Fetch fresh data
      const { data: updatedData } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("order_index", { ascending: true });

      if (updatedData) setPlans(updatedData as PricingPlan[]);

      handleCloseModal();
    } catch (error: any) {
      console.error("Error saving plan:", error);
      alert(`Failed to save plan: ${error.message || JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setPlans(plans.filter((plan) => plan.id !== id));
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                </div>
                {plan.popular && (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Popular
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

              <div className="space-y-2 mb-6">
                {plan.features.slice(0, 3).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    {feature}
                  </div>
                ))}
                {plan.features.length > 3 && (
                  <div className="text-xs text-gray-400 pl-3">
                    +{plan.features.length - 3} more features
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-mono">
                  {plan.price_id || "No Stripe ID"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(plan)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPlan ? "Edit Plan" : "Add New Plan"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plan Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Pro Plan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.price_id}
                      onChange={(e) =>
                        setFormData({ ...formData, price_id: e.target.value })
                      }
                      placeholder="price_..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        required
                        type="number"
                        step="0.01"
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Period
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.period}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                    >
                      <option value="/month">Monthly</option>
                      <option value="/year">Yearly</option>
                      <option value="/one-time">One-time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Short description of the plan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {formData.features?.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeatureField(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addFeatureField}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Feature
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) =>
                      setFormData({ ...formData, popular: e.target.checked })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="popular"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Mark as Popular / Recommended
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

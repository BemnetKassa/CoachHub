"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, X, Loader2, Dumbbell, Clock, Users, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Program = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  level: "beginner" | "intermediate" | "advanced";
  duration_weeks: number;
  price_monthly: number;
};

export default function AdminProgramsClient({
  initialPrograms,
}: {
  initialPrograms: Program[];
}) {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState<Partial<Program>>({
    title: "",
    description: "",
    image_url: "",
    level: "beginner",
    duration_weeks: 4,
    price_monthly: 0,
  });

  const handleOpenModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({ ...program });
    } else {
      setEditingProgram(null);
      setFormData({
        title: "",
        description: "",
        image_url: "",
        level: "beginner",
        duration_weeks: 4,
        price_monthly: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingProgram) {
        const { error } = await supabase
          .from("programs")
          .update(formData)
          .eq("id", editingProgram.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("programs").insert([formData]);

        if (error) throw error;
      }

      router.refresh();
      // Fetch fresh data
      const { data: updatedData } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (updatedData) setPrograms(updatedData as Program[]);

      handleCloseModal();
    } catch (error: any) {
      console.error("Error saving program:", error);
      alert(`Failed to save program: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      const { error } = await supabase
        .from("programs")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setPrograms(programs.filter((p) => p.id !== id));
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting program:", error);
      alert("Failed to delete program. Please try again.");
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
          Add Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative h-48 bg-gray-100">
              {program.image_url ? (
                <Image
                  src={program.image_url}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Dumbbell className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleOpenModal(program)}
                  className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-blue-600 shadow-sm transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(program.id)}
                  className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-600 shadow-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {program.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                {program.description || "No description provided."}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {program.duration_weeks} Weeks
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="capitalize">{program.level}</span>
                </div>
                 {program.price_monthly && program.price_monthly > 0 ? (
                  <div className="flex items-center text-sm text-gray-500">
                     <DollarSign className="w-4 h-4 mr-2" />
                     ${program.price_monthly}/mo
                  </div>
                 ) : null}
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
                  {editingProgram ? "Edit Program" : "Add New Program"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. 12-Week Transformation"
                  />
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Cover Image URL
                   </label>
                   <input
                     type="text"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     value={formData.image_url || ""}
                     onChange={(e) =>
                       setFormData({ ...formData, image_url: e.target.value })
                     }
                     placeholder="https://..."
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (Weeks)
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.duration_weeks}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration_weeks: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: e.target.value as Program["level"],
                        })
                      }
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Price ($) (Optional)
                    </label>
                     <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.price_monthly}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price_monthly: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe what users can expect..."
                  />
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
                      "Save Program"
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

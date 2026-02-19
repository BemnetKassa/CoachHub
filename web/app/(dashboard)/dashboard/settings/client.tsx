"use client";

import { useState } from "react";
import { User, CreditCard, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortalSession, updateProfile } from "./actions";
import Link from "next/link";

interface SettingsClientProps {
  user: any;
  profile: any;
  subscription: any;
  isActive: boolean;
}

export default function SettingsClient({ user, profile, subscription, isActive }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "subscription" | "security">("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "subscription", label: "Membership", icon: CreditCard },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Settings Navigation Sidebar */}
      <div className="w-full lg:w-64 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all text-sm",
                isSelected 
                  ? "bg-neutral-900 text-white shadow-lg shadow-neutral-200" 
                  : "bg-white text-neutral-500 hover:text-neutral-900 border border-neutral-100"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} />
                <span>{tab.label}</span>
              </div>
              {isSelected && <ChevronRight size={16} />}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8 max-w-2xl">
        {activeTab === "profile" && (
          <section className="bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-neutral-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-black text-neutral-900 mb-6 uppercase tracking-wider">Profile Information</h2>
            <form action={updateProfile} className="space-y-6">
              <div className="grid gap-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={profile?.name || ""}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-neutral-900 font-medium"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-400 cursor-not-allowed font-medium"
                />
              </div>

              <button
                type="submit"
                className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-black text-xs tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200/50 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </form>
          </section>
        )}

        {activeTab === "subscription" && (
          <section className="bg-white shadow-sm rounded-2xl p-6 md:p-8 border border-neutral-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-black text-neutral-900 mb-6 uppercase tracking-wider">Manage Membership</h2>
            
            {subscription ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      Current Tier
                    </p>
                    <p className="text-lg font-black text-neutral-800 mt-1 uppercase italic">
                      {subscription.prices?.products?.name || "Membership Plan"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                       isActive ? "bg-green-100 text-green-700" : "bg-neutral-200 text-neutral-500"
                    )}>
                      {subscription.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                    <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                        Securely manage your billing, update payment card, or cancel through our official Stripe portal.
                    </p>
                </div>

                <form action={createPortalSession}>
                  <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-black tracking-[0.15em] hover:bg-neutral-800 transition-all flex items-center justify-center space-x-3 active:scale-[0.98]"
                  >
                    <CreditCard size={18} />
                    <span>OPEN STRIPE HUB</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-12 border-2 border-dashed border-neutral-100 rounded-3xl text-center space-y-6">
                <div className="bg-neutral-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-neutral-200">
                  <Shield size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-900 uppercase">No Active Plan</h3>
                  <p className="text-sm text-neutral-400 mt-2 max-w-[200px] mx-auto italic">Level up your journey with an elite program.</p>
                </div>
                <Link 
                    href="/dashboard/programs/browse"
                    className="inline-block bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-[0.15em] uppercase hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                    Explore Plans
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

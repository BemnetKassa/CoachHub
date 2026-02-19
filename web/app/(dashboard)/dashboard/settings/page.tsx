import { createClient } from "@/lib/supabase/server";
import { CreditCard, User, AlertTriangle } from "lucide-react";
import { createPortalSession, updateProfile } from "./actions";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .eq("user_id", user.id)
    .order("created", { ascending: false })
    .limit(1)
    .single();

  const isActive = subscription?.status === "active" || subscription?.status === "trialing";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-neutral-900">SETTINGS</h1>
        <p className="text-neutral-500 mt-2 italic">Customize your training experience and manage your membership.</p>
      </div>

      {/* Profile Section */}
      <section className="bg-white shadow-sm rounded-2xl p-8 border border-neutral-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-50 p-2 rounded-lg text-red-600">
            <User size={24} />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Profile Information</h2>
        </div>

        <form action={updateProfile} className="space-y-6">
          <div className="grid gap-2">
            <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={profile?.name || ""}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-neutral-900"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">
              Email Address (Cannot be changed)
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-400 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-200"
          >
            Update Profile
          </button>
        </form>
      </section>

      {/* Subscription Section */}
      <section className="bg-white shadow-sm rounded-2xl p-8 border border-neutral-100 overflow-hidden relative">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-50 p-2 rounded-lg text-red-600">
            <CreditCard size={24} />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Manage Subscription</h2>
        </div>

        {subscription ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                  Current Program
                </p>
                <p className="text-lg font-bold text-neutral-900 mt-1">
                  {subscription.prices?.products?.name || "Membership Plan"}
                </p>
              </div>
              <div className="text-right">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
                   isActive ? "bg-green-100 text-green-700" : "bg-neutral-200 text-neutral-500"
                )}>
                  {subscription.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-500 leading-relaxed">
              We manage our billing through Stripe for maximum security. Use the button below to cancel your subscription, update your payment method, or download past invoices.
            </p>

            <form action={createPortalSession}>
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-black tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2"
              >
                <span>OPEN STRIPE BILLING PORTAL</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-neutral-100 rounded-2xl text-center space-y-4">
            <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-neutral-300">
              <CreditCard size={32} />
            </div>
            <div>
              <p className="font-bold text-neutral-400">No active subscription found.</p>
              <p className="text-sm text-neutral-400">Join a program to start your journey.</p>
            </div>
            <Link 
                href="/dashboard/program/browse"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
            >
                Browse Programs
            </Link>
          </div>
        )}
      </section>

       {/* Danger Zone Section */}
       <section className="bg-red-50/30 rounded-2xl p-8 border border-red-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg text-red-600">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
        </div>
        
        <p className="text-sm text-red-700 mb-6">
            Deleting your account is permanent. All your training progress, historical lift data, and transformation photos will be deleted immediately.
        </p>

        <button className="border border-red-200 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-all">
            Contact Support to Delete Account
        </button>
      </section>
    </div>
  );
}

import { cn } from "@/lib/utils";
import Link from "next/link";

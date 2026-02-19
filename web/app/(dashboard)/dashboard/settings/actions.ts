"use server";

import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createPortalSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get customer id from public.customers table
  const { data: customerData, error: customerError } = await supabase
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (customerError || !customerData?.stripe_customer_id) {
    throw new Error("Customer record not found. Link a payment method first.");
  }

  const stripeCustomerId = customerData.stripe_customer_id;

  // Use headers() to get the current host for the return URL
  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const returnUrl = `${protocol}://${host}/dashboard/settings`;

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });

    if (!portalSession.url) {
        throw new Error("Could not create billing portal session");
    }

    return redirect(portalSession.url);
  } catch (error: any) {
    console.error("Error creating portal session:", error);
    throw new Error(error.message || "Something went wrong creating the billing portal.");
  }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const name = formData.get("name") as string;

  if (name) {
    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("id", user.id);

    if (error) {
      throw new Error("Error updating profile: " + error.message);
    }
  }
  
  revalidatePath("/dashboard/settings");
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/"); // Redirect non-admins to home page instead of dashboard to avoid loop
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <Link href="/admin" className="text-xl font-bold">
            CoachHub Admin
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/admin"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/programs"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Programs
          </Link>
          <Link
            href="/admin/students"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Students
          </Link>
          <Link
            href="/admin/transformations"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Transformations
          </Link>
          <Link
            href="/admin/pricing"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Pricing
          </Link>
          <Link
            href="/admin/workouts"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Workouts
          </Link>
          <Link
            href="/admin/subscriptions"
            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Subscriptions
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link href="/dashboard" className="text-xl font-bold text-gray-800">
            CoachHub
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/program"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            My Program
          </Link>
          <Link
            href="/dashboard/progress"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Progress
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.email}</p>
              <form action="/auth/signout" method="post">
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

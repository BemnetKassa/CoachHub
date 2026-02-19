import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StudentSidebar } from "@/components/dashboard/sidebar";

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
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <StudentSidebar userEmail={user.email} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}

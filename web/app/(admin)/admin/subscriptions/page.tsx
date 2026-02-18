import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

type Subscription = {
  id: string;
  user_id: string;
  status: string;
  price_id: string;
  current_period_end: string;
  user?: {
    name: string | null;
    email: string | null;
  };
};

export default async function AdminSubscriptionsPage() {
  const supabase = await createClient();

  // 1. Fetch subscriptions
  const { data: subscriptionsData, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created", { ascending: false });

  if (error) {
    console.error("Error fetching subscriptions:", error);
    return <div>Error loading subscriptions</div>;
  }

  // 2. Fetch user details manually (since direct join might be tricky without FK to public.users)
  const userIds = subscriptionsData?.map((sub) => sub.user_id) || [];
  
  let usersMap: Record<string, { name: string | null; email: string | null }> = {};
  
  if (userIds.length > 0) {
    const { data: usersData } = await supabase
      .from("users")
      .select("id, name, email")
      .in("id", userIds);

    if (usersData) {
      usersMap = usersData.reduce((acc, user: any) => {
        acc[user.id] = { name: user.name, email: user.email };
        return acc;
      }, {} as Record<string, { name: string | null; email: string | null }>);
    }
  }

  // 3. Combine data
  const subscriptions: Subscription[] = (subscriptionsData || []).map((sub: any) => ({
    ...sub,
    user: usersMap[sub.user_id] || { name: 'Unknown', email: 'N/A' },
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Subscriptions
        </h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Renews
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No active subscriptions found.
                </td>
              </tr>
            ) : (
              subscriptions.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sub.user?.name || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {sub.user?.email || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                        sub.status === "active"
                          ? "bg-green-100 text-green-800"
                          : sub.status === "canceled" 
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sub.status || 'unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="font-mono text-xs">{sub.price_id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sub.current_period_end
                      ? format(new Date(sub.current_period_end), "PPP")
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

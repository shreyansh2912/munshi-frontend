/**
 * Dashboard Container (Server Component)
 * Fetches data on the server and passes to Scene
 */

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import DashboardScene from './DashboardScene';

async function getDashboardData() {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('munshi_access_token')?.value;

    if (!accessToken) {
      return null;
    }

    // Fetch all dashboard data in parallel on the server
    const [user, ledgerAccounts] = await Promise.all([
      api.user.getProfile(),
      api.ledger.list(),
    ]);

    return {
      user,
      ledgerAccounts,
      // Add more data as needed
    };
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return null;
  }
}

export default async function DashboardContainer() {
  const data = await getDashboardData();

  // If no data, user is not authenticated (middleware should handle this)
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Pass server-fetched data to client Scene
  return <DashboardScene initialData={data} />;
}

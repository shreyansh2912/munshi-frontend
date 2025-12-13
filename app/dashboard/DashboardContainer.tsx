/**
 * Dashboard Container (Server Component)
 * Fetches data on the server and passes to Scene
 */

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import DashboardScene from './DashboardScene';
import AuthError from './AuthError';

async function getDashboardData() {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('munshi_access_token')?.value;

    if (!accessToken) {
      console.log('[Dashboard] No access token found');
      return null;
    }

    // Prepare headers for server-side API calls
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
    const config = { headers: { Cookie: cookieHeader } };

    console.log('[Dashboard] Fetching dashboard data...');

    // Fetch all dashboard data in parallel on the server
    const [user, ledgerAccounts] = await Promise.all([
      api.user.getProfile(config),
      api.ledger.list(undefined, config),
    ]);

    console.log('[Dashboard] Data fetched successfully');

    return {
      user,
      ledgerAccounts,
    };
  } catch (error: any) {
    console.error('[Dashboard] Data fetch error:', error.message);
    // Return null on any error - authentication will be handled by redirect below
    return null;
  }
}

export default async function DashboardContainer() {
  const data = await getDashboardData();

  // If no data, clear cookies and redirect (authentication failed)
  if (!data) {
    return <AuthError />;
  }

  // Pass server-fetched data to client Scene
  return <DashboardScene initialData={data} />;
}

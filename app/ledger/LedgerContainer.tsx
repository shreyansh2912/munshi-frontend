/**
 * Ledger Container (Server Component)
 * Fetches ledger data on the server
 */

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import LedgerScene from './LedgerScene';

async function getLedgerData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('munshi_access_token')?.value;

    if (!accessToken) {
      return null;
    }

    // Fetch ledger accounts on server
    // Prepare headers for server-side API calls
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
    const config = { headers: { Cookie: cookieHeader } };

    const ledgerAccounts = await api.ledger.list(undefined, config);

    return {
      ledgerAccounts,
    };
  } catch (error) {
    console.error('Ledger data fetch error:', error);
    return null;
  }
}

export default async function LedgerContainer() {
  const data = await getLedgerData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <LedgerScene initialData={data} />;
}

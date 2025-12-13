/**
 * Invoices Container (Server Component)
 * Fetches invoices data on the server
 */

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import InvoicesScene from './InvoicesScene';

async function getInvoicesData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('munshi_access_token')?.value;

    console.log('[Invoices] Access token exists:', !!accessToken);

    if (!accessToken) {
      return null;
    }

    // Prepare headers for server-side API calls
    const allCookies = cookieStore.getAll();
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
    const config = { headers: { Cookie: cookieHeader } };

    console.log('[Invoices] Cookie header length:', cookieHeader.length);
    console.log('[Invoices] Fetching invoices, customers, and products...');

    // Fetch invoices, customers, and products data on server
    const [invoices, customers, products] = await Promise.all([
      api.invoices.list(undefined, config),
      api.customers.list(undefined, config),
      api.products.list(config),  // Added config for server-side auth
    ]);

    console.log('[Invoices] Data fetched successfully');

    return {
      invoices,
      customers,
      products,
    };
  } catch (error) {
    console.error('Invoices data fetch error:', error);
    return null;
  }
}

export default async function InvoicesContainer() {
  const data = await getInvoicesData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <InvoicesScene initialData={data} />;
}

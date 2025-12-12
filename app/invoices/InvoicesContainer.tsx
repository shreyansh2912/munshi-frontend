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

    if (!accessToken) {
      return null;
    }

    // Fetch invoices data on server
    const invoices = await api?.invoices?.list();

    return {
      invoices,
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

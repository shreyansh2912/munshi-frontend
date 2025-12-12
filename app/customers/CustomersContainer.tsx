/**
 * Customers Container (Server Component)
 * Fetches customers data on the server
 */

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import CustomersScene from './CustomersScene';

async function getCustomersData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('munshi_access_token')?.value;

    if (!accessToken) {
      return null;
    }

    // Fetch customers data on server
    const customers = await api.customers.list();

    return {
      customers,
    };
  } catch (error) {
    console.error('Customers data fetch error:', error);
    return null;
  }
}

export default async function CustomersContainer() {
  const data = await getCustomersData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <CustomersScene initialData={data} />;
}

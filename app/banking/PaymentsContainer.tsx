/**
 * Payments Container (Server Component)
 * Fetches payments data on the server and passes to Pay mentsScene
 */

import PaymentsScene from './PaymentsScene';
import { api } from '@/lib/api';

async function getData() {
  try {
    // Fetch payments and customers for party selection
    const [payments, customers] = await Promise.all([
      api.payments.list(),
      api.customers.list(),
    ]);
    
    return { payments, customers };
  } catch (error) {
    console.error('Failed to fetch payments data:', error);
    return { payments: [], customers: [] };
  }
}

export default async function PaymentsContainer() {
  const data = await getData();
  
  return <PaymentsScene initialData={data} />;
}

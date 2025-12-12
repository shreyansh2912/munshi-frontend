/**
 * Inventory Container (Server Component)
 * Fetches inventory data on the server
 */

import { cookies } from 'next/headers';
import InventoryScene from './InventoryScene';

async function getInventoryData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('munshi_access_token')?.value;

    if (!accessToken) {
      return null;
    }

    // TODO: Fetch inventory data from API when endpoint is ready
    // const inventory = await api.inventory.list();
    const inventory: any[] = [];

    return {
      inventory,
    };
  } catch (error) {
    console.error('Inventory data fetch error:', error);
    return null;
  }
}

export default async function InventoryContainer() {
  const data = await getInventoryData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <InventoryScene initialData={data} />;
}

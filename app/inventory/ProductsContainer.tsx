/**
 * Products Container (Server Component)
 * Fetches products data on the server and passes to ProductsScene
 */

import ProductsScene from './ProductsScene';
import { api } from '@/lib/api';

async function getData() {
  try {
    const products = await api.products.list();
    return { products };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [] };
  }
}

export default async function ProductsContainer() {
  const data = await getData();
  
  return <ProductsScene initialData={data} />;
}

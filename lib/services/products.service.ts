/**
 * Products Service
 */

import { apiClient } from '@/lib/api/client';

export interface Product {
    id: number;
    uuid: string;
    sku: string;
    name: string;
    description?: string;
    productType: 'goods' | 'service';
    isActive: boolean;
}

export const getProducts = () => {
    return apiClient.get<Product[]>('/products');
};

export const getProduct = (id: string) => {
    return apiClient.get<Product>(`/products/${id}`);
};

export const createProduct = (data: Partial<Product>) => {
    return apiClient.post<Product>('/products', data);
};

export const updateProduct = (id: string, data: Partial<Product>) => {
    return apiClient.patch<Product>(`/products/${id}`, data);
};

export const deleteProduct = (id: string) => {
    return apiClient.delete<void>(`/products/${id}`);
};

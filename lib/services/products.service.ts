/**
 * Products Service
 * API calls for product management
 */

import { apiClient } from '@/lib/api/client';
import type {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ProductCategory,
    Unit,
    APIResponse
} from '@/lib/api/types';

export const productsService = {
    /**
     * List all products
     */
    async list(): Promise<Product[]> {
        const response = await apiClient.get<APIResponse<Product[]>>('/products');
        return response.data;
    },

    /**
     * Get a single product by ID
     */
    async getById(id: string | number): Promise<Product> {
        const response = await apiClient.get<APIResponse<Product>>(`/products/${id}`);
        return response.data;
    },

    /**
     * Create a new product
     */
    async create(data: CreateProductRequest): Promise<Product> {
        const response = await apiClient.post<APIResponse<Product>>('/products', data);
        return response.data;
    },

    /**
     * Update a product
     */
    async update(id: string | number, data: UpdateProductRequest): Promise<Product> {
        const response = await apiClient.patch<APIResponse<Product>>(`/products/${id}`, data);
        return response.data;
    },

    /**
     * Delete a product (soft delete)
     */
    async delete(id: string | number): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    },

    // Category management
    categories: {
        async list(): Promise<ProductCategory[]> {
            // TODO: Implement when backend endpoint is ready
            return [];
        },
    },

    // Unit management
    units: {
        async list(): Promise<Unit[]> {
            // TODO: Implement when backend endpoint is ready
            return [];
        },
    },
};

// Backwards compatibility exports
export const getProducts = () => productsService.list();
export const getProduct = (id: string) => productsService.getById(id);
export const createProduct = (data: CreateProductRequest) => productsService.create(data);
export const updateProduct = (id: string | number, data: UpdateProductRequest) => productsService.update(id, data);
export const deleteProduct = (id: string | number) => productsService.delete(id);

export default productsService;

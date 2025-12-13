/**
 * Products Store
 * Zustand store for product state management
 */

import { create } from 'zustand';
import productsService from '../services/products.service';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../api/types';

interface ProductsState {
    products: Product[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchProducts: () => Promise<void>;
    getProduct: (id: string | number) => Promise<Product | undefined>;
    createProduct: (data: CreateProductRequest) => Promise<void>;
    updateProduct: (id: string | number, data: UpdateProductRequest) => Promise<void>;
    deleteProduct: (id: string | number) => Promise<void>;
    clearError: () => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const products = await productsService.list();
            set({ products, isLoading: false });
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to fetch products',
                isLoading: false
            });
        }
    },

    getProduct: async (id: string | number) => {
        set({ isLoading: true, error: null });
        try {
            const product = await productsService.getById(id);
            set({ isLoading: false });
            return product;
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to fetch product',
                isLoading: false
            });
            return undefined;
        }
    },

    createProduct: async (data: CreateProductRequest) => {
        set({ isLoading: true, error: null });
        try {
            const newProduct = await productsService.create(data);
            set(state => ({
                products: [...state.products, newProduct],
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to create product',
                isLoading: false
            });
            throw error;
        }
    },

    updateProduct: async (id: string | number, data: UpdateProductRequest) => {
        set({ isLoading: true, error: null });
        try {
            const updatedProduct = await productsService.update(id, data);
            set(state => ({
                products: state.products.map(p =>
                    p.id === id ? updatedProduct : p
                ),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to update product',
                isLoading: false
            });
            throw error;
        }
    },

    deleteProduct: async (id: string | number) => {
        set({ isLoading: true, error: null });
        try {
            await productsService.delete(id);
            set(state => ({
                products: state.products.filter(p => p.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error?.message || 'Failed to delete product',
                isLoading: false
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));

export default useProductsStore;

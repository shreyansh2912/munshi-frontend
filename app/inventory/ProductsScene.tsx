/**
 * Products Scene (Client Component)
 * Handles products UI and interactions
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Modal, Badge } from '@/components/ui/UI';
import { Search, Plus, Package, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import type { Product } from '@/lib/api/types';
import ProductForm from './components/ProductForm';

interface ProductsSceneProps {
  initialData: {
    products: Product[];
  };
}

export default function ProductsScene({ initialData }: ProductsSceneProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialData.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteConfirmOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    router.refresh(); // Refresh server component
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    setIsDeleting(true);
    try {
      const { api } = await import('@/lib/api');
      await api.products.delete(deletingProduct.id);
      
      // Optimistically update UI
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      setIsDeleteConfirmOpen(false);
      setDeletingProduct(null);
      
      // Refresh from server
      router.refresh();
    } catch (error) {
      console.error('Delete product error:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Products & Inventory</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Manage your product catalog and stock levels.</p>
        </div>
        <Button size="sm" onClick={handleOpenCreateModal}>
          <Plus size={16} className="mr-2"/> Add Product
        </Button>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center bg-gray-50 dark:bg-munshi-dark-card rounded-t-2xl">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                placeholder="Search products by name, SKU, or description..." 
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No products found matching your search' : 'No products yet. Click "Add Product" to create your first product.'}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-munshi-dark-card">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-munshi-teal/10 dark:bg-zinc-800 flex items-center justify-center text-munshi-teal dark:text-white">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-munshi-text dark:text-white">{product.name}</p>
                          {product.description && (
                            <p className="text-xs text-gray-400 line-clamp-1">{product.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <Badge variant={product.productType === 'goods' ? 'info' : 'neutral'}>
                        {product.productType === 'goods' ? 'Goods' : 'Service'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {product.trackInventory ? (
                        <span className="text-munshi-text dark:text-white font-medium">
                          {product.stockLevel || 0} units
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.isActive ? 'success' : 'neutral'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-munshi-indigo dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            onClick={() => handleOpenEditModal(product)}
                            title="Edit product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            onClick={() => handleDeleteClick(product)}
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Edit Product" : "Create New Product"}
        size="large"
      >
        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setDeletingProduct(null);
        }}
        title="Delete Product"
        footer={
           <>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setDeletingProduct(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </Button>
           </>
        }
      >
        <div className="flex gap-4">
           <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
              <AlertTriangle size={24} />
           </div>
           <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Delete {deletingProduct?.name}?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                 Are you sure you want to delete this product? This action cannot be undone. Associated inventory records will remain for historical purposes.
              </p>
           </div>
        </div>
      </Modal>
    </AppLayout>
  );
}

/**
 * Inventory Scene Component
 * 
 * Displays inventory items with stock tracking and value calculations.
 * All data comes from backend - no dummy/fallback data.
 * 
 * @module app/inventory/InventoryScene
 */

'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge, Input, Modal } from '@/components/ui/UI';
import { Plus, Search, Package, AlertTriangle, TrendingDown } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface InventoryItem {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    minStock: number;
    price: number;
    category: string;
    status: string;
}

interface InventorySceneProps {
    initialData: {
        inventory: InventoryItem[];
    };
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function InventoryScene({ initialData }: InventorySceneProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Use only backend data - no fallback
    const inventory = initialData.inventory;
    
    // ========================================================================
    // FILTERING
    // ========================================================================
    
    const filteredInventory = inventory.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // ========================================================================
    // CALCULATIONS
    // ========================================================================
    
    const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.price, 0);
    
    const lowStockItems = inventory.filter(
        (item) => item.quantity > 0 && item.quantity <= item.minStock
    ).length;
    
    const outOfStockItems = inventory.filter((item) => item.quantity === 0).length;
    
    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================
    
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'In Stock':
                return 'success' as const;
            case 'Low Stock':
                return 'warning' as const;
            case 'Out of Stock':
                return 'error' as const;
            default:
                return 'neutral' as const;
        }
    };
    
    const formatCurrency = (amount: number): string => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(2)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(2)}K`;
        }
        return `₹${amount.toLocaleString('en-IN')}`;
    };
    
    // ========================================================================
    // RENDER
    // ========================================================================
    
    return (
        <AppLayout>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">
                        Inventory
                    </h1>
                    <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">
                        Track stock levels, manage products, and monitor inventory value.
                    </p>
                </div>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    Add Item
                </Button>
            </div>
            
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                            <Package size={24} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Items</p>
                            <h3 className="text-2xl font-bold dark:text-white">{inventory.length}</h3>
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                            <Package size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Value</p>
                            <h3 className="text-2xl font-bold dark:text-white">
                                {formatCurrency(totalValue)}
                            </h3>
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                            <AlertTriangle size={24} className="text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Low Stock</p>
                            <h3 className="text-2xl font-bold dark:text-white">{lowStockItems}</h3>
                        </div>
                    </div>
                </Card>
                
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                            <TrendingDown size={24} className="text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Out of Stock</p>
                            <h3 className="text-2xl font-bold dark:text-white">{outOfStockItems}</h3>
                        </div>
                    </div>
                </Card>
            </div>
            
            {/* Inventory Table */}
            <Card noPadding>
                {/* Search Header */}
                <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-munshi-dark-card rounded-t-2xl">
                    <div className="relative max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                        />
                        <input
                            placeholder="Search by name or SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200"
                        />
                    </div>
                </div>
                
                {/* Empty State */}
                {inventory.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-munshi-dark-card">
                        <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No inventory items
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Get started by adding your first inventory item.
                        </p>
                        <Button size="sm" onClick={() => setIsModalOpen(true)}>
                            <Plus size={16} className="mr-2" />
                            Add First Item
                        </Button>
                    </div>
                )}
                
                {/* Table */}
                {inventory.length > 0 && filteredInventory.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">SKU</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-right">Quantity</th>
                                    <th className="px-6 py-4 text-right">Price</th>
                                    <th className="px-6 py-4 text-right">Value</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-munshi-dark-card">
                                {filteredInventory.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-munshi-text dark:text-white">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                                            {item.sku}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span
                                                className={`font-mono font-medium ${
                                                    item.quantity === 0
                                                        ? 'text-red-600 dark:text-red-400'
                                                        : item.quantity <= item.minStock
                                                        ? 'text-yellow-600 dark:text-yellow-400'
                                                        : 'text-munshi-text dark:text-white'
                                                }`}
                                            >
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-sm">
                                            ₹{item.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-medium">
                                            ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={getStatusVariant(item.status)}>
                                                {item.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* No Search Results */}
                {inventory.length > 0 && filteredInventory.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-munshi-dark-card">
                        <p className="text-gray-500 dark:text-gray-400">
                            No items match &quot;{searchTerm}&quot;
                        </p>
                    </div>
                )}
            </Card>
            
            {/* Add Item Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Inventory Item"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>Add Item</Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <Input label="Product Name" placeholder="e.g. Laptop - Dell XPS 15" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="SKU" placeholder="LAP-001" />
                        <Input label="Category" placeholder="Electronics" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Quantity" type="number" placeholder="0" />
                        <Input label="Min Stock Level" type="number" placeholder="5" />
                    </div>
                    <Input label="Unit Price" type="number" placeholder="0" />
                </form>
            </Modal>
        </AppLayout>
    );
}

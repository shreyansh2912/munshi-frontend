'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Badge, Input, Modal } from '@/components/ui/UI';
import { MOCK_CATEGORIES } from '@/lib/constants';
import { Plus, TrendingUp, TrendingDown, Edit2, Trash2 } from 'lucide-react';
import { Category } from '@/lib/types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'expense': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'asset': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'liability': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Categories</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Organize your income and expenses into categories.</p>
        </div>
        <Button size="sm" onClick={() => handleOpenModal()}><Plus size={16} className="mr-2"/> Add Category</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Income Categories', count: groupedCategories.income?.length || 0, color: 'green' },
          { label: 'Expense Categories', count: groupedCategories.expense?.length || 0, color: 'red' },
          { label: 'Asset Categories', count: groupedCategories.asset?.length || 0, color: 'blue' },
          { label: 'Liability Categories', count: groupedCategories.liability?.length || 0, color: 'orange' },
        ].map((item, i) => (
          <Card key={i} className="p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">{item.label}</p>
            <h3 className={`text-3xl font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.count}</h3>
          </Card>
        ))}
      </div>

      {/* Categories by Type */}
      <div className="space-y-6">
        {Object.entries(groupedCategories).map(([type, cats]) => (
          <Card key={type}>
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-heading font-semibold text-munshi-indigo dark:text-white capitalize">{type}</h3>
                <Badge variant="neutral">{cats.length} categories</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {cats.map((category) => (
                <div key={category.id} className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:border-munshi-indigo/50 dark:hover:border-zinc-600 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-munshi-text dark:text-white mb-1">{category.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(category.type)}`}>
                        {category.type}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(category)}
                        className="p-1.5 text-gray-400 hover:text-munshi-indigo dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {category.budget && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Budget</span>
                        <span className="font-mono font-medium">₹{category.budget.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>{editingCategory ? "Update" : "Create"} Category</Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input label="Category Name" placeholder="e.g. Marketing" defaultValue={editingCategory?.name} />
          
          <div>
            <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              {['income', 'expense', 'asset', 'liability'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`p-3 rounded-lg border-2 transition-all text-left capitalize ${
                    editingCategory?.type === type
                      ? 'border-munshi-indigo bg-munshi-indigo/5 dark:border-white dark:bg-white/5'
                      : 'border-gray-200 dark:border-zinc-700 hover:border-munshi-indigo/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <Input label="Monthly Budget (Optional)" type="number" placeholder="0" defaultValue={editingCategory?.budget} />
        </form>
      </Modal>
    </AppLayout>
  );
}

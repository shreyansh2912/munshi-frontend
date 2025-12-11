'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Input, Modal, Badge } from '@/components/ui/UI';
import { MOCK_CUSTOMERS } from '@/lib/constants';
import { Search, Plus, User, Mail, Phone, MapPin, Edit2, Trash2, AlertTriangle, FileText } from 'lucide-react';
import { Customer } from '@/lib/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gstin?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (customer: Customer | null = null) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsDeleteConfirmOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleDelete = () => {
    if (editingCustomer) {
      setCustomers(customers.filter(c => c.id !== editingCustomer.id));
    }
    setIsDeleteConfirmOpen(false);
    setEditingCustomer(null);
  };

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Customers</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Manage your client database and details.</p>
        </div>
        <Button size="sm" onClick={() => handleOpenModal(null)}>
          <Plus size={16} className="mr-2"/> Add Customer
        </Button>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center bg-gray-50 dark:bg-munshi-dark-card rounded-t-2xl">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                placeholder="Search by name, email, or GSTIN..." 
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">GSTIN</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-munshi-dark-card">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-munshi-indigo/10 dark:bg-zinc-800 flex items-center justify-center text-munshi-indigo dark:text-white font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-munshi-text dark:text-white">{customer.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex items-center gap-2">
                       <Mail size={12} className="text-gray-400"/> {customer.email}
                    </div>
                    {customer.phone && (
                        <div className="flex items-center gap-2">
                           <Phone size={12} className="text-gray-400"/> {customer.phone}
                        </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {customer.gstin || '-'}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm font-medium text-munshi-text dark:text-white">
                    ₹{customer.balance.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={customer.status === 'active' ? 'success' : 'neutral'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-munshi-indigo dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          onClick={() => handleOpenModal(customer)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          onClick={() => handleDeleteClick(customer)}
                        >
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? "Edit Customer" : "Add New Customer"}
        footer={
           <>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingCustomer ? "Update Customer" : "Create Customer"}</Button>
           </>
        }
      >
         <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2">
                   <Input label="Business/Customer Name" placeholder="e.g. Acme Corp" defaultValue={editingCustomer?.name} icon={<User size={16}/>} />
               </div>
               <Input label="Email Address" type="email" placeholder="billing@acme.com" defaultValue={editingCustomer?.email} icon={<Mail size={16}/>} />
               <Input label="Phone Number" placeholder="+91 9876543210" defaultValue={editingCustomer?.phone} icon={<Phone size={16}/>} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <Input label="GSTIN" placeholder="27AAAAA0000A1Z5" defaultValue={editingCustomer?.gstin} icon={<FileText size={16}/>} />
               <div>
                  <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Status</label>
                  <select className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg px-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none" defaultValue={editingCustomer?.status || 'active'}>
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </select>
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-munshi-subtext dark:text-zinc-400 mb-1.5">Billing Address</label>
               <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 dark:text-zinc-600" size={16} />
                  <textarea 
                     className="w-full bg-white dark:bg-black border border-gray-200 dark:border-munshi-dark-border rounded-lg pl-10 pr-4 py-2.5 text-munshi-text dark:text-gray-100 outline-none resize-none h-24" 
                     placeholder="Enter full address..."
                     defaultValue={editingCustomer?.address}
                  ></textarea>
               </div>
            </div>
         </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Delete Customer"
        footer={
           <>
              <Button variant="ghost" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Confirm Delete</Button>
           </>
        }
      >
        <div className="flex gap-4">
           <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
              <AlertTriangle size={24} />
           </div>
           <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Delete {editingCustomer?.name}?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                 Are you sure you want to delete this customer? This action cannot be undone. Any historical invoices associated with this customer will be preserved but archived.
              </p>
           </div>
        </div>
      </Modal>
    </AppLayout>
  );
}

/**
 * Payments Scene (Client Component)
 * Handles payments UI and interactions
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, Button, Modal, Badge } from '@/components/ui/UI';
import { Search, Plus, DollarSign, TrendingUp, TrendingDown, Edit2, CheckCircle } from 'lucide-react';
import type { Payment, Customer } from '@/lib/api/types';
import PaymentForm from './components/PaymentForm';

interface PaymentsSceneProps {
  initialData: {
    payments: Payment[];
    customers: Customer[];
  };
}

export default function PaymentsScene({ initialData }: PaymentsSceneProps) {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>(initialData.payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'receipt' | 'payment'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'cleared'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const filteredPayments = payments.filter(p => {
    const matchesSearch = 
      p.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.amount.toString().includes(searchTerm);
    
    const matchesType = filterType === 'all' || p.paymentType === filterType;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setEditingPayment(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (payment: Payment) => {
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingPayment(null);
    router.refresh();
  };

  const handleMarkAsCleared = async (payment: Payment) => {
    try {
      const { api } = await import('@/lib/api');
      await api.payments.update(payment.id, {
        status: 'cleared',
        clearedAt: new Date().toISOString(),
      });
      
      setPayments(payments.map(p => 
        p.id === payment.id ? { ...p, status: 'cleared' as const } : p
      ));
      router.refresh();
    } catch (error) {
      console.error('Failed to mark payment as cleared:', error);
      alert('Failed to update payment status');
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cash: 'Cash',
      bank_transfer: 'Bank Transfer',
      upi: 'UPI',
      card: 'Card',
      cheque: 'Cheque',
      dd: 'DD',
      other: 'Other',
    };
    return labels[method] || method;
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'cleared':
        return 'success';
      case 'pending':
        return 'warning';
      case 'bounced':
        return 'error';
      case 'cancelled':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  // Calculate totals
  const totalReceipts = payments
    .filter(p => p.paymentType === 'receipt' && p.status === 'cleared')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalPayments = payments
    .filter(p => p.paymentType === 'payment' && p.status === 'cleared')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white">Payments & Banking</h1>
          <p className="text-munshi-subtext dark:text-gray-400 text-sm mt-1">Track receipts and payments across your business.</p>
        </div>
        <Button size="sm" onClick={handleOpenCreateModal}>
          <Plus size={16} className="mr-2"/> Record Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Receipts</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                ₹{totalReceipts.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Payments</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                ₹{totalPayments.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <TrendingDown className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Net Flow</p>
              <p className={`text-2xl font-bold mt-1 ${totalReceipts - totalPayments >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ₹{(totalReceipts - totalPayments).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-munshi-indigo/10 dark:bg-zinc-800 flex items-center justify-center">
              <DollarSign className="text-munshi-indigo dark:text-white" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-munshi-dark-card rounded-t-2xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                placeholder="Search by payment number, amount, or notes..." 
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200"
              >
                <option value="all">All Types</option>
                <option value="receipt">Receipts</option>
                <option value="payment">Payments</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-munshi-indigo text-munshi-text dark:text-gray-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="cleared">Cleared</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? 'No payments found matching your filters' 
                : 'No payments yet. Click "Record Payment" to create your first payment record.'}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Payment #</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Party</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-munshi-dark-card">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-munshi-text dark:text-white">
                        {payment.paymentNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={payment.paymentType === 'receipt' ? 'success' : 'info'}>
                        {payment.paymentType === 'receipt' ? 'Receipt' : 'Payment'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(payment.paymentDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {payment.party?.name || `Party #${payment.partyId}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <Badge variant="neutral">
                        {getPaymentMethodLabel(payment.paymentMethod)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${payment.paymentType === 'receipt' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {payment.paymentType === 'receipt' ? '+' : '-'}₹{payment.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadgeVariant(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {payment.status === 'pending' && (
                          <button 
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            onClick={() => handleMarkAsCleared(payment)}
                            title="Mark as cleared"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button 
                          className="p-2 text-gray-400 hover:text-munshi-indigo dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          onClick={() => handleOpenEditModal(payment)}
                          title="Edit payment"
                        >
                          <Edit2 size={16} />
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
          setEditingPayment(null);
        }}
        title={editingPayment ? "Edit Payment" : "Record New Payment"}
        size="large"
      >
        <PaymentForm
          payment={editingPayment}
          customers={initialData.customers}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingPayment(null);
          }}
        />
      </Modal>
    </AppLayout>
  );
}

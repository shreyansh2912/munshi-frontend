/**
 * Example: Using Ledger Store in a Component
 * This demonstrates how to use Zustand stores with the new service layer
 */

'use client';

import { useEffect } from 'react';
import { useLedgerStore } from '@/lib/stores';
import { toast } from 'sonner';
import type { CreateLedgerRequest } from '@/lib/api/types';

export default function LedgerExamplePage() {
  // Get state and actions from the store
  const { 
    ledgers, 
    currentLedger,
    isLoading, 
    error, 
    fetchLedgers, 
    createLedger,
    updateLedger,
    deleteLedger,
    clearError 
  } = useLedgerStore();

  // Fetch ledgers on component mount
  useEffect(() => {
    fetchLedgers();
  }, [fetchLedgers]);

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Create a new ledger
  const handleCreate = async () => {
    const newLedger: CreateLedgerRequest = {
      code: 'ACC-001',
      name: 'Cash Account',
      type: 'ASSET',
    };

    try {
      await createLedger(newLedger);
      toast.success('Ledger created successfully!');
    } catch (err) {
      // Error is already handled by the store
      console.error('Failed to create ledger:', err);
    }
  };

  // Update a ledger
  const handleUpdate = async (id: string) => {
    try {
      await updateLedger(id, {
        name: 'Updated Cash Account',
      });
      toast.success('Ledger updated successfully!');
    } catch (err) {
      console.error('Failed to update ledger:', err);
    }
  };

  // Delete a ledger
  const handleDelete = async (id: string) => {
    try {
      await deleteLedger(id);
      toast.success('Ledger deleted successfully!');
    } catch (err) {
      console.error('Failed to delete ledger:', err);
    }
  };

  // Filter ledgers by type
  const handleFilterByType = async (type: string) => {
    await fetchLedgers({ type });
  };

  // Search ledgers
  const handleSearch = async (search: string) => {
    await fetchLedgers({ search });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading ledgers...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ledger Management</h1>

      {/* Actions */}
      <div className="mb-6 space-x-4">
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Ledger
        </button>
        <button
          onClick={() => handleFilterByType('ASSET')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Filter Assets
        </button>
      </div>

      {/* Ledgers List */}
      <div className="space-y-4">
        {ledgers.length === 0 ? (
          <p className="text-gray-500">No ledgers found</p>
        ) : (
          ledgers.map((ledger: any) => (
            <div
              key={ledger.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{ledger.accountName}</h3>
                <p className="text-sm text-gray-600">
                  {ledger.accountCode} - {ledger.accountType}
                </p>
                {ledger.description && (
                  <p className="text-sm text-gray-500 mt-1">{ledger.description}</p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(ledger.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ledger.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Current Ledger Details */}
      {currentLedger && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current Ledger</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(currentLedger, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

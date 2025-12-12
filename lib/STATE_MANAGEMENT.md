# State Management & API Services

This directory contains the Zustand stores and API service layer for the Munshi frontend application.

## Directory Structure

```
lib/
├── services/          # API service functions
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── ledger.service.ts
│   ├── invoices.service.ts
│   ├── customers.service.ts
│   └── index.ts
├── stores/            # Zustand state management
│   ├── auth.store.ts
│   ├── user.store.ts
│   ├── ledger.store.ts
│   ├── invoices.store.ts
│   ├── customers.store.ts
│   └── index.ts
└── api/              # API client & configuration
    ├── client.ts
    ├── config.ts
    ├── types.ts
    └── storage.ts
```

## Usage

### 1. Using API Services Directly

Each service exports individual functions that use the `apiClient`:

```typescript
import { userService } from '@/lib/services';

// Fetch user profile
const user = await userService.getProfile();

// Update profile
const updated = await userService.updateProfile({ firstName: 'John' });
```

### 2. Using Zustand Stores (Recommended)

Stores provide state management with automatic caching and error handling:

```typescript
'use client';

import { useUserStore } from '@/lib/stores';

function ProfilePage() {
  const { currentUser, isLoading, error, fetchProfile, updateProfile } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdate = async (data) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return <ProfileForm user={currentUser} onSubmit={handleUpdate} />;
}
```

### 3. Available Stores

#### Auth Store
```typescript
import { useAuthStore } from '@/lib/stores';

const { 
  isAuthenticated, 
  login, 
  register, 
  logout, 
  checkAuth 
} = useAuthStore();

// Login
await login({ email, password });

// Register
await register({ email, password, firstName, lastName });

// Logout
await logout();
```

#### User Store
```typescript
import { useUserStore } from '@/lib/stores';

const { 
  currentUser, 
  users, 
  fetchProfile, 
  updateProfile, 
  fetchUsers 
} = useUserStore();
```

#### Ledger Store
```typescript
import { useLedgerStore } from '@/lib/stores';

const { 
  ledgers, 
  currentLedger, 
  fetchLedgers, 
  createLedger, 
  updateLedger, 
  deleteLedger 
} = useLedgerStore();

// Fetch all ledgers
await fetchLedgers();

// Create new ledger
await createLedger({
  accountCode: 'ACC-001',
  accountName: 'Cash',
  accountType: 'ASSET'
});
```

#### Invoices Store
```typescript
import { useInvoicesStore } from '@/lib/stores';

const { 
  invoices, 
  currentInvoice, 
  fetchInvoices, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice 
} = useInvoicesStore();
```

#### Customers Store
```typescript
import { useCustomersStore } from '@/lib/stores';

const { 
  customers, 
  currentCustomer, 
  fetchCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} = useCustomersStore();
```

## Features

### ✅ Zustand State Management
- Centralized state for all API data
- Automatic loading and error states
- DevTools integration for debugging
- Persistent storage for auth and user data

### ✅ Separated Service Layer
- Individual service files per domain
- Reusable API functions
- Type-safe with TypeScript
- Uses the production-grade `apiClient`

### ✅ Error Handling
- Automatic error catching in stores
- Error state management
- `clearError()` method to reset errors

### ✅ Loading States
- `isLoading` flag in all stores
- Automatic loading state management

### ✅ CRUD Operations
- Full Create, Read, Update, Delete support
- Optimistic updates in stores
- Automatic state synchronization

## Best Practices

1. **Use stores in components** for state management
2. **Use services directly** only when you don't need state persistence
3. **Always handle errors** with try-catch when calling store actions
4. **Clear errors** after displaying them to users
5. **Use TypeScript types** from `@/lib/api/types`

## Example: Complete Flow

```typescript
'use client';

import { useEffect } from 'react';
import { useLedgerStore } from '@/lib/stores';
import { toast } from 'sonner';

export default function LedgerPage() {
  const { 
    ledgers, 
    isLoading, 
    error, 
    fetchLedgers, 
    createLedger,
    clearError 
  } = useLedgerStore();

  useEffect(() => {
    fetchLedgers();
  }, [fetchLedgers]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleCreate = async (data) => {
    try {
      await createLedger(data);
      toast.success('Ledger created successfully!');
    } catch (err) {
      // Error is already in store, just log it
      console.error('Failed to create ledger:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <LedgerList ledgers={ledgers} />
      <CreateLedgerForm onSubmit={handleCreate} />
    </div>
  );
}
```

## Migration Guide

If you're migrating from the old `lib/api/services.ts`:

**Before:**
```typescript
import { api } from '@/lib/api';
const users = await api.user.listUsers();
```

**After (with services):**
```typescript
import { userService } from '@/lib/services';
const users = await userService.listUsers();
```

**After (with stores - recommended):**
```typescript
import { useUserStore } from '@/lib/stores';
const { users, fetchUsers } = useUserStore();
await fetchUsers();
```

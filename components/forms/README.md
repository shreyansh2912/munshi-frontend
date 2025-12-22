# Form Validation System - Complete Guide

## Overview

Production-ready form system with specialized input components, Zod validation, and react-hook-form integration.

## Installation

Required packages (already installed):
```bash
npm install react-hook-form zod @hookform/resolvers sonner
```

## Core Components

### Form
Main form wrapper with automatic validation and error handling.

```tsx
import { Form } from '@/components/forms';
import { customerFormSchema } from '@/lib/validations/forms';

<Form
  schema={customerFormSchema}
  onSubmit={handleSubmit}
  defaultValues={{ billingCountry: 'IN' }}
  className="space-y-6"
>
  {/* Form fields */}
</Form>
```

### FormField
Wrapper for form fields with label and error display.

```tsx
<FormField name="email" label="Email Address" required helpText="We'll never share your email">
  <Input name="email" type="email" />
</FormField>
```

## Specialized Input Components

### Basic Inputs

**Input** - Standard text input
```tsx
<Input name="name" placeholder="John Doe" maxLength={255} showCounter />
```

**Textarea** - Multi-line text
```tsx
<Textarea name="description" placeholder="Details..." rows={4} maxLength={1000} />
```

**Select** - Dropdown selection
```tsx
<Select
  name="country"
  options={[
    { value: 'IN', label: 'India' },
    { value: 'US', label: 'United States' }
  ]}
/>
```

### Specialized Inputs

**PANInput** - PAN card validation (AAAAA9999A)
```tsx
<PANInput name="pan" placeholder="ABCDE1234F" />
```

**GSTInput** - GSTIN validation (15 characters)
```tsx
<GSTInput name="gstin" placeholder="27ABCDE1234F1Z5" />
```

**PhoneInput** - Indian phone number
```tsx
<PhoneInput name="phone" placeholder="+91 98765 43210" />
```

**DatePicker** - Date selection (NEW)
```tsx
<DatePicker name="invoiceDate" min="2024-01-01" max="2024-12-31" />
```

**CurrencyInput** - Amount with ₹ symbol (NEW)
```tsx
<CurrencyInput name="amount" placeholder="0.00" />
```

**HSNInput** - HSN/SAC code validation (NEW)
```tsx
<HSNInput name="hsnCode" type="hsn" maxLength={8} />
```

**PercentageInput** - Percentage with % symbol (NEW)
```tsx
<PercentageInput name="taxRate" min={0} max={100} decimals={2} />
```

**SKUInput** - Product SKU (auto-uppercase) (NEW)
```tsx
<SKUInput name="sku" placeholder="PROD-001" maxLength={100} showCounter />
```

## Validation Schemas

Located in `lib/validations/`:
- **fields.ts** - Reusable field validators (PAN, GST, phone, email, etc.)
- **forms.ts** - Complete form schemas (customer, product, invoice, payment)
- **schemas.ts** - Additional validation schemas

### Example Schema
```typescript
import { z } from 'zod';
import { panSchema, gstinSchema } from '@/lib/validations/fields';

export const myFormSchema = z.object({
  name: z.string().min(1, 'Required').max(255),
  pan: panSchema.optional(),
  gstin: gstinSchema.optional(),
});
```

## Complete Examples

See `components/examples/` for full working examples:
- **CustomerForm.tsx** - Customer creation with tax info and addresses
- **ProductForm.tsx** - Product with SKU, HSN codes, inventory settings
- **PaymentForm.tsx** - Payment recording with multiple payment methods

## Usage with API

### Using Custom Hook
```tsx
import { useFormSubmission } from '@/lib/hooks/useFormSubmission';
import { customersService } from '@/lib/services';

const { submit, isSubmitting } = useFormSubmission({
  onSubmit: customersService.create,
  onSuccess: () => router.push('/customers'),
  successMessage: 'Customer created successfully',
});

<Form schema={customerFormSchema} onSubmit={submit}>
  {/* fields */}
</Form>
```

### Manual Implementation
```tsx
const handleSubmit = async (data) => {
  try {
    await customersService.create(data);
    toast.success('Success!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

## Features

✅ **Automatic validation** - Zod schemas validated before submission  
✅ **Type-safe** - Full TypeScript support  
✅ **Error display** - Field-level error messages  
✅ **Loading states** - Built-in submission handling  
✅ **Toast notifications** - Success/error feedback (via sonner)  
✅ **Input formatting** - Auto-format PAN, GST, phone, currency  
✅ **Character counters** - Visual feedback for max length  
✅ **Accessibility** - Proper labels, ARIA attributes

## Best Practices

1. **Always use FormField** for consistent layout and error display
2. **Match backend validation** - Keep Zod schemas in sync with API
3. **Provide helpful error messages** - User-friendly validation text
4. **Use appropriate input types** - PANInput for PAN, CurrencyInput for amounts
5. **Add loading states** - Disable buttons during submission
6. **Show success feedback** - Toast notifications for user confirmation

## Troubleshooting

**Validation not working?**
- Ensure field `name` matches schema key exactly
- Check schema is passed to `<Form schema={...}>`

**Errors not displaying?**
- Wrap input in `<FormField>`
- Verify error messages in Zod schema

**Form not submitting?**
- Check browser console for validation errors
- Ensure `onSubmit` handler is async and handles errors

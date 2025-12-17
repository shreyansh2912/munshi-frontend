/**
 * Quick Fix for CustomerForm - Field Error Display
 * 
 * Add this to your existing CustomerForm.tsx to show validation errors
 */

// 1. ADD THIS STATE at the top with your other useState:
const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

// 2. UPDATE handleChange to clear errors when user types:
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  
  // Clear field error when user types
  if (fieldErrors[name]) {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
  
  setFormData(prev => ({
    ...prev,
    [name]: type === 'number' ? parseFloat(value) || 0 : value
  }));
};

// 3. UPDATE the catch block in handleSubmit:
catch (err: any) {
  console.error('Customer save error:', err);
  
  // Check for validation errors (NEW ERROR FORMAT)
  if (err.errors && typeof err.errors === 'object') {
    setFieldErrors(err.errors);
    setError('Please fix the errors below');
    
    // Focus first error field
    const firstField = Object.keys(err.errors)[0];
    if (firstField) {
      setTimeout(() => {
        const element = document.getElementsByName(firstField)[0] as HTMLElement;
        element?.focus();
      }, 100);
    }
  } else {
    setError(err.message || 'Failed to save customer');
  }
}

// 4. UPDATE EACH INPUT to show errors.  Example for billingPincode:

// BEFORE:
<input
  type="text"
  name="billingPincode"
  value={formData.billingPincode}
  onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300..."
  placeholder="Pincode"
/>

// AFTER:
<div>
  <input
    type="text"
    name="billingPincode"
    value={formData.billingPincode}
    onChange={handleChange}
    className={`w-full px-4 py-2 border ${
      fieldErrors.billingPincode ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300'
    } dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
    placeholder="Pincode"
  />
  {fieldErrors.billingPincode && (
    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
      {fieldErrors.billingPincode}
    </p>
  )}
</div>

// REPEAT FOR EACH FIELD: billingPincode, shippingPincode, pan, gstin, etc.

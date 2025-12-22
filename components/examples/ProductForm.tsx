/**
 * Example Product Form
 * Demonstrates product creation with specialized input components
 */

'use client';

import React, { useState } from 'react';
import { Form, FormField, Input, SKUInput, HSNInput, Select, Textarea } from '../forms';
import { productFormSchema, ProductFormData } from '@/lib/validations/forms';
import { Button } from '../ui/UI';
import { toast } from 'sonner';

export function ProductForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            console.log('Submitting product data:', data);
            
            // Call your API here
            // Example: await productsService.create(data);
            
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Product created successfully!');
            
            // For now, simulating success until API is integrated
            // throw new Error('API integration pending');
        } catch (error: any) {
            console.error('Form submission error:', error);
            toast.error(error.message || 'Failed to create product');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-heading font-bold text-munshi-indigo dark:text-white mb-6">
                Create Product
            </h2>

            <Form
                schema={productFormSchema}
                onSubmit={handleSubmit}
                defaultValues={{
                    productType: 'goods',
                    hasVariants: false,
                    trackInventory: true,
                }}
                className="space-y-6"
            >
                {/* Basic Information */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Basic Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="sku" label="SKU" required helpText="Product code (unique identifier)">
                            <SKUInput name="sku" placeholder="PROD-001" maxLength={100} />
                        </FormField>

                        <FormField name="name" label="Product Name" required>
                            <Input name="name" placeholder="Premium Widget" maxLength={255} />
                        </FormField>

                        <FormField name="description" label="Description" className="md:col-span-2">
                            <Textarea name="description" placeholder="Detailed product description" maxLength={1000} rows={3} />
                        </FormField>
                    </div>
                </div>

                {/* Classification */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Classification
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="productType" label="Product Type">
                            <Select
                                name="productType"
                                options={[
                                    { value: 'goods', label: 'Goods' },
                                    { value: 'service', label: 'Service' },
                                ]}
                            />
                        </FormField>

                        <FormField name="categoryId" label="Category">
                            <Input name="categoryId" type="number" placeholder="Select category" />
                        </FormField>

                        <FormField name="hsnCode" label="HSN Code" helpText="For goods (4-8 digits)">
                            <HSNInput name="hsnCode" type="hsn" />
                        </FormField>

                        <FormField name="sacCode" label="SAC Code" helpText="For services (6 digits)">
                            <Input name="sacCode" placeholder="e.g., 995411" maxLength={50} />
                        </FormField>
                    </div>
                </div>

                {/* Inventory Settings */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-munshi-indigo dark:text-white mb-4">
                        Inventory Settings
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="unitId" label="Unit of Measurement">
                            <Input name="unitId" type="number" placeholder="e.g., 1 (Pieces)" />
                        </FormField>

                        <div className="md:col-span-2 space-y-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="trackInventory" defaultChecked className="w-4 h-4 rounded text-munshi-indigo" />
                                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                    Track inventory for this product
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="hasVariants" className="w-4 h-4 rounded text-munshi-indigo" />
                                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                    This product has variants (sizes, colors, etc.)
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Product'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

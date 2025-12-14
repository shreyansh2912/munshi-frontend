/**
 * API Types
 * Type definitions for API requests and responses
 */

// ==================== Request/Response Types ====================

export interface APIResponse<T = any> {
    success: true;
    data: T;
    message?: string;
}

export interface APIError {
    success: false;
    statusCode: number;
    message: string;
    errorCode: string;
    details?: any;
    timestamp: string;
}

export interface RequestConfig {
    skipAuth?: boolean;
    skipRetry?: boolean;
    timeout?: number;
    headers?: Record<string, string>;
}

// ==================== Authentication Types ====================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

// ==================== User Types ====================

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
}

// ==================== Ledger Types ====================

export interface LedgerAccount {
    id: string;
    name: string;
    type: string;
    balance: number;
    currency?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateLedgerRequest {
    name: string;
    type: string;
    balance?: number;
    currency?: string;
}

export interface UpdateLedgerRequest {
    name?: string;
    type?: string;
    balance?: number;
    currency?: string;
}

// ==================== Invoice Types ====================

/**
 * Invoice Tax Line
 */
export interface InvoiceTaxLine {
    id?: string | number;
    invoiceItemId: number;
    orgId: number;
    taxRateId: number;
    taxType: 'CGST' | 'SGST' | 'IGST' | 'CESS' | 'TDS' | 'TCS';
    taxRate: number;
    taxableAmount: number;
    taxAmount: number;
    createdAt?: string;
}

/**
 * Invoice Item
 */
export interface InvoiceItem {
    id?: string | number;
    invoiceId?: number;
    orgId?: number;
    lineNumber: number;
    productVariantId?: number;
    description: string;
    hsnCode?: string;
    sacCode?: string;
    quantity: number;
    unitId?: number;
    unitPrice: number;
    discountPercent?: number;
    discountAmount?: number;
    taxableAmount: number;
    isTaxInclusive?: boolean;
    taxLines?: InvoiceTaxLine[];
    createdAt?: string;
}

/**
 * Invoice
 */
export interface Invoice {
    id: string | number;
    orgId: number;
    uuid: string;
    invoiceNumber: string;
    invoiceType?: 'tax_invoice' | 'proforma' | 'credit_note' | 'debit_note' | 'export_invoice';
    customerId: number;
    customer?: Customer;
    invoiceDate: string;
    dueDate?: string;
    placeOfSupply?: string;
    isReverseCharge?: boolean;
    isExport?: boolean;
    exportType?: 'with_payment' | 'without_payment' | 'deemed_export';
    shippingBillNumber?: string;
    shippingBillDate?: string;
    portCode?: string;
    currency?: string;
    exchangeRate?: string;
    subtotal: number;
    discountAmount?: number;
    taxableAmount: number;
    taxAmount: number;
    roundOff?: number;
    totalAmount: number;
    amountPaid?: number;
    balanceDue?: number;
    status?: 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled' | 'void';
    paymentStatus?: 'unpaid' | 'partially_paid' | 'paid';
    notes?: string;
    termsAndConditions?: string;
    items?: InvoiceItem[];
    createdBy?: string;
    sentAt?: string;
    paidAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Create Invoice Request
 */
export interface CreateInvoiceRequest {
    invoiceNumber?: string;
    invoiceType?: 'tax_invoice' | 'proforma' | 'credit_note' | 'debit_note' | 'export_invoice';
    customerId: number;
    invoiceDate: string;
    dueDate?: string;
    placeOfSupply?: string;
    isReverseCharge?: boolean;
    isExport?: boolean;
    exportType?: 'with_payment' | 'without_payment' | 'deemed_export';
    currency?: string;
    items: Omit<InvoiceItem, 'id' | 'invoiceId' | 'orgId' | 'createdAt'>[];
    notes?: string;
    termsAndConditions?: string;
}

/**
 * Update Invoice Request
 */
export interface UpdateInvoiceRequest {
    invoiceNumber?: string;
    customerId?: number;
    invoiceDate?: string;
    dueDate?: string;
    placeOfSupply?: string;
    items?: Omit<InvoiceItem, 'id' | 'invoiceId' | 'orgId' | 'createdAt'>[];
    status?: 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled' | 'void';
    notes?: string;
    termsAndConditions?: string;
}

// ==================== Customer Types ====================

export interface Customer {
    id: string | number;
    uuid?: string;
    orgId?: number;
    customerCode?: string;
    name: string;
    legalName?: string;
    gstin?: string;
    pan?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    billingAddressLine1?: string;
    billingAddressLine2?: string;
    billingCity?: string;
    billingState?: string;
    billingPincode?: string;
    billingCountry?: string;
    shippingAddressLine1?: string;
    shippingAddressLine2?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingPincode?: string;
    shippingCountry?: string;
    creditLimit?: number;
    paymentTermsDays?: number;
    accountId?: number;
    isActive?: boolean;
    meta?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    // UI-only fields for legacy support
    balance?: number;
    status?: 'active' | 'inactive';
    address?: string; // Deprecated, use billing/shipping addresses
}

export interface CreateCustomerRequest {
    customerCode?: string;
    name: string;
    legalName?: string;
    gstin?: string;
    pan?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    billingAddressLine1?: string;
    billingAddressLine2?: string;
    billingCity?: string;
    billingState?: string;
    billingPincode?: string;
    billingCountry?: string;
    shippingAddressLine1?: string;
    shippingAddressLine2?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingPincode?: string;
    shippingCountry?: string;
    creditLimit?: number;
    paymentTermsDays?: number;
    meta?: Record<string, any>;
}

export interface UpdateCustomerRequest {
    customerCode?: string;
    name?: string;
    legalName?: string;
    gstin?: string;
    pan?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    billingAddressLine1?: string;
    billingAddressLine2?: string;
    billingCity?: string;
    billingState?: string;
    billingPincode?: string;
    billingCountry?: string;
    shippingAddressLine1?: string;
    shippingAddressLine2?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingPincode?: string;
    shippingCountry?: string;
    creditLimit?: number;
    paymentTermsDays?: number;
    isActive?: boolean;
    meta?: Record<string, any>;
}

// ==================== Pagination Types ====================

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ==================== Custom Error Classes ====================

/**
 * Base API Client Error
 */
export class APIClientError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public code: string,
        public details?: any
    ) {
        super(message);
        this.name = 'APIClientError';
    }
}

/**
 * Network Error (no response from server)
 */
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

/**
 * Authentication Error (401, 403)
 */
export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

/**
 * Validation Error (422)
 */
export class ValidationError extends Error {
    constructor(
        message: string,
        public fields?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

// ==================== Product Types ====================

export interface ProductCategory {
    id: string | number;
    orgId: number;
    name: string;
    parentId?: number;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Unit {
    id: string | number;
    orgId: number;
    name: string;
    shortCode: string;
    unitType: 'quantity' | 'weight' | 'volume' | 'length' | 'area' | 'time' | 'other';
    baseUnitId?: number;
    conversionFactor?: string;
    createdAt?: string;
}

export interface ProductVariant {
    id: string | number;
    productId: number;
    orgId: number;
    uuid: string;
    variantSku: string;
    variantName?: string;
    attributes?: Record<string, string>;
    costPrice?: number;
    sellingPrice?: number;
    mrp?: number;
    barcode?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface Product {
    id: string | number;
    orgId: number;
    uuid: string;
    sku: string;
    name: string;
    description?: string;
    categoryId?: number;
    category?: ProductCategory;
    hsnCode?: string;
    sacCode?: string;
    productType?: 'goods' | 'service';
    unitId?: number;
    unit?: Unit;
    hasVariants?: boolean;
    trackInventory?: boolean;
    isActive?: boolean;
    variants?: ProductVariant[];
    meta?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    // Computed/UI fields
    stockLevel?: number;
    lowStock?: boolean;
}

export interface CreateProductRequest {
    sku: string;
    name: string;
    description?: string;
    categoryId?: number;
    hsnCode?: string;
    sacCode?: string;
    productType?: 'goods' | 'service';
    unitId?: number;
    hasVariants?: boolean;
    trackInventory?: boolean;
    meta?: Record<string, any>;
}

export interface UpdateProductRequest {
    sku?: string;
    name?: string;
    description?: string;
    categoryId?: number;
    hsnCode?: string;
    sacCode?: string;
    productType?: 'goods' | 'service';
    unitId?: number;
    hasVariants?: boolean;
    trackInventory?: boolean;
    isActive?: boolean;
    meta?: Record<string, any>;
}

export interface StockLocation {
    id: string | number;
    orgId: number;
    uuid: string;
    name: string;
    locationType: 'warehouse' | 'store' | 'transit' | 'virtual';
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface StockSummary {
    id: string | number;
    orgId: number;
    productVariantId: number;
    locationId: number;
    batchId?: number;
    quantity: number;
    reservedQuantity: number;
    availableQuantity: number;
    lastMovementId?: number;
    lastUpdatedAt?: string;
}

// ==================== Payment Types ====================

export interface Payment {
    id: string | number;
    uuid: string;
    orgId: number;
    paymentNumber: string;
    paymentType: 'receipt' | 'payment';
    paymentDate: string;
    partyType: 'customer' | 'supplier' | 'other';
    partyId: number;
    party?: Customer; // Populated relation
    amount: number;
    currency?: string;
    exchangeRate?: string;
    paymentMethod: 'cash' | 'bank_transfer' | 'upi' | 'card' | 'cheque' | 'dd' | 'other';
    bankAccountId?: number;
    referenceNumber?: string;
    chequeNumber?: string;
    chequeDate?: string;
    upiTransactionId?: string;
    notes?: string;
    status: 'pending' | 'cleared' | 'bounced' | 'cancelled';
    clearedAt?: string;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePaymentRequest {
    paymentNumber: string;
    paymentType: 'receipt' | 'payment';
    paymentDate: string;
    partyType: 'customer' | 'supplier' | 'other';
    partyId: number;
    amount: number;
    currency?: string;
    exchangeRate?: string;
    paymentMethod: 'cash' | 'bank_transfer' | 'upi' | 'card' | 'cheque' | 'dd' | 'other';
    bankAccountId?: number;
    referenceNumber?: string;
    chequeNumber?: string;
    chequeDate?: string;
    upiTransactionId?: string;
    notes?: string;
    status?: 'pending' | 'cleared' | 'bounced' | 'cancelled';
    clearedAt?: string;
}

export interface UpdatePaymentRequest {
    paymentNumber?: string;
    paymentType?: 'receipt' | 'payment';
    paymentDate?: string;
    partyType?: 'customer' | 'supplier' | 'other';
    partyId?: number;
    amount?: number;
    currency?: string;
    exchangeRate?: string;
    paymentMethod?: 'cash' | 'bank_transfer' | 'upi' | 'card' | 'cheque' | 'dd' | 'other';
    bankAccountId?: number;
    referenceNumber?: string;
    chequeNumber?: string;
    chequeDate?: string;
    upiTransactionId?: string;
    notes?: string;
    status?: 'pending' | 'cleared' | 'bounced' | 'cancelled';
    clearedAt?: string;
}

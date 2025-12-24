/**
 * API Module - Index
 * Central export point for all API-related functionality
 */

// Configuration
export { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS, HTTP_STATUS } from './config';

// Types
export type {
    APIResponse,
    APIError,
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    User,
    UpdateProfileRequest,
    LedgerAccount,
    CreateLedgerRequest,
    UpdateLedgerRequest,
    Invoice,
    InvoiceItem,
    CreateInvoiceRequest,
    UpdateInvoiceRequest,
    Customer,
    CreateCustomerRequest,
    UpdateCustomerRequest,
    PaginatedResponse,
    RequestConfig,
} from './types';

export {
    APIClientError,
    NetworkError,
    AuthenticationError,
    ValidationError,
    RateLimitError,
} from './types';

// Error utilities
export {
    isRateLimitError,
    isValidationError,
    isAuthenticationError,
    isNetworkError,
    isAPIError,
    getErrorMessage,
    getRetryDelay,
    formatRetryMessage,
    handleAPIError,
} from './error-utils';

// Storage
export { tokenStorage } from './storage';

// Client
export { apiClient } from './client';

// Services
export { api, authService, userService, ledgerService, healthService, productsService, paymentsService } from './services';

/**
 * API Error Utilities
 * Helper functions for handling API errors in application code
 */

import {
    APIClientError,
    NetworkError,
    AuthenticationError,
    ValidationError,
    RateLimitError,
} from './types';

/**
 * Type guard to check if error is a RateLimitError
 */
export function isRateLimitError(error: unknown): error is RateLimitError {
    return error instanceof RateLimitError;
}

/**
 * Type guard to check if error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
}

/**
 * Type guard to check if error is an AuthenticationError
 */
export function isAuthenticationError(error: unknown): error is AuthenticationError {
    return error instanceof AuthenticationError;
}

/**
 * Type guard to check if error is a NetworkError
 */
export function isNetworkError(error: unknown): error is NetworkError {
    return error instanceof NetworkError;
}

/**
 * Type guard to check if error is an APIClientError
 */
export function isAPIError(error: unknown): error is APIClientError {
    return error instanceof APIClientError;
}

/**
 * Extract user-friendly error message from any error
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'An unexpected error occurred';
}

/**
 * Get retry delay in seconds from rate limit error
 */
export function getRetryDelay(error: unknown): number | null {
    if (isRateLimitError(error)) {
        return error.retryAfter ?? null;
    }
    return null;
}

/**
 * Format retry message for display to user
 */
export function formatRetryMessage(error: unknown): string {
    const delay = getRetryDelay(error);

    if (delay === null) {
        return 'Please try again later';
    }

    if (delay < 60) {
        return `Please retry in ${delay} seconds`;
    }

    const minutes = Math.ceil(delay / 60);
    return `Please retry in ${minutes} minute${minutes > 1 ? 's' : ''}`;
}

/**
 * Handle API errors with common patterns
 * Returns a user-friendly error message
 */
export function handleAPIError(error: unknown): string {
    if (isRateLimitError(error)) {
        return `${error.message}. ${formatRetryMessage(error)}`;
    }

    if (isValidationError(error)) {
        if (error.errors) {
            // Combine all validation errors into one message
            const messages = Object.values(error.errors).join(', ');
            return `Validation failed: ${messages}`;
        }
        return error.message;
    }

    if (isAuthenticationError(error)) {
        return 'Please log in to continue';
    }

    if (isNetworkError(error)) {
        return 'Network error. Please check your connection and try again.';
    }

    if (isAPIError(error)) {
        return error.message;
    }

    return getErrorMessage(error);
}

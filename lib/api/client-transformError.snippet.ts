    /**
     * Transform axios error to custom error
     */
    private transformError(error: AxiosError<APIError>): Error {
    if (error.response) {
        const { status, data } = error.response;

        // Validation error (both 400 and 422)
        if (status === HTTP_STATUS.BAD_REQUEST || status === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
            // Check if it's a validation error by errorCode or errors object
            if (data.errorCode === 'VALIDATION_ERROR' || data.errors) {
                return new ValidationError(
                    data.message || 'Validation failed',
                    data.errors as any // errors is now an object: { field: "message" }
                );
            }
        }

        // API error
        return new APIClientError(
            data.message || 'An error occurred',
            status,
            data.errorCode || 'UNKNOWN_ERROR',
            data.details
        );
    }

    // Network error
    return new NetworkError(error.message || 'Network error occurred');
}

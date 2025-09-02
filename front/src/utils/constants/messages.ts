/** Messages displayed to user interface or return statements */
export const messages = {
    success: { USER: 'User updated successfully' },
    error: {
        USER: 'Error updating user',
        RSS: 'Error fetching RSS feed',
        DEFAULT: 'An error occurred',
    },
}

/** Error messages returned by the backend */
export const backErrors = {
    MISSING_TOKEN: 'Missing token',
    INVALID_TOKEN: 'Invalid token',
    UNAUTHORIZED: 'Unauthorized',
    SERVER_ERROR: 'Server error',
    FEED_ERROR: 'Feed CRUD error',
    COLLECTION_NAME_ALREADY_TAKEN: 'Collection name already taken',
}

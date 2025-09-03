/** Messages displayed to user interface or return statements */
export const messages = {
    success: { USER: 'User updated successfully' },
    error: {
        USER: 'Error updating user',
        RSS: 'Error fetching RSS feed',
        DEFAULT: 'An error occurred',
        MUST_SELECT_COLLECTION:
            'Please select or create a collection to publish in',
    },
}

/** Error messages returned by the backend */
export const backErrors = {
    ARTICLE_ERROR: 'Article CRUD error',
    COLLECTION_ERROR: 'Collection CRUD error',
    COLLECTION_NAME_ALREADY_TAKEN: 'Collection name already taken',
    DATABASE_CONNECTION_ERROR: 'Database connection error',
    FEED_ERROR: 'Feed CRUD error',
    INVALID_TOKEN: 'Invalid token',
    MISSING_TOKEN: 'Missing token',
    SERVER_ERROR: 'Server error',
    UNAUTHORIZED: 'Unauthorized',
    USER_ERROR: 'User CRUD error',
}

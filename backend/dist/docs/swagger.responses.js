// Swagger Response Definitions in TypeScript
export const swaggerResponses = {
    // Common Error Responses
    BadRequest: {
        description: 'Bad Request - Invalid input data',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
                example: {
                    message: 'Invalid input data',
                    code: 'BAD_REQUEST',
                    timestamp: '2024-01-15T10:30:00Z',
                },
            },
        },
    },
    Unauthorized: {
        description: 'Unauthorized - Authentication required',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
                example: {
                    message: 'Access token required',
                    code: 'UNAUTHORIZED',
                    timestamp: '2024-01-15T10:30:00Z',
                },
            },
        },
    },
    Forbidden: {
        description: 'Forbidden - Insufficient permissions',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
                example: {
                    message: 'Insufficient permissions',
                    code: 'FORBIDDEN',
                    timestamp: '2024-01-15T10:30:00Z',
                },
            },
        },
    },
    NotFound: {
        description: 'Not Found - Resource not found',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
                example: {
                    message: 'Resource not found',
                    code: 'NOT_FOUND',
                    timestamp: '2024-01-15T10:30:00Z',
                },
            },
        },
    },
    Conflict: {
        description: 'Conflict - Resource already exists',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
                example: {
                    message: 'Resource with this identifier already exists',
                    code: 'CONFLICT',
                    timestamp: '2024-01-15T10:30:00Z',
                },
            },
        },
    },
    InternalServerError: {
        description: 'Internal Server Error',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
                example: {
                    message: 'Internal server error',
                    code: 'INTERNAL_ERROR',
                    timestamp: '2024-01-15T10:30:00Z',
                },
            },
        },
    },
    // Authentication Responses
    LoginSuccess: {
        description: 'Login successful',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        token: {
                            type: 'string',
                        },
                        refreshToken: {
                            type: 'string',
                        },
                        user: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                    required: ['message', 'token', 'user'],
                },
                example: {
                    message: 'Login successful',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        email: 'user@example.com',
                        firstName: 'John',
                        lastName: 'Doe',
                        role: 'USER',
                        isActive: true,
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-15T10:30:00Z',
                    },
                },
            },
        },
    },
    // User Responses
    UserCreated: {
        description: 'User created successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        user: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                    required: ['message', 'user'],
                },
                example: {
                    message: 'User created successfully',
                    user: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        email: 'user@example.com',
                        firstName: 'John',
                        lastName: 'Doe',
                        role: 'USER',
                        isActive: true,
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-15T10:30:00Z',
                    },
                },
            },
        },
    },
    UsersList: {
        description: 'Users list retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        users: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                        pagination: {
                            $ref: '#/components/schemas/PaginationMeta',
                        },
                    },
                    required: ['users'],
                },
                example: {
                    users: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'John Doe',
                            email: 'john@example.com',
                            role: 'USER',
                            createdAt: '2024-01-15T10:30:00Z',
                        },
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 1,
                        pages: 1,
                    },
                },
            },
        },
    },
    // Product Responses
    ProductCreated: {
        description: 'Product created successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        product: {
                            $ref: '#/components/schemas/Product',
                        },
                    },
                    required: ['message', 'product'],
                },
                example: {
                    message: 'Product created successfully',
                    product: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Wireless Headphones',
                        description: 'High-quality wireless headphones with noise cancellation',
                        price: 199.99,
                        stock: 50,
                        categoryId: '456e7890-e89b-12d3-a456-426614174000',
                        image: 'https://example.com/headphones.jpg',
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-15T10:30:00Z',
                    },
                },
            },
        },
    },
    ProductsList: {
        description: 'Products list retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        products: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Product',
                            },
                        },
                        pagination: {
                            $ref: '#/components/schemas/PaginationMeta',
                        },
                    },
                    required: ['products'],
                },
                example: {
                    products: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Wireless Headphones',
                            description: 'High-quality wireless headphones',
                            price: 199.99,
                            stock: 50,
                            categoryId: '456e7890-e89b-12d3-a456-426614174000',
                            category: {
                                id: '456e7890-e89b-12d3-a456-426614174000',
                                name: 'Electronics',
                            },
                            image: 'https://example.com/headphones.jpg',
                            createdAt: '2024-01-15T10:30:00Z',
                        },
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 1,
                        pages: 1,
                    },
                },
            },
        },
    },
    // Category Responses
    CategoryCreated: {
        description: 'Category created successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        category: {
                            $ref: '#/components/schemas/Category',
                        },
                    },
                    required: ['message', 'category'],
                },
                example: {
                    message: 'Category created successfully',
                    category: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Electronics',
                        description: 'Electronic devices and accessories',
                        isActive: true,
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-15T10:30:00Z',
                    },
                },
            },
        },
    },
    CategoriesList: {
        description: 'Categories list retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        categories: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Category',
                            },
                        },
                    },
                    required: ['categories'],
                },
                example: {
                    categories: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Electronics',
                            description: 'Electronic devices and accessories',
                            createdAt: '2024-01-15T10:30:00Z',
                            updatedAt: '2024-01-15T10:30:00Z',
                        },
                    ],
                },
            },
        },
    },
    // Order Responses
    OrderCreated: {
        description: 'Order created successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        order: {
                            $ref: '#/components/schemas/Order',
                        },
                    },
                    required: ['message', 'order'],
                },
                example: {
                    message: 'Order created successfully',
                    order: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        userId: '456e7890-e89b-12d3-a456-426614174000',
                        total: 299.99,
                        status: 'PENDING',
                        shippingAddress: {
                            street: '123 Main St',
                            city: 'New York',
                            state: 'NY',
                            zipCode: '10001',
                            country: 'USA',
                        },
                        orderItems: [
                            {
                                id: '789e0123-e89b-12d3-a456-426614174000',
                                productId: '321e4567-e89b-12d3-a456-426614174000',
                                quantity: 1,
                                price: 299.99,
                            },
                        ],
                        createdAt: '2024-01-15T10:30:00Z',
                    },
                },
            },
        },
    },
    OrdersList: {
        description: 'Orders list retrieved successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        orders: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Order',
                            },
                        },
                        pagination: {
                            $ref: '#/components/schemas/PaginationMeta',
                        },
                    },
                    required: ['orders'],
                },
                example: {
                    orders: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            userId: '456e7890-e89b-12d3-a456-426614174000',
                            total: 299.99,
                            status: 'PENDING',
                            user: {
                                id: '456e7890-e89b-12d3-a456-426614174000',
                                name: 'John Doe',
                                email: 'john@example.com',
                            },
                            orderItems: [
                                {
                                    id: '789e0123-e89b-12d3-a456-426614174000',
                                    productId: '321e4567-e89b-12d3-a456-426614174000',
                                    quantity: 1,
                                    price: 299.99,
                                    product: {
                                        id: '321e4567-e89b-12d3-a456-426614174000',
                                        name: 'Wireless Headphones',
                                    },
                                },
                            ],
                            createdAt: '2024-01-15T10:30:00Z',
                        },
                    ],
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: 1,
                        pages: 1,
                    },
                },
            },
        },
    },
    // Payment Responses
    PaymentProcessed: {
        description: 'Payment processed successfully',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                        },
                        payment: {
                            $ref: '#/components/schemas/Payment',
                        },
                        transactionId: {
                            type: 'string',
                        },
                    },
                    required: ['message', 'payment', 'transactionId'],
                },
                example: {
                    message: 'Payment processed successfully',
                    payment: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        orderId: '456e7890-e89b-12d3-a456-426614174000',
                        amount: 299.99,
                        currency: 'ETB',
                        status: 'COMPLETED',
                        paymentMethod: 'CHAPA',
                        transactionId: 'tx_1234567890',
                        createdAt: '2024-01-15T10:30:00Z',
                    },
                    transactionId: 'tx_1234567890',
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.responses.js.map
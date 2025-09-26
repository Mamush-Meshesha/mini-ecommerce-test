// Swagger Schema Definitions in TypeScript
export const swaggerSchemas = {
    // User schemas
    User: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique user identifier",
            },
            email: {
                type: "string",
                format: "email",
                description: "User's email address",
            },
            firstName: {
                type: "string",
                description: "User's first name",
            },
            lastName: {
                type: "string",
                description: "User's last name",
            },
            role: {
                type: "string",
                enum: ["USER", "ADMIN", "SUPER_ADMIN"],
                description: "User's role in the system",
            },
            isActive: {
                type: "boolean",
                description: "Whether the user account is active",
            },
            createdAt: {
                type: "string",
                format: "date-time",
                description: "Account creation timestamp",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                description: "Last update timestamp",
            },
        },
        required: [
            "id",
            "email",
            "firstName",
            "lastName",
            "role",
            "isActive",
            "createdAt",
            "updatedAt",
        ],
    },
    UserCreate: {
        type: "object",
        properties: {
            email: {
                type: "string",
                format: "email",
                description: "User's email address",
            },
            password: {
                type: "string",
                minLength: 8,
                description: "User's password (minimum 8 characters)",
            },
            firstName: {
                type: "string",
                description: "User's first name",
            },
            lastName: {
                type: "string",
                description: "User's last name",
            },
            role: {
                type: "string",
                enum: ["USER", "ADMIN", "SUPER_ADMIN"],
                default: "USER",
                description: "User's role in the system",
            },
        },
        required: ["email", "password", "firstName", "lastName"],
    },
    UserLogin: {
        type: "object",
        properties: {
            email: {
                type: "string",
                format: "email",
                description: "User's email address",
            },
            password: {
                type: "string",
                description: "User's password",
            },
        },
        required: ["email", "password"],
    },
    // Product schemas
    Product: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique product identifier",
            },
            name: {
                type: "string",
                description: "Product name",
            },
            description: {
                type: "string",
                description: "Product description",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Product price",
            },
            stock: {
                type: "integer",
                minimum: 0,
                description: "Available stock quantity",
            },
            categoryId: {
                type: "string",
                format: "uuid",
                description: "Category identifier",
            },
            imageUrl: {
                type: "string",
                format: "uri",
                description: "Product image URL",
            },
            isActive: {
                type: "boolean",
                description: "Whether the product is active",
            },
            createdAt: {
                type: "string",
                format: "date-time",
                description: "Product creation timestamp",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                description: "Last update timestamp",
            },
        },
        required: [
            "id",
            "name",
            "price",
            "stock",
            "categoryId",
            "isActive",
            "createdAt",
            "updatedAt",
        ],
    },
    ProductCreate: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Product name",
            },
            description: {
                type: "string",
                description: "Product description",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Product price",
            },
            stock: {
                type: "integer",
                minimum: 0,
                description: "Available stock quantity",
            },
            categoryId: {
                type: "string",
                format: "uuid",
                description: "Category identifier",
            },
            imageUrl: {
                type: "string",
                format: "uri",
                description: "Product image URL",
            },
        },
        required: ["name", "price", "stock", "categoryId"],
    },
    // Category schemas
    Category: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique category identifier",
            },
            name: {
                type: "string",
                description: "Category name",
            },
            description: {
                type: "string",
                description: "Category description",
            },
            isActive: {
                type: "boolean",
                description: "Whether the category is active",
            },
            createdAt: {
                type: "string",
                format: "date-time",
                description: "Category creation timestamp",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                description: "Last update timestamp",
            },
        },
        required: ["id", "name", "isActive", "createdAt", "updatedAt"],
    },
    CategoryCreate: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Category name",
            },
            description: {
                type: "string",
                description: "Category description",
            },
        },
        required: ["name"],
    },
    // Order schemas
    Order: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique order identifier",
            },
            userId: {
                type: "string",
                format: "uuid",
                description: "User who placed the order",
            },
            status: {
                type: "string",
                enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
                description: "Order status",
            },
            totalAmount: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Total order amount",
            },
            shippingAddress: {
                type: "string",
                description: "Shipping address",
            },
            createdAt: {
                type: "string",
                format: "date-time",
                description: "Order creation timestamp",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                description: "Last update timestamp",
            },
        },
        required: [
            "id",
            "userId",
            "status",
            "totalAmount",
            "shippingAddress",
            "createdAt",
            "updatedAt",
        ],
    },
    OrderCreate: {
        type: "object",
        properties: {
            shippingAddress: {
                type: "string",
                description: "Shipping address",
            },
            items: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        productId: {
                            type: "string",
                            format: "uuid",
                            description: "Product identifier",
                        },
                        quantity: {
                            type: "integer",
                            minimum: 1,
                            description: "Quantity to order",
                        },
                    },
                    required: ["productId", "quantity"],
                },
                minItems: 1,
                description: "Items to order",
            },
        },
        required: ["shippingAddress", "items"],
    },
    // Payment schemas
    Payment: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique payment identifier",
            },
            orderId: {
                type: "string",
                format: "uuid",
                description: "Order identifier",
            },
            amount: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Payment amount",
            },
            currency: {
                type: "string",
                enum: ["USD", "EUR", "GBP", "ETB"],
                default: "USD",
                description: "Payment currency",
            },
            status: {
                type: "string",
                enum: [
                    "PENDING",
                    "PROCESSING",
                    "COMPLETED",
                    "FAILED",
                    "CANCELLED",
                    "REFUNDED",
                ],
                description: "Payment status",
            },
            paymentMethod: {
                type: "string",
                enum: [
                    "CREDIT_CARD",
                    "DEBIT_CARD",
                    "PAYPAL",
                    "STRIPE",
                    "BANK_TRANSFER",
                ],
                description: "Payment method used",
            },
            transactionId: {
                type: "string",
                description: "External transaction identifier",
            },
            createdAt: {
                type: "string",
                format: "date-time",
                description: "Payment creation timestamp",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                description: "Last update timestamp",
            },
        },
        required: [
            "id",
            "orderId",
            "amount",
            "currency",
            "status",
            "paymentMethod",
            "createdAt",
            "updatedAt",
        ],
    },
    // Common schemas
    Error: {
        type: "object",
        properties: {
            message: {
                type: "string",
                description: "Error message",
            },
            code: {
                type: "string",
                description: "Error code",
            },
            details: {
                type: "object",
                description: "Additional error details",
            },
            timestamp: {
                type: "string",
                format: "date-time",
                description: "Error timestamp",
            },
        },
        required: ["message"],
    },
    SuccessMessage: {
        type: "object",
        properties: {
            message: {
                type: "string",
                description: "Success message",
            },
            data: {
                type: "object",
                description: "Response data",
            },
            timestamp: {
                type: "string",
                format: "date-time",
                description: "Response timestamp",
            },
        },
        required: ["message"],
    },
    PaginationMeta: {
        type: "object",
        properties: {
            page: {
                type: "integer",
                minimum: 1,
                description: "Current page number",
            },
            limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                description: "Number of items per page",
            },
            total: {
                type: "integer",
                minimum: 0,
                description: "Total number of items",
            },
            totalPages: {
                type: "integer",
                minimum: 0,
                description: "Total number of pages",
            },
            hasNext: {
                type: "boolean",
                description: "Whether there is a next page",
            },
            hasPrev: {
                type: "boolean",
                description: "Whether there is a previous page",
            },
        },
        required: ["page", "limit", "total", "totalPages", "hasNext", "hasPrev"],
    },
};
//# sourceMappingURL=swagger.schemas.js.map
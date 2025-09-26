export declare const swaggerSchemas: {
    User: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
            };
            email: {
                type: string;
                format: string;
                description: string;
            };
            firstName: {
                type: string;
                description: string;
            };
            lastName: {
                type: string;
                description: string;
            };
            role: {
                type: string;
                enum: string[];
                description: string;
            };
            isActive: {
                type: string;
                description: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    UserCreate: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                description: string;
            };
            password: {
                type: string;
                minLength: number;
                description: string;
            };
            firstName: {
                type: string;
                description: string;
            };
            lastName: {
                type: string;
                description: string;
            };
            role: {
                type: string;
                enum: string[];
                default: string;
                description: string;
            };
        };
        required: string[];
    };
    UserLogin: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                description: string;
            };
            password: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    Product: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            price: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            stock: {
                type: string;
                minimum: number;
                description: string;
            };
            categoryId: {
                type: string;
                format: string;
                description: string;
            };
            imageUrl: {
                type: string;
                format: string;
                description: string;
            };
            isActive: {
                type: string;
                description: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    ProductCreate: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            price: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            stock: {
                type: string;
                minimum: number;
                description: string;
            };
            categoryId: {
                type: string;
                format: string;
                description: string;
            };
            imageUrl: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    Category: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            isActive: {
                type: string;
                description: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    CategoryCreate: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    Order: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
            };
            userId: {
                type: string;
                format: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            totalAmount: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            shippingAddress: {
                type: string;
                description: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    OrderCreate: {
        type: string;
        properties: {
            shippingAddress: {
                type: string;
                description: string;
            };
            items: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        productId: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        quantity: {
                            type: string;
                            minimum: number;
                            description: string;
                        };
                    };
                    required: string[];
                };
                minItems: number;
                description: string;
            };
        };
        required: string[];
    };
    Payment: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
            };
            orderId: {
                type: string;
                format: string;
                description: string;
            };
            amount: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            currency: {
                type: string;
                enum: string[];
                default: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            paymentMethod: {
                type: string;
                enum: string[];
                description: string;
            };
            transactionId: {
                type: string;
                description: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
            };
            updatedAt: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    Error: {
        type: string;
        properties: {
            message: {
                type: string;
                description: string;
            };
            code: {
                type: string;
                description: string;
            };
            details: {
                type: string;
                description: string;
            };
            timestamp: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    SuccessMessage: {
        type: string;
        properties: {
            message: {
                type: string;
                description: string;
            };
            data: {
                type: string;
                description: string;
            };
            timestamp: {
                type: string;
                format: string;
                description: string;
            };
        };
        required: string[];
    };
    PaginationMeta: {
        type: string;
        properties: {
            page: {
                type: string;
                minimum: number;
                description: string;
            };
            limit: {
                type: string;
                minimum: number;
                maximum: number;
                description: string;
            };
            total: {
                type: string;
                minimum: number;
                description: string;
            };
            totalPages: {
                type: string;
                minimum: number;
                description: string;
            };
            hasNext: {
                type: string;
                description: string;
            };
            hasPrev: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
//# sourceMappingURL=swagger.schemas.d.ts.map
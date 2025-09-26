export declare const swaggerResponses: {
    BadRequest: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    message: string;
                    code: string;
                    timestamp: string;
                };
            };
        };
    };
    Unauthorized: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    message: string;
                    code: string;
                    timestamp: string;
                };
            };
        };
    };
    Forbidden: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    message: string;
                    code: string;
                    timestamp: string;
                };
            };
        };
    };
    NotFound: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    message: string;
                    code: string;
                    timestamp: string;
                };
            };
        };
    };
    Conflict: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    message: string;
                    code: string;
                    timestamp: string;
                };
            };
        };
    };
    InternalServerError: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    $ref: string;
                };
                example: {
                    message: string;
                    code: string;
                    timestamp: string;
                };
            };
        };
    };
    LoginSuccess: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        token: {
                            type: string;
                        };
                        refreshToken: {
                            type: string;
                        };
                        user: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    message: string;
                    token: string;
                    refreshToken: string;
                    user: {
                        id: string;
                        email: string;
                        firstName: string;
                        lastName: string;
                        role: string;
                        isActive: boolean;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
            };
        };
    };
    UserCreated: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        user: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    message: string;
                    user: {
                        id: string;
                        email: string;
                        firstName: string;
                        lastName: string;
                        role: string;
                        isActive: boolean;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
            };
        };
    };
    UsersList: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        users: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        pagination: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    users: {
                        id: string;
                        name: string;
                        email: string;
                        role: string;
                        createdAt: string;
                    }[];
                    pagination: {
                        page: number;
                        limit: number;
                        total: number;
                        pages: number;
                    };
                };
            };
        };
    };
    ProductCreated: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        product: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    message: string;
                    product: {
                        id: string;
                        name: string;
                        description: string;
                        price: number;
                        stock: number;
                        categoryId: string;
                        image: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
            };
        };
    };
    ProductsList: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        products: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        pagination: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    products: {
                        id: string;
                        name: string;
                        description: string;
                        price: number;
                        stock: number;
                        categoryId: string;
                        category: {
                            id: string;
                            name: string;
                        };
                        image: string;
                        createdAt: string;
                    }[];
                    pagination: {
                        page: number;
                        limit: number;
                        total: number;
                        pages: number;
                    };
                };
            };
        };
    };
    CategoryCreated: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        category: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    message: string;
                    category: {
                        id: string;
                        name: string;
                        description: string;
                        isActive: boolean;
                        createdAt: string;
                        updatedAt: string;
                    };
                };
            };
        };
    };
    CategoriesList: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        categories: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    required: string[];
                };
                example: {
                    categories: {
                        id: string;
                        name: string;
                        description: string;
                        createdAt: string;
                        updatedAt: string;
                    }[];
                };
            };
        };
    };
    OrderCreated: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        order: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    message: string;
                    order: {
                        id: string;
                        userId: string;
                        total: number;
                        status: string;
                        shippingAddress: {
                            street: string;
                            city: string;
                            state: string;
                            zipCode: string;
                            country: string;
                        };
                        orderItems: {
                            id: string;
                            productId: string;
                            quantity: number;
                            price: number;
                        }[];
                        createdAt: string;
                    };
                };
            };
        };
    };
    OrdersList: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        orders: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        pagination: {
                            $ref: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    orders: {
                        id: string;
                        userId: string;
                        total: number;
                        status: string;
                        user: {
                            id: string;
                            name: string;
                            email: string;
                        };
                        orderItems: {
                            id: string;
                            productId: string;
                            quantity: number;
                            price: number;
                            product: {
                                id: string;
                                name: string;
                            };
                        }[];
                        createdAt: string;
                    }[];
                    pagination: {
                        page: number;
                        limit: number;
                        total: number;
                        pages: number;
                    };
                };
            };
        };
    };
    PaymentProcessed: {
        description: string;
        content: {
            'application/json': {
                schema: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                        payment: {
                            $ref: string;
                        };
                        transactionId: {
                            type: string;
                        };
                    };
                    required: string[];
                };
                example: {
                    message: string;
                    payment: {
                        id: string;
                        orderId: string;
                        amount: number;
                        currency: string;
                        status: string;
                        paymentMethod: string;
                        transactionId: string;
                        createdAt: string;
                    };
                    transactionId: string;
                };
            };
        };
    };
};
//# sourceMappingURL=swagger.responses.d.ts.map
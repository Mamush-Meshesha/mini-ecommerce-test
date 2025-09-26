import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerSchemas } from "../docs/swagger.schemas.js";
import { swaggerResponses } from "../docs/swagger.responses.js";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Mini E-commerce API",
      description:
        "A comprehensive e-commerce API with authentication, product management, and payment processing",
      version: "1.0.0",
      contact: {
        name: "API Support",
        email: "support@mini-ecommerce.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://mini-ecommerce.com",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization",
      },
      {
        name: "Users",
        description: "User management operations",
      },
      {
        name: "Products",
        description: "Product catalog management",
      },
      {
        name: "Categories",
        description: "Product category management",
      },
      {
        name: "Orders",
        description: "Order management",
      },
      {
        name: "Payments",
        description: "Payment processing",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token for authentication",
        },
      },
      schemas: swaggerSchemas,
      responses: swaggerResponses,
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);

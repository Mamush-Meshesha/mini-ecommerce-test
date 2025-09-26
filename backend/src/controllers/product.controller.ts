import type { Request, Response } from "express";
import { prisma } from "../utils/prisma.utils.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  cloudinary,
} from "../middlewares/cloudinary.js";
import fs from "fs";

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Create a new product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *           example:
 *             name: "Wireless Headphones"
 *             image: "https://example.com/headphones.jpg"
 *             price: 199.99
 *             stock: 50
 *             categoryId: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ProductCreated'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, categoryId } = req.body;
    const file = req.file;

    // Validate input
    if (!name || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Name, price, and stock are required" });
    }

    let imageUrl = "";
    let imagePublicId = "";

    // Handle image upload if file is provided
    if (file) {
      try {
        const uploadResult = await uploadToCloudinary(
          file,
          "mini-ecommerce/products"
        );
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;

        // Clean up temporary file if it exists
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // Validate category exists if provided
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        image: imageUrl,
        imagePublicId,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    // Log audit trail
    if (req.user) {
      await prisma.auditLog.create({
        data: {
          userId: req.user.userId,
          action: "CREATE",
          entity: "Product",
          entityId: product.id,
          roleAtTime: req.user.role,
        },
      });
    }

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Retrieve a list of all products with pagination and filtering
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - name: categoryId
 *         in: query
 *         description: Filter by category ID
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: search
 *         in: query
 *         description: Search term for product name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ProductsList'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, categoryId, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    if (search) {
      where.name = {
        contains: search as string,
        mode: "insensitive",
      };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        skip,
        take: parseInt(limit as string),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     description: Retrieve a specific product by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: id! },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update product
 *     description: Update an existing product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: Product image URL
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Product price
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *                 description: Available stock
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 description: Category ID
 *           example:
 *             name: "Premium Wireless Headphones"
 *             image: "https://example.com/premium-headphones.jpg"
 *             price: 249.99
 *             stock: 30
 *             categoryId: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Handle both JSON and FormData
    let name, description, price, stock, categoryId;
    let imageUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (req.body.name) {
      // Regular JSON body
      ({ name, description, price, stock, categoryId } = req.body);
    } else {
      // FormData body
      name = req.body.name;
      description = req.body.description;
      price = req.body.price;
      stock = req.body.stock;
      categoryId = req.body.categoryId;
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id! },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image upload if provided
    if (req.file) {
      try {
        const uploadResult = await uploadToCloudinary(req.file, "products");
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;

        // Delete old image if it exists
        if (existingProduct.imagePublicId) {
          await deleteFromCloudinary(existingProduct.imagePublicId);
        }
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(400).json({ message: "Image upload failed" });
      }
    }

    // Validate category exists if provided
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== null) {
      updateData.image = imageUrl;
      updateData.imagePublicId = imagePublicId;
    }
    if (price !== undefined) updateData.price = parseFloat(price);
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;

    const updatedProduct = await prisma.product.update({
      where: { id: id! },
      data: updateData,
      include: {
        category: true,
      },
    });

    // Log audit trail
    if (req.user) {
      await prisma.auditLog.create({
        data: {
          userId: req.user.userId,
          action: "UPDATE",
          entity: "Product",
          entityId: updatedProduct.id,
          roleAtTime: req.user.role,
        },
      });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete product
 *     description: Delete a product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Product deleted successfully"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id! },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product is in any cart
    const cartItems = await prisma.cartItem.findMany({
      where: { productId: id! },
    });

    if (cartItems.length > 0) {
      return res.status(400).json({
        message:
          "Cannot delete product that is in users' carts. Remove from carts first.",
      });
    }

    await prisma.product.delete({
      where: { id: id! },
    });

    // Log audit trail
    if (req.user) {
      await prisma.auditLog.create({
        data: {
          userId: req.user.userId,
          action: "DELETE",
          entity: "Product",
          entityId: id!,
          roleAtTime: req.user.role,
        },
      });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

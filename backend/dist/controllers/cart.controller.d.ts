import type { Request, Response } from 'express';
export declare const addToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCartItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeFromCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const clearCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cart.controller.d.ts.map
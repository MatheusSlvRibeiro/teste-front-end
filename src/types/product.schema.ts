import { z } from 'zod';

export const productSchema = z.object({
    id: z.string(),
    productName: z.string(),
    descriptionShort: z.string(),
    photo: z.string(),
    price: z.number(),
    oldPrice: z.number().optional(),
    installmentValue: z.number().optional(),
});

export const productsResponseSchema = z.object({
    success: z.boolean(),
    products: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;

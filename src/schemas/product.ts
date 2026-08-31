import { z } from 'zod'

export const ProductSchema = z.object({
    productName: z.string(),
    descriptionShort: z.string(),
    photo: z.string(),
    price: z.number(),
    oldPrice: z.number().optional(),
    installmentValue: z.number().optional(),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductsResponseSchema = z.object({
    success: z.boolean(),
    products: z.array(ProductSchema),
})

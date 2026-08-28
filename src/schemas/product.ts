import { z } from 'zod'

export const ProductSchema = z.object({
    productName: z.string(),
    descriptionShort: z.string(),
    photo: z.string(),
    price: z.number(),
})

export type Product = z.infer<typeof ProductSchema>

export const ProductsResponseSchema = z.object({
    success: z.boolean(),
    products: z.array(ProductSchema),
})

import { z } from 'zod'

export const newsletterSchema = z.object({
    name: z.string().trim().min(1, 'Informe seu nome'),
    email: z.email('Informe um e-mail válido'),
    terms: z.boolean().refine((value) => value === true, {
        message: 'Você precisa aceitar os termos e condições',
    }),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

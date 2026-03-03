import z from 'zod';

const newsletterSchema = z.object({
    name: z.string().trim().min(3, 'Informe um nome'),
    email: z.string().trim().email('Informe um e-mail válido.'),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: 'Você precisa aceitar os termos e condições.',
    }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export { newsletterSchema };

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Product } from '@/schemas/product'
import { ProductDetailModal } from './ProductDetailModal'

const iphone11: Product = {
    productName: 'Iphone 11 PRO MAX BRANCO',
    descriptionShort: 'Descrição do iPhone 11',
    photo: 'https://example.com/iphone11.png',
    price: 15000,
}

const iphone13: Product = {
    productName: 'IPHONE 13 MINI',
    descriptionShort: 'Descrição do iPhone 13',
    photo: 'https://example.com/iphone13.png',
    price: 9000,
}

describe('ProductDetailModal', () => {
    it('não renderiza o modal quando product é null', () => {
        render(<ProductDetailModal product={null} onClose={vi.fn()} />)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('exibe nome, imagem, descrição e preço do produto selecionado', () => {
        render(<ProductDetailModal product={iphone11} onClose={vi.fn()} />)

        expect(screen.getByRole('heading', { name: iphone11.productName })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: iphone11.productName })).toHaveAttribute(
            'src',
            iphone11.photo,
        )
        expect(screen.getByText(iphone11.descriptionShort)).toBeInTheDocument()
        expect(screen.getByText('R$ 15.000,00')).toBeInTheDocument()
    })

    it('exibe os dados corretos ao trocar de produto, sem vazar o produto anterior', () => {
        const { rerender } = render(<ProductDetailModal product={iphone11} onClose={vi.fn()} />)
        expect(screen.getByText('R$ 15.000,00')).toBeInTheDocument()

        rerender(<ProductDetailModal product={iphone13} onClose={vi.fn()} />)

        expect(screen.getByRole('heading', { name: iphone13.productName })).toBeInTheDocument()
        expect(screen.getByText('R$ 9.000,00')).toBeInTheDocument()
        expect(screen.queryByText(iphone11.descriptionShort)).not.toBeInTheDocument()
    })

    it('chama onClose ao fechar o modal', async () => {
        const onClose = vi.fn()
        render(<ProductDetailModal product={iphone11} onClose={onClose} />)

        await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

        expect(onClose).toHaveBeenCalledOnce()
    })
})

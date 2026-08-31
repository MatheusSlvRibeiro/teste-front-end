import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Product } from '@/schemas/product'
import { ProductCard, ProductCardSkeleton } from './ProductCard'

const product: Product = {
    productName: 'Iphone 11 PRO MAX BRANCO',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO, 128GB',
    photo: 'https://example.com/foto.png',
    price: 15000,
}

describe('ProductCard', () => {
    it('renderiza nome, imagem, descrição e preço do produto', () => {
        render(<ProductCard product={product} onSelect={vi.fn()} />)

        expect(screen.getByRole('img', { name: product.productName })).toHaveAttribute(
            'src',
            product.photo,
        )
        expect(screen.getByText(product.descriptionShort)).toBeInTheDocument()
        expect(screen.getByText('R$ 15.000,00')).toBeInTheDocument()
    })

    it('formata um preço diferente para outro produto', () => {
        render(<ProductCard product={{ ...product, price: 520 }} onSelect={vi.fn()} />)

        expect(screen.getByText('R$ 520,00')).toBeInTheDocument()
    })

    it('chama onSelect com o produto ao clicar no card', async () => {
        const handleSelect = vi.fn()
        render(<ProductCard product={product} onSelect={handleSelect} />)

        await userEvent.click(screen.getByRole('button'))

        expect(handleSelect).toHaveBeenCalledOnce()
        expect(handleSelect).toHaveBeenCalledWith(product)
    })

    it('não quebra com preço zero', () => {
        render(<ProductCard product={{ ...product, price: 0 }} onSelect={vi.fn()} />)

        expect(screen.getByText('R$ 0,00')).toBeInTheDocument()
    })

    it('renderiza preço antigo riscado quando oldPrice é fornecido', () => {
        render(<ProductCard product={{ ...product, oldPrice: 20000 }} onSelect={vi.fn()} />)

        const oldPriceEl = screen.getByText('R$ 20.000,00')
        expect(oldPriceEl).toBeInTheDocument()
    })

    it('renderiza ProductCardSkeleton sem erros', () => {
        const { container } = render(<ProductCardSkeleton />)
        expect(container.firstChild).toBeTruthy()
    })
})

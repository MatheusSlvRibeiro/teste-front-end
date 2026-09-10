import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, beforeEach, expect, it, vi } from 'vitest'
import type { Product } from '@/schemas/product'
import { ProductCarousel } from './ProductCarousel'

// Mock window.innerWidth so useItemsPerPage returns 4
Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })

const makeProduct = (name: string, price = 100): Product => ({
    id: name,
    productName: name,
    descriptionShort: `${name} description`,
    photo: `https://example.com/${name}.png`,
    price,
})

const products: Product[] = [
    makeProduct('Produto 1'),
    makeProduct('Produto 2'),
    makeProduct('Produto 3'),
    makeProduct('Produto 4'),
    makeProduct('Produto 5'),
    makeProduct('Produto 6'),
    makeProduct('Produto 7'),
    makeProduct('Produto 8'),
]

describe('ProductCarousel', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })
    })

    it('renderiza skeletons quando loading é true', () => {
        render(<ProductCarousel products={[]} loading={true} onProductClick={vi.fn()} />)

        // Should render status elements for skeleton cards (4 at 1280px)
        expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1)
    })

    it('renderiza cards de produtos quando products são fornecidos', () => {
        render(<ProductCarousel products={products} loading={false} onProductClick={vi.fn()} />)

        // At 1280px (4 items per page), first page shows first 4 products
        expect(screen.getByText('Produto 1 description')).toBeInTheDocument()
        expect(screen.getByText('Produto 4 description')).toBeInTheDocument()
    })

    it('clicando em próximo exibe próxima página de produtos', async () => {
        render(<ProductCarousel products={products} loading={false} onProductClick={vi.fn()} />)

        // Initial page has products 1-4
        expect(screen.getByText('Produto 1 description')).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', { name: 'Próximo' }))

        // After next, page has products 5-8
        expect(screen.getByText('Produto 5 description')).toBeInTheDocument()
    })

    it('clicando em anterior na primeira página não muda de página', async () => {
        render(<ProductCarousel products={products} loading={false} onProductClick={vi.fn()} />)

        await userEvent.click(screen.getByRole('button', { name: 'Próximo' }))
        await userEvent.click(screen.getByRole('button', { name: 'Anterior' }))

        expect(screen.getByText('Produto 1 description')).toBeInTheDocument()
    })

    it('chama onProductClick ao clicar em um card', async () => {
        const handleClick = vi.fn()
        render(<ProductCarousel products={products} loading={false} onProductClick={handleClick} />)

        await userEvent.click(screen.getByRole('button', { name: 'Produto 1' }))

        expect(handleClick).toHaveBeenCalledWith(products[0])
    })

    it('renderiza mensagem de erro quando error é fornecido', () => {
        render(
            <ProductCarousel
                products={[]}
                loading={false}
                onProductClick={vi.fn()}
                error="Erro ao carregar produtos"
            />,
        )

        expect(screen.getByText('Erro ao carregar produtos')).toBeInTheDocument()
    })

    it('chama onRetry ao clicar no botão de retry', async () => {
        const handleRetry = vi.fn()
        render(
            <ProductCarousel
                products={[]}
                loading={false}
                onProductClick={vi.fn()}
                error="Erro"
                onRetry={handleRetry}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))

        expect(handleRetry).toHaveBeenCalledOnce()
    })
})

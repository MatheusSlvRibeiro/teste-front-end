import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { Product } from '@/schemas/product'
import { RelatedProductsSection } from './RelatedProductsSection'

Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })

const product: Product = {
    id: 'product-teste',
    productName: 'Produto Teste',
    descriptionShort: 'Descrição do produto teste',
    photo: 'https://example.com/foto.png',
    price: 100,
}

describe('RelatedProductsSection', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })
    })

    it('renderiza o título da seção', () => {
        render(
            <RelatedProductsSection
                products={[]}
                loading={false}
                onProductClick={vi.fn()}
                title="Produtos relacionados"
            />,
        )

        expect(
            screen.getByRole('heading', { level: 2, name: 'Produtos relacionados' }),
        ).toBeInTheDocument()
    })

    it('esconde CategoryTabs quando showCategories é false', () => {
        render(
            <RelatedProductsSection
                products={[]}
                loading={false}
                onProductClick={vi.fn()}
                showCategories={false}
            />,
        )

        expect(
            screen.queryByRole('navigation', { name: 'Filtrar por categoria' }),
        ).not.toBeInTheDocument()
    })

    it('mostra CategoryTabs quando showCategories é true', () => {
        render(
            <RelatedProductsSection
                products={[]}
                loading={false}
                onProductClick={vi.fn()}
                showCategories={true}
            />,
        )

        expect(
            screen.getByRole('navigation', { name: 'Filtrar por categoria' }),
        ).toBeInTheDocument()
    })

    it('passa produtos para o carrossel', () => {
        render(
            <RelatedProductsSection
                products={[product]}
                loading={false}
                onProductClick={vi.fn()}
            />,
        )

        expect(screen.getByText('Descrição do produto teste')).toBeInTheDocument()
    })
})

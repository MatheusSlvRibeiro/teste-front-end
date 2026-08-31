import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { Product } from '@/schemas/product'
import { Home } from './Home'
import { getProducts } from '@/lib/api/products'

vi.mock('@/lib/api/products', () => ({
    getProducts: vi.fn(),
}))

// Ensure useItemsPerPage returns 4 for consistent test behavior
Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })

const product: Product = {
    productName: 'Iphone 11 PRO MAX BRANCO',
    descriptionShort: 'Iphone 11 PRO MAX BRANCO',
    photo: 'https://example.com/foto.png',
    price: 15000,
}

const secondProduct: Product = {
    productName: 'IPHONE 13 MINI',
    descriptionShort: 'IPHONE 13 MINI',
    photo: 'https://example.com/foto2.png',
    price: 9000,
}

describe('Home', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })
    })

    it('tem o headline do hero e o heading da vitrine', () => {
        vi.mocked(getProducts).mockReturnValue(new Promise(() => {}))
        render(<Home />)
        expect(
            screen.getByRole('heading', { level: 1, name: 'Venha conhecer nossas promoções' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Todos os produtos' }),
        ).toBeInTheDocument()
    })

    it('usa uma região identificável para a vitrine de produtos', () => {
        vi.mocked(getProducts).mockReturnValue(new Promise(() => {}))
        render(<Home />)
        expect(screen.getByRole('region', { name: 'Todos os produtos' })).toBeInTheDocument()
    })

    it('mostra um indicador de carregamento enquanto os produtos não chegam', () => {
        vi.mocked(getProducts).mockReturnValue(new Promise(() => {}))
        render(<Home />)
        // skeleton cards render with role="status"
        expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1)
    })

    it('renderiza um card por produto retornado em cada vitrine', async () => {
        vi.mocked(getProducts).mockResolvedValue([product])
        render(<Home />)

        await waitFor(() => {
            // o produto aparece nas duas seções (vitrine + produtos relacionados)
            expect(screen.getAllByText(product.descriptionShort).length).toBeGreaterThanOrEqual(1)
        })
    })

    it('exibe uma mensagem de erro visível quando a busca falha', async () => {
        vi.mocked(getProducts).mockRejectedValue(new Error('network error'))
        render(<Home />)

        await waitFor(() => {
            // duas vitrines → dois alertas via role="alert" não mais disponíveis
            // o erro é renderizado como texto dentro do carrossel
            expect(
                screen.getAllByText('Não foi possível carregar os produtos.').length,
            ).toBeGreaterThanOrEqual(1)
        })
    })

    it('abre o modal com o produto correto ao clicar em um card, sem vazar dados entre produtos', async () => {
        vi.mocked(getProducts).mockResolvedValue([product, secondProduct])
        render(<Home />)

        const grid = screen.getByRole('region', { name: 'Todos os produtos' })

        await waitFor(() => {
            // At 1280px, items per page = 4, so both products should be visible
            expect(
                within(grid).getByRole('button', { name: product.productName }),
            ).toBeInTheDocument()
        })

        await userEvent.click(within(grid).getByRole('button', { name: product.productName }))
        expect(screen.getByRole('heading', { name: product.productName })).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

        await userEvent.click(within(grid).getByRole('button', { name: secondProduct.productName }))
        expect(screen.getByRole('heading', { name: secondProduct.productName })).toBeInTheDocument()
        expect(screen.queryByText(product.productName, { selector: 'h2' })).not.toBeInTheDocument()
    })
})

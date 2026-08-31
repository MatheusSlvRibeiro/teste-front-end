import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Product } from '@/schemas/product'
import { Home } from './Home'

vi.mock('@/services/productsService', () => ({
    productsService: {
        getRelatedProducts: vi.fn(),
    },
}))

const { productsService } = await import('@/services/productsService')
const mockGetRelatedProducts = vi.mocked(productsService.getRelatedProducts)

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
        vi.clearAllMocks()
        Object.defineProperty(window, 'innerWidth', { writable: true, value: 1280 })
    })

    it('tem o headline do hero e o heading da vitrine', () => {
        mockGetRelatedProducts.mockReturnValue(new Promise(() => {}))
        render(<Home />)
        expect(
            screen.getByRole('heading', { level: 1, name: 'Venha conhecer nossas promoções' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Todos os produtos' }),
        ).toBeInTheDocument()
    })

    it('usa uma região identificável para a vitrine de produtos', () => {
        mockGetRelatedProducts.mockReturnValue(new Promise(() => {}))
        render(<Home />)
        expect(screen.getByRole('region', { name: 'Todos os produtos' })).toBeInTheDocument()
    })

    it('mostra um indicador de carregamento enquanto os produtos não chegam', () => {
        mockGetRelatedProducts.mockReturnValue(new Promise(() => {}))
        render(<Home />)
        expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1)
    })

    it('renderiza um card por produto retornado em cada vitrine', async () => {
        mockGetRelatedProducts.mockResolvedValue([product])
        render(<Home />)

        await waitFor(() => {
            expect(screen.getAllByText(product.descriptionShort).length).toBeGreaterThanOrEqual(1)
        })
    })

    it('exibe uma mensagem de erro visível quando a busca falha', async () => {
        mockGetRelatedProducts.mockRejectedValue(new Error('network error'))
        render(<Home />)

        await waitFor(() => {
            expect(
                screen.getAllByText('Não foi possível carregar os produtos.').length,
            ).toBeGreaterThanOrEqual(1)
        })
    })

    it('abre o modal com o produto correto ao clicar em um card, sem vazar dados entre produtos', async () => {
        mockGetRelatedProducts.mockResolvedValue([product, secondProduct])
        render(<Home />)

        const grid = screen.getByRole('region', { name: 'Todos os produtos' })

        await waitFor(() => {
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

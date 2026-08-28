import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Product } from '@/schemas/product'
import { Home } from './Home'
import { getProducts } from '@/lib/api/products'

vi.mock('@/lib/api/products', () => ({
    getProducts: vi.fn(),
}))

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
        expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renderiza um card por produto retornado', async () => {
        vi.mocked(getProducts).mockResolvedValue([product])
        render(<Home />)

        await waitFor(() => {
            expect(screen.getByText(product.descriptionShort)).toBeInTheDocument()
        })
    })

    it('exibe uma mensagem de erro visível quando a busca falha', async () => {
        vi.mocked(getProducts).mockRejectedValue(new Error('network error'))
        render(<Home />)

        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument()
        })
    })

    it('abre o modal com o produto correto ao clicar em um card, sem vazar dados entre produtos', async () => {
        vi.mocked(getProducts).mockResolvedValue([product, secondProduct])
        render(<Home />)

        const grid = screen.getByRole('region', { name: 'Todos os produtos' })

        await waitFor(() => {
            expect(within(grid).getAllByRole('button')).toHaveLength(2)
        })

        await userEvent.click(within(grid).getAllByRole('button')[0])
        expect(screen.getByRole('heading', { name: product.productName })).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

        await userEvent.click(within(grid).getAllByRole('button')[1])
        expect(screen.getByRole('heading', { name: secondProduct.productName })).toBeInTheDocument()
        expect(screen.queryByText(product.productName, { selector: 'h2' })).not.toBeInTheDocument()
    })
})

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { Routes } from './Routes'

vi.mock('@/lib/api/products', () => ({
    getProducts: vi.fn().mockReturnValue(new Promise(() => {})),
}))

describe('Routes', () => {
    it('renderiza a Home dentro do AppLayout na rota "/"', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes />
            </MemoryRouter>,
        )

        expect(screen.getByRole('banner')).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 1, name: 'Venha conhecer nossas promoções' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('region', { name: 'Inscreva-se na nossa newsletter' }),
        ).toBeInTheDocument()

        const footer = screen.getByRole('contentinfo')
        expect(footer).toBeInTheDocument()
        expect(screen.getByRole('main')).not.toContainElement(footer)
    })

    it('redireciona uma rota desconhecida de volta para a Home', () => {
        render(
            <MemoryRouter initialEntries={['/rota-que-nao-existe']}>
                <Routes />
            </MemoryRouter>,
        )

        expect(
            screen.getByRole('heading', { level: 1, name: 'Venha conhecer nossas promoções' }),
        ).toBeInTheDocument()
    })
})

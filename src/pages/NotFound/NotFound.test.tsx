import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { NotFound } from './NotFound'

describe('NotFound', () => {
    it('renderiza o código "404"', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>,
        )

        expect(screen.getByText('404')).toBeInTheDocument()
    })

    it('renderiza o título "Página não encontrada"', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>,
        )

        expect(screen.getByText('Página não encontrada')).toBeInTheDocument()
    })

    it('renderiza o botão "Voltar"', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>,
        )

        expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument()
    })
})

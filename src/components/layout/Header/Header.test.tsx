import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
    it('exibe os três textos da barra de avisos', () => {
        render(<Header />)

        const byFullText = (text: string) =>
            screen.getByText((_, node) => node?.textContent === text)

        expect(byFullText('Compra 100% segura')).toBeInTheDocument()
        expect(byFullText('Frete grátis acima de R$ 200')).toBeInTheDocument()
        expect(byFullText('Parcele suas compras')).toBeInTheDocument()
    })

    it('exibe o campo de busca rotulado e os 4 ícones de ação', () => {
        render(<Header />)

        expect(screen.getByLabelText('Buscar produtos')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Trocar produto' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Lista de desejos' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Minha conta' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Carrinho' })).toBeInTheDocument()
    })

    it('bloqueia o submit da busca em vez de navegar', async () => {
        const user = userEvent.setup()
        render(<Header />)

        const form = screen.getByRole('search')
        const captured: { event: Event | null } = { event: null }
        form.addEventListener('submit', (event) => {
            captured.event = event
        })

        await user.type(screen.getByLabelText('Buscar produtos'), 'produto teste')
        await user.click(screen.getByRole('button', { name: 'Buscar' }))

        expect(captured.event).not.toBeNull()
        expect(captured.event?.defaultPrevented).toBe(true)
    })

    it('não executa nenhuma ação real ao clicar nos ícones', async () => {
        const user = userEvent.setup()
        render(<Header />)

        await user.click(screen.getByRole('button', { name: 'Carrinho' }))

        expect(window.location.pathname).toBe('/')
    })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Newsletter } from './Newsletter'

describe('Newsletter', () => {
    it('exibe título, campos, checkbox e botão com rótulos corretos', () => {
        render(<Newsletter />)

        expect(
            screen.getByRole('region', { name: 'Inscreva-se na nossa newsletter' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { level: 2, name: 'Inscreva-se na nossa newsletter' }),
        ).toBeInTheDocument()
        const nameInput = screen.getByLabelText('Digite seu nome')
        expect(nameInput).toBeInTheDocument()
        expect(nameInput).toHaveAttribute('autocomplete', 'name')

        const emailInput = screen.getByLabelText('Digite seu e-mail')
        expect(emailInput).toBeInTheDocument()
        expect(emailInput).toHaveAttribute('type', 'email')
        expect(emailInput).toHaveAttribute('autocomplete', 'email')

        expect(
            screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }),
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'INSCREVER' })).toBeInTheDocument()
    })

    it('bloqueia o submit do formulário em vez de disparar uma ação real', async () => {
        const user = userEvent.setup()
        const { container } = render(<Newsletter />)

        const form = container.querySelector('form')
        expect(form).not.toBeNull()

        const captured: { event: Event | null } = { event: null }
        form?.addEventListener('submit', (event) => {
            captured.event = event
        })

        await user.type(screen.getByLabelText('Digite seu nome'), 'Maria')
        await user.type(screen.getByLabelText('Digite seu e-mail'), 'maria@example.com')
        await user.click(screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }))
        await user.click(screen.getByRole('button', { name: 'INSCREVER' }))

        expect(captured.event).not.toBeNull()
        expect(captured.event?.defaultPrevented).toBe(true)
    })

    it('exibe mensagens de erro para nome, e-mail e termos ao submeter vazio', async () => {
        const user = userEvent.setup()
        render(<Newsletter />)

        await user.click(screen.getByRole('button', { name: 'INSCREVER' }))

        expect(await screen.findByText('Informe seu nome')).toBeInTheDocument()
        expect(screen.getByText('Informe um e-mail válido')).toBeInTheDocument()
        expect(screen.getByText('Você precisa aceitar os termos e condições')).toBeInTheDocument()
    })

    it('exibe erro de e-mail inválido sem repetir o erro de nome já corrigido', async () => {
        const user = userEvent.setup()
        render(<Newsletter />)

        await user.type(screen.getByLabelText('Digite seu nome'), 'Maria')
        await user.type(screen.getByLabelText('Digite seu e-mail'), 'nao-e-email')
        await user.click(screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }))
        await user.click(screen.getByRole('button', { name: 'INSCREVER' }))

        expect(await screen.findByText('Informe um e-mail válido')).toBeInTheDocument()
        expect(screen.queryByText('Informe seu nome')).not.toBeInTheDocument()
    })

    it('limpa o formulário sem exibir erros quando os dados são válidos', async () => {
        const user = userEvent.setup()
        render(<Newsletter />)

        const nameInput = screen.getByLabelText('Digite seu nome')
        const emailInput = screen.getByLabelText('Digite seu e-mail')

        await user.type(nameInput, 'Maria')
        await user.type(emailInput, 'maria@example.com')
        await user.click(screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }))
        await user.click(screen.getByRole('button', { name: 'INSCREVER' }))

        await screen.findByRole('checkbox', {
            name: 'Aceito os termos e condições',
            checked: false,
        })
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(nameInput).toHaveValue('')
        expect(emailInput).toHaveValue('')
    })
})

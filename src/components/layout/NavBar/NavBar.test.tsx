import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { NavBar } from './NavBar'

describe('NavBar', () => {
    it('expõe a navegação como landmark com os 7 itens focáveis, na ordem do Figma', () => {
        render(<NavBar />)

        const nav = screen.getByRole('navigation', { name: 'Categorias' })
        const items = within(screen.getByRole('list'))
            .getAllByRole('button')
            .map((item) => item.textContent)

        expect(nav).toBeInTheDocument()
        expect(items).toEqual([
            'Todas categorias',
            'Supermercado',
            'Livros',
            'Moda',
            'Lançamentos',
            'Ofertas do dia',
            'Assinatura',
        ])
    })

    it('marca "Ofertas do dia" como item ativo', () => {
        render(<NavBar />)

        expect(screen.getByRole('button', { name: 'Ofertas do dia' })).toHaveAttribute(
            'aria-current',
            'page',
        )
    })

    it('não marca nenhum outro item como ativo', () => {
        render(<NavBar />)

        const inactiveLabels = [
            'Todas categorias',
            'Supermercado',
            'Livros',
            'Moda',
            'Lançamentos',
            'Assinatura',
        ]

        inactiveLabels.forEach((label) => {
            expect(screen.getByRole('button', { name: label })).not.toHaveAttribute('aria-current')
        })
    })

    it('abre e fecha o menu mobile ao clicar no botão de hambúrguer', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
        expect(menuButton).toHaveAttribute('aria-expanded', 'false')

        await user.click(menuButton)
        expect(menuButton).toHaveAttribute('aria-expanded', 'true')

        await user.click(menuButton)
        expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('abre o menu de perfil com as 3 opções ao clicar no botão de conta', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        expect(screen.queryByRole('menu')).not.toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Minha conta' }))

        const menu = screen.getByRole('menu')
        expect(within(menu).getByRole('menuitem', { name: 'Minha conta' })).toBeInTheDocument()
        expect(within(menu).getByRole('menuitem', { name: 'Favoritos' })).toBeInTheDocument()
        expect(within(menu).getByRole('menuitem', { name: 'Meus pedidos' })).toBeInTheDocument()
    })

    it('fecha o menu de perfil ao pressionar Esc', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        await user.click(screen.getByRole('button', { name: 'Minha conta' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        await user.keyboard('{Escape}')
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('fecha o menu de perfil ao clicar em uma das opções', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        await user.click(screen.getByRole('button', { name: 'Minha conta' }))
        await user.click(screen.getByRole('menuitem', { name: 'Favoritos' }))

        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('fecha o menu de perfil ao clicar fora dele', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        await user.click(screen.getByRole('button', { name: 'Minha conta' }))
        expect(screen.getByRole('menu')).toBeInTheDocument()

        await user.click(document.body)
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('fecha o menu mobile ao pressionar Esc', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
        await user.click(menuButton)
        expect(menuButton).toHaveAttribute('aria-expanded', 'true')

        await user.keyboard('{Escape}')
        expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('fecha o menu mobile ao clicar no overlay', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
        await user.click(menuButton)
        expect(menuButton).toHaveAttribute('aria-expanded', 'true')

        await user.click(screen.getByTestId('navbar-overlay'))
        expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('fecha o menu mobile ao clicar em um item de categoria', async () => {
        const user = userEvent.setup()
        render(<NavBar />)

        const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
        await user.click(menuButton)

        await user.click(screen.getByRole('button', { name: 'Moda' }))
        expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
})

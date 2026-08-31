import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CategoryTabs } from './CategoryTabs'

describe('CategoryTabs', () => {
    it('renderiza todas as categorias padrão', () => {
        render(<CategoryTabs />)

        expect(screen.getByRole('button', { name: 'CELULAR' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'ACESSÓRIOS' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'TABLETS' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'NOTEBOOKS' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'TVS' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'VER TODOS' })).toBeInTheDocument()
    })

    it('chama onChange ao clicar em uma aba', async () => {
        const handleChange = vi.fn()
        render(<CategoryTabs onChange={handleChange} activeIndex={0} />)

        await userEvent.click(screen.getByRole('button', { name: 'TABLETS' }))

        expect(handleChange).toHaveBeenCalledWith(2)
    })

    it('a categoria ativa tem aria-pressed=true', () => {
        render(<CategoryTabs activeIndex={1} onChange={vi.fn()} />)

        expect(screen.getByRole('button', { name: 'ACESSÓRIOS' })).toHaveAttribute(
            'aria-pressed',
            'true',
        )
        expect(screen.getByRole('button', { name: 'CELULAR' })).toHaveAttribute(
            'aria-pressed',
            'false',
        )
    })
})

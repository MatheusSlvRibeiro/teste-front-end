import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
    it('renderiza o campo com o placeholder padrão', () => {
        render(<SearchInput />)

        expect(screen.getByPlaceholderText('O que você está buscando?')).toBeInTheDocument()
    })

    it('renderiza o campo com placeholder customizado', () => {
        render(<SearchInput placeholder="Buscar por nome..." />)

        expect(screen.getByPlaceholderText('Buscar por nome...')).toBeInTheDocument()
    })

    it('chama onSearch com o valor digitado ao submeter o formulário', async () => {
        const user = userEvent.setup()
        const handleSearch = vi.fn()
        render(<SearchInput onSearch={handleSearch} />)

        const input = screen.getByPlaceholderText('O que você está buscando?')
        await user.type(input, 'tênis')
        await user.click(screen.getByRole('button', { name: 'Buscar' }))

        expect(handleSearch).toHaveBeenCalledWith('tênis')
    })
})

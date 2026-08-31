import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionTitle } from './SectionTitle'

describe('SectionTitle', () => {
    it('renderiza o texto do heading', () => {
        render(<SectionTitle text="Produtos relacionados" />)
        expect(
            screen.getByRole('heading', { level: 2, name: 'Produtos relacionados' }),
        ).toBeInTheDocument()
    })

    it('renderiza subtitle quando fornecido', () => {
        render(<SectionTitle text="Título" subtitle="Subtítulo de teste" />)
        expect(screen.getByText('Subtítulo de teste')).toBeInTheDocument()
    })

    it('não renderiza subtitle quando não fornecido', () => {
        render(<SectionTitle text="Título" />)
        expect(screen.queryByText(/subtítulo/i)).not.toBeInTheDocument()
    })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CategoryGrid } from './CategoryGrid'

describe('CategoryGrid', () => {
    it('exibe os 7 itens de categoria, na ordem do Figma', () => {
        render(<CategoryGrid />)

        const items = screen.getAllByRole('listitem').map((item) => item.textContent)
        expect(items).toEqual([
            'Tecnologia',
            'Supermercado',
            'Bebidas',
            'Ferramentas',
            'Saúde',
            'Esportes e Fitness',
            'Moda',
        ])
    })

    it('marca "Tecnologia" como categoria ativa', () => {
        render(<CategoryGrid />)

        expect(screen.getByText('Tecnologia').closest('li')).toHaveAttribute('aria-current', 'true')
    })

    it('não marca nenhuma outra categoria como ativa', () => {
        render(<CategoryGrid />)

        const inactiveLabels = [
            'Supermercado',
            'Bebidas',
            'Ferramentas',
            'Saúde',
            'Esportes e Fitness',
            'Moda',
        ]

        inactiveLabels.forEach((label) => {
            expect(screen.getByText(label).closest('li')).not.toHaveAttribute('aria-current')
        })
    })
})

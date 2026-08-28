import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NavBar } from './NavBar'

describe('NavBar', () => {
  it('expõe a navegação como landmark com os 7 itens focáveis, na ordem do Figma', () => {
    render(<NavBar />)

    const nav = screen.getByRole('navigation', { name: 'Categorias' })
    const items = screen.getAllByRole('button').map((item) => item.textContent)

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
})

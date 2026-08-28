import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrandCarousel } from './BrandCarousel'

describe('BrandCarousel', () => {
  it('expõe a região nomeada "Navegue por marcas" com exatamente 5 logos', () => {
    render(<BrandCarousel />)

    expect(screen.getByRole('region', { name: 'Navegue por marcas' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })

  it('trata os logos como decorativos, já que são o mesmo placeholder repetido', () => {
    render(<BrandCarousel />)

    expect(screen.queryAllByRole('img')).toHaveLength(0)
  })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroBanner } from './HeroBanner'

describe('HeroBanner', () => {
  it('exibe o headline, o destaque de desconto e o botão "Ver produto"', () => {
    render(<HeroBanner />)

    expect(screen.getByText('Venha conhecer nossas promoções')).toBeInTheDocument()

    const highlight = screen.getByText('50% Off')
    expect(highlight.closest('p')).toHaveTextContent('50% Off nos produtos')
    expect(screen.getByRole('button', { name: 'Ver produto' })).toBeInTheDocument()
  })

  it('renderiza o CTA como botão inerte, sem submeter nenhum formulário', () => {
    render(<HeroBanner />)

    expect(screen.getByRole('button', { name: 'Ver produto' })).toHaveAttribute('type', 'button')
  })
})

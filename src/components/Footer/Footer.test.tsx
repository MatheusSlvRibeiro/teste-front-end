import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('exibe a logo da Econverse', () => {
    render(<Footer />)

    expect(screen.getByRole('img', { name: 'Econverse' })).toBeInTheDocument()
  })

  it('expõe a navegação do rodapé com as três colunas de links', () => {
    render(<Footer />)

    const nav = screen.getByRole('navigation', { name: 'Navegação do rodapé' })

    expect(
      within(nav).getByRole('heading', { level: 2, name: 'Institucional' }),
    ).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Sobre Nós' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Movimento' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Trabalhe conosco' })).toBeInTheDocument()

    expect(within(nav).getByRole('heading', { level: 2, name: 'Ajuda' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Suporte' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Fale Conosco' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Perguntas Frequentes' })).toBeInTheDocument()

    expect(within(nav).getByRole('heading', { level: 2, name: 'Termos' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Termos e Condições' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Política de Privacidade' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Troca e Devolução' })).toBeInTheDocument()

    expect(within(nav).getAllByRole('list')).toHaveLength(3)
  })

  it('exibe a lista de redes sociais com os três ícones nomeados', () => {
    render(<Footer />)

    const social = screen.getByRole('list', { name: 'Redes sociais' })
    const links = within(social).getAllByRole('link')

    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Instagram',
      'Facebook',
      'LinkedIn',
    ])

    const icons = links.map((link) => link.querySelector('img')?.getAttribute('src'))
    expect(new Set(icons).size).toBe(3)
  })

  it('exibe a faixa legal separada do bloco principal', () => {
    render(<Footer />)

    const legalTexts = screen.getAllByText(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    )
    expect(legalTexts).toHaveLength(2)
  })
})

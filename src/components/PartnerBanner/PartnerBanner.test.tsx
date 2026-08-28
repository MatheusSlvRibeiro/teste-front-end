import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PartnerBanner } from './PartnerBanner'

describe('PartnerBanner', () => {
  it('expõe a região nomeada "Parceiros" com texto e botão "CONFIRA"', () => {
    render(<PartnerBanner description="Descontos exclusivos com nossos parceiros." />)

    expect(screen.getByRole('region', { name: 'Parceiros' })).toBeInTheDocument()
    expect(screen.getByText('Descontos exclusivos com nossos parceiros.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'CONFIRA' })).toBeInTheDocument()
  })

  it('trata a imagem de fundo como decorativa', () => {
    const { container } = render(
      <PartnerBanner description="Descontos exclusivos com nossos parceiros." />,
    )

    expect(screen.queryAllByRole('img')).toHaveLength(0)
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('partners'),
    )
  })

  it('permite customizar título e texto do CTA', () => {
    render(
      <PartnerBanner
        description="Frete grátis para lojistas parceiros."
        title="Rede parceira"
        ctaLabel="SAIBA MAIS"
      />,
    )

    expect(screen.getByRole('region', { name: 'Rede parceira' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SAIBA MAIS' })).toBeInTheDocument()
  })
})

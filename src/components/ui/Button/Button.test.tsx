import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza o conteúdo e repassa atributos extras', () => {
    render(
      <Button aria-label="Enviar formulário" className="custom">
        Confirmar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Enviar formulário' })
    expect(button).toHaveTextContent('Confirmar')
    expect(button.className).toContain('custom')
  })

  it('usa type="button" por padrão, sem submeter formulários', () => {
    render(<Button>Confirmar</Button>)

    expect(screen.getByRole('button', { name: 'Confirmar' })).toHaveAttribute('type', 'button')
  })

  it('permite sobrescrever o type para "submit"', () => {
    render(<Button type="submit">Enviar</Button>)

    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit')
  })

  it('chama onClick ao ser clicado', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Confirmar</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }))

    expect(handleClick).toHaveBeenCalledOnce()
  })
})

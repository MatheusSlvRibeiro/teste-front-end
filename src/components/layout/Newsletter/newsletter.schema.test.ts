import { describe, expect, it } from 'vitest'
import { newsletterSchema } from './newsletter.schema'

const validData = { name: 'Maria', email: 'maria@example.com', terms: true }

describe('newsletterSchema', () => {
  it('aceita nome, e-mail e termos válidos', () => {
    expect(newsletterSchema.safeParse(validData).success).toBe(true)
  })

  it('rejeita nome vazio', () => {
    const result = newsletterSchema.safeParse({ ...validData, name: '' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('Informe seu nome')
  })

  it('rejeita nome com só espaços', () => {
    const result = newsletterSchema.safeParse({ ...validData, name: '   ' })
    expect(result.success).toBe(false)
  })

  it('rejeita e-mail em formato inválido', () => {
    const result = newsletterSchema.safeParse({ ...validData, email: 'nao-e-email' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('Informe um e-mail válido')
  })

  it('rejeita quando os termos não foram aceitos', () => {
    const result = newsletterSchema.safeParse({ ...validData, terms: false })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('Você precisa aceitar os termos e condições')
  })
})

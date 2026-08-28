import { describe, expect, it } from 'vitest'
import { formatCurrency } from '../format'

describe('formatCurrency', () => {
    it('formata um número inteiro como BRL', () => {
        expect(formatCurrency(15000)).toBe('R$ 15.000,00')
    })

    it('formata valores com centavos', () => {
        expect(formatCurrency(149.9)).toBe('R$ 149,90')
    })

    it('formata zero como R$ 0,00', () => {
        expect(formatCurrency(0)).toBe('R$ 0,00')
    })
})

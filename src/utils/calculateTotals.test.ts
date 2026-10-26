import { describe, it, expect } from 'vitest'
import { calculateTotals } from './calculateTotals'

describe('calculateTotals', () => {
  it('returns zeros and fails the minimum for an empty cart', () => {
    expect(calculateTotals([])).toEqual({
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      meetsMinimum: false,
    })
  })

  it('does not apply a discount when subtotal is exactly 100', () => {
    const result = calculateTotals([{ price: 50, quantity: 2 }])
    expect(result.subtotal).toBe(100)
    expect(result.discount).toBe(0)
    expect(result.tax).toBe(5)
    expect(result.total).toBe(105)
  })

  it('applies a 10% discount when subtotal is above 100', () => {
    const result = calculateTotals([{ price: 60, quantity: 2 }])
    expect(result.subtotal).toBe(120)
    expect(result.discount).toBe(12)
    expect(result.tax).toBe(6)
    expect(result.total).toBe(114)
  })

  it('fails the minimum checkout below $10', () => {
    expect(calculateTotals([{ price: 9.99, quantity: 1 }]).meetsMinimum).toBe(false)
  })

  it('passes the minimum checkout at exactly $10', () => {
    expect(calculateTotals([{ price: 10, quantity: 1 }]).meetsMinimum).toBe(true)
  })

  it('avoids floating point errors', () => {
    expect(calculateTotals([{ price: 0.1, quantity: 3 }]).subtotal).toBe(0.3)
  })
})
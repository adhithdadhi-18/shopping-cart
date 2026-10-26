export const TAX_RATE = 0.05
export const DISCOUNT_RATE = 0.1
export const DISCOUNT_THRESHOLD = 100
export const MIN_CHECKOUT_VALUE = 10

type PricedItem = {
  price: number
  quantity: number
}

export type CartTotals = {
  subtotal: number
  tax: number
  discount: number
  total: number
  meetsMinimum: boolean
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculateTotals(items: PricedItem[]): CartTotals {
  const subtotal = round2(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )
  const discount =
    subtotal > DISCOUNT_THRESHOLD ? round2(subtotal * DISCOUNT_RATE) : 0
  const tax = round2(subtotal * TAX_RATE)
  const total = round2(subtotal - discount + tax)
  const meetsMinimum = subtotal >= MIN_CHECKOUT_VALUE

  return { subtotal, tax, discount, total, meetsMinimum }
}
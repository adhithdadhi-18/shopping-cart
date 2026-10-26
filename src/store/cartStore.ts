import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../schemas/productSchema'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5

export type CartItem = {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}

function clamp(value: number): number {
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, value))
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: clamp(item.quantity + 1) }
                  : item,
              ),
            }
          }

          const newItem: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: MIN_QUANTITY,
          }
          return { items: [...state.items, newItem] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: clamp(item.quantity + 1) }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: clamp(item.quantity - 1) }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'shopping-cart' },
  ),
)
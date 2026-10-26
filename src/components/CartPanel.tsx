import { useCartStore } from '../store/cartStore'
import { calculateTotals, MIN_CHECKOUT_VALUE } from '../utils/calculateTotals'
import { formatCurrency } from '../utils/formatCurrency'
import CartItemRow from './CartItemRow'
import CartSummary from './CartSummary'

type CartPanelProps = {
  onCheckout: () => void
}

export default function CartPanel({ onCheckout }: CartPanelProps) {
  const items = useCartStore((state) => state.items)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const totals = calculateTotals(items)
  const shortBy = MIN_CHECKOUT_VALUE - totals.subtotal

  return (
    <section
      aria-label="Shopping cart"
      className="rounded-lg border border-gray-200 bg-white p-4"
    >
      <h2 className="mb-2 text-lg font-bold text-gray-900">Your cart</h2>

      {items.length === 0 ? (
        <p className="py-8 text-center text-gray-600">
          Your cart is empty. Add some products to get started.
        </p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}
          </ul>

          <div className="mt-4 space-y-4">
            <CartSummary totals={totals} />

            {!totals.meetsMinimum && (
              <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                Checkout is disabled: the minimum order is{' '}
                {formatCurrency(MIN_CHECKOUT_VALUE)}. Add{' '}
                {formatCurrency(shortBy)} more to continue.
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear cart
              </button>
              <button
                type="button"
                onClick={onCheckout}
                disabled={!totals.meetsMinimum}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
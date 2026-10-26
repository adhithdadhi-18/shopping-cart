import { useState } from 'react'
import {
  emptyShipping,
  validateShipping,
  type ShippingDetails,
  type ShippingErrors,
} from '../schemas/shippingSchema'
import { useCartStore } from '../store/cartStore'
import { calculateTotals, MIN_CHECKOUT_VALUE } from '../utils/calculateTotals'
import { formatCurrency } from '../utils/formatCurrency'
import CartSummary from './CartSummary'
import OrderItems from './OrderItems'
import PaymentSummary from './PaymentSummary'
import ShippingForm from './ShippingForm'

type Step = 'review' | 'shipping' | 'payment'

const STEPS: { id: Step; label: string }[] = [
  { id: 'review', label: 'Cart Review' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment Summary' },
]

type CheckoutProps = {
  onBackToShop: () => void
}

export default function Checkout({ onBackToShop }: CheckoutProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [step, setStep] = useState<Step>('review')
  const [shipping, setShipping] = useState<ShippingDetails>(emptyShipping)
  const [errors, setErrors] = useState<ShippingErrors>({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totals = calculateTotals(items)

  function handleFieldChange(field: keyof ShippingDetails, value: string) {
    setShipping((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleNext() {
    if (step === 'review') {
      if (totals.meetsMinimum) setStep('shipping')
      return
    }

    if (step === 'shipping') {
      const validationErrors = validateShipping(shipping)
      setErrors(validationErrors)
      if (Object.keys(validationErrors).length === 0) setStep('payment')
      return
    }

    clearCart()
    setOrderPlaced(true)
  }

  function handleBack() {
    if (step === 'review') onBackToShop()
    if (step === 'shipping') setStep('review')
    if (step === 'payment') setStep('shipping')
  }

  if (orderPlaced) {
    return (
      <section className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-xl font-bold text-green-800">
          Order placed successfully!
        </h2>
        <p className="mt-2 text-green-700">
          Thank you, {shipping.fullName}. Your cart has been cleared.
        </p>
        <button
          type="button"
          onClick={onBackToShop}
          className="mt-6 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Continue shopping
        </button>
      </section>
    )
  }

  const currentIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
      <ol className="mb-6 flex flex-wrap gap-2 text-sm">
        {STEPS.map((s, index) => (
          <li
            key={s.id}
            className={`rounded-md px-3 py-1 font-medium ${
              index === currentIndex
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {index + 1}. {s.label}
          </li>
        ))}
      </ol>

      {step === 'review' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Cart Review</h2>
          {items.length === 0 ? (
            <p className="py-8 text-center text-gray-600">
              Your cart is empty.
            </p>
          ) : (
            <>
              <OrderItems items={items} />
              <CartSummary totals={totals} />
            </>
          )}
          {!totals.meetsMinimum && (
            <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
              You cannot continue: the minimum order is{' '}
              {formatCurrency(MIN_CHECKOUT_VALUE)}.
            </p>
          )}
        </div>
      )}

      {step === 'shipping' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Shipping</h2>
          <ShippingForm
            values={shipping}
            errors={errors}
            onChange={handleFieldChange}
          />
        </div>
      )}

      {step === 'payment' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Payment Summary</h2>
          <PaymentSummary shipping={shipping} items={items} totals={totals} />
        </div>
      )}

      <div className="mt-6 flex justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {step === 'review' ? 'Back to shop' : 'Back'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={step === 'review' && !totals.meetsMinimum}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === 'review' && 'Continue to shipping'}
          {step === 'shipping' && 'Continue to payment summary'}
          {step === 'payment' && 'Place Order'}
        </button>
      </div>
    </section>
  )
}
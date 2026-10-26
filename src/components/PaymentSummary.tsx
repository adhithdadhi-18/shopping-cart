import type { ShippingDetails } from '../schemas/shippingSchema'
import type { CartItem } from '../store/cartStore'
import type { CartTotals } from '../utils/calculateTotals'
import CartSummary from './CartSummary'
import OrderItems from './OrderItems'

type PaymentSummaryProps = {
  shipping: ShippingDetails
  items: CartItem[]
  totals: CartTotals
}

export default function PaymentSummary({
  shipping,
  items,
  totals,
}: PaymentSummaryProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-2 font-semibold text-gray-900">Shipping details</h3>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-gray-700 sm:grid-cols-2">
          <div><dt className="inline font-medium">Name: </dt><dd className="inline">{shipping.fullName}</dd></div>
          <div><dt className="inline font-medium">Email: </dt><dd className="inline">{shipping.email}</dd></div>
          <div><dt className="inline font-medium">Phone: </dt><dd className="inline">{shipping.phone}</dd></div>
          <div><dt className="inline font-medium">Address: </dt><dd className="inline">{shipping.address}</dd></div>
          <div><dt className="inline font-medium">City: </dt><dd className="inline">{shipping.city}</dd></div>
          <div><dt className="inline font-medium">Postal code: </dt><dd className="inline">{shipping.postalCode}</dd></div>
        </dl>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-gray-900">Cart items</h3>
        <OrderItems items={items} />
      </section>

      <CartSummary totals={totals} />
    </div>
  )
}
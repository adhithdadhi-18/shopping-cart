import type { CartTotals } from '../utils/calculateTotals'
import { formatCurrency } from '../utils/formatCurrency'

type CartSummaryProps = {
  totals: CartTotals
}

export default function CartSummary({ totals }: CartSummaryProps) {
  return (
    <dl className="space-y-1 text-sm text-gray-700">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{formatCurrency(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Discount (10% over $100)</dt>
        <dd>-{formatCurrency(totals.discount)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Tax (5%)</dt>
        <dd>{formatCurrency(totals.tax)}</dd>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
        <dt>Final total</dt>
        <dd>{formatCurrency(totals.total)}</dd>
      </div>
    </dl>
  )
}
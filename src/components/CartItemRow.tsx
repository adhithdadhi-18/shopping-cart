import { MAX_QUANTITY, MIN_QUANTITY, type CartItem } from '../store/cartStore'
import { formatCurrency } from '../utils/formatCurrency'

type CartItemRowProps = {
  item: CartItem
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
}

const qtyButton =
  'h-8 w-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'

export default function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <li className="flex gap-3 border-b border-gray-200 py-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-16 w-16 rounded-md bg-gray-100 object-contain"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <p className="font-medium text-gray-900">{item.title}</p>
          <p className="font-semibold text-gray-900">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
        <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= MIN_QUANTITY}
              aria-label={`Decrease quantity of ${item.title}`}
              className={qtyButton}
            >
              -
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onIncrease(item.id)}
              disabled={item.quantity >= MAX_QUANTITY}
              aria-label={`Increase quantity of ${item.title}`}
              className={qtyButton}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
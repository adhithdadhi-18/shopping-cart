import type { CartItem } from '../store/cartStore'
import { formatCurrency } from '../utils/formatCurrency'

type OrderItemsProps = {
  items: CartItem[]
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 border-b border-gray-200 py-3"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-12 w-12 rounded-md bg-gray-100 object-contain"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">
              {formatCurrency(item.price)} x {item.quantity}
            </p>
          </div>
          <p className="font-semibold text-gray-900">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </li>
      ))}
    </ul>
  )
}
import type { Product } from '../schemas/productSchema'
import { formatCurrency } from '../utils/formatCurrency'

type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full bg-gray-100 object-contain"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-600">Rating: {product.rating.toFixed(1)} / 5</p>
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(product.price)}
        </p>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="mt-auto rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
import type { Product } from '../schemas/productSchema'
import ProductCard from './ProductCard'

type ProductGridProps = {
  products: Product[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onRetry: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductGrid({
  products,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onAddToCart,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-gray-600">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
        <span>Loading products...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">Could not load products.</p>
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-gray-600">No products found.</p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
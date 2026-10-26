import ProductGrid from './components/ProductGrid'
import { useProducts } from './hooks/useProducts'

export default function App() {
  const { data, isLoading, isError, error, refetch } = useProducts()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <ProductGrid
          products={data ?? []}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error?.message}
          onRetry={() => refetch()}
          onAddToCart={() => {}}
        />
      </main>
    </div>
  )
}
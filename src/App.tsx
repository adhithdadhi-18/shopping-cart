import { useState } from 'react'
import CartPanel from './components/CartPanel'
import Checkout from './components/Checkout'
import Filters from './components/Filters'
import ProductGrid from './components/ProductGrid'
import { useProductFilters } from './hooks/useProductFilters'
import { useProducts } from './hooks/useProducts'
import { useCartStore } from './store/cartStore'

export default function App() {
  const { data, isLoading, isError, error, refetch } = useProducts()
  const filters = useProductFilters(data ?? [])
  const addItem = useCartStore((state) => state.addItem)
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
  const [view, setView] = useState<'shop' | 'checkout'>('shop')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            Cart: {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </header>

      {view === 'checkout' ? (
        <main className="mx-auto max-w-3xl px-4 py-8">
          <Checkout onBackToShop={() => setView('shop')} />
        </main>
      ) : (
        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[1fr_380px]">
          <div>
            {!isLoading && !isError && (
              <Filters
                search={filters.search}
                onSearchChange={filters.setSearch}
                category={filters.category}
                onCategoryChange={filters.setCategory}
                categories={filters.categories}
                minPrice={filters.minPrice}
                onMinPriceChange={filters.setMinPrice}
                maxPrice={filters.maxPrice}
                onMaxPriceChange={filters.setMaxPrice}
                hasActiveFilters={filters.hasActiveFilters}
                onClear={filters.clearFilters}
              />
            )}

            <ProductGrid
              products={filters.filteredProducts}
              isLoading={isLoading}
              isError={isError}
              errorMessage={error?.message}
              onRetry={() => refetch()}
              onAddToCart={addItem}
              hasActiveFilters={filters.hasActiveFilters}
              onClearFilters={filters.clearFilters}
            />
          </div>

          <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto">
            <CartPanel onCheckout={() => setView('checkout')} />
          </div>
        </main>
      )}
    </div>
  )
}
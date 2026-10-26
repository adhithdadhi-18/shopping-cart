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

      <main className="mx-auto max-w-7xl px-4 py-8">
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
      </main>
    </div>
  )
}
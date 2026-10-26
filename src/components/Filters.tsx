type FiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
  minPrice: string
  onMinPriceChange: (value: string) => void
  maxPrice: string
  onMaxPriceChange: (value: string) => void
  hasActiveFilters: boolean
  onClear: () => void
}

const inputClass =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm'

export default function Filters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  hasActiveFilters,
  onClear,
}: FiltersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={inputClass}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="minPrice" className="mb-1 block text-sm font-medium text-gray-700">
          Min price ($)
        </label>
        <input
          id="minPrice"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="maxPrice" className="mb-1 block text-sm font-medium text-gray-700">
          Max price ($)
        </label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className={inputClass}
        />
      </div>

      {hasActiveFilters && (
        <div className="sm:col-span-2 lg:col-span-5">
          <button
            type="button"
            onClick={onClear}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
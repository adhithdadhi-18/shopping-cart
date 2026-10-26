import { useMemo, useState } from 'react'
import type { Product } from '../schemas/productSchema'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    const min = minPrice === '' ? 0 : Number(minPrice)
    const max = maxPrice === '' ? Infinity : Number(maxPrice)

    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) &&
        (category === '' || p.category === category) &&
        p.price >= min &&
        p.price <= max,
    )
  }, [products, search, category, minPrice, maxPrice])

  const hasActiveFilters =
    search !== '' || category !== '' || minPrice !== '' || maxPrice !== ''

  function clearFilters() {
    setSearch('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    hasActiveFilters,
    clearFilters,
  }
}
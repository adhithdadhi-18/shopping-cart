import { productsResponseSchema, type Product } from '../schemas/productSchema'

const API_URL = 'https://dummyjson.com/products?limit=100'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch products (status ${response.status})`)
  }

  const data: unknown = await response.json()
  return productsResponseSchema.parse(data).products
}
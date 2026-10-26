import { useProducts } from './hooks/useProducts'

export default function App() {
  const { data, isLoading, isError, error } = useProducts()

  if (isLoading) return <p className="p-6">Loading...</p>
  if (isError) return <p className="p-6 text-red-600">{error.message}</p>

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600">
        Loaded {data?.length} products
      </h1>
      <p>First: {data?.[0].title}</p>
    </div>
  )
}
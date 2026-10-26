import type { ShippingDetails, ShippingErrors } from '../schemas/shippingSchema'

type ShippingFormProps = {
  values: ShippingDetails
  errors: ShippingErrors
  onChange: (field: keyof ShippingDetails, value: string) => void
}

const fields: {
  name: keyof ShippingDetails
  label: string
  type: string
}[] = [
  { name: 'fullName', label: 'Full name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'postalCode', label: 'Postal code', type: 'text' },
]

export default function ShippingForm({
  values,
  errors,
  onChange,
}: ShippingFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        const error = errors[field.name]
        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
              aria-invalid={error ? true : undefined}
              className={`w-full rounded-md border bg-white px-3 py-2 text-sm ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
        )
      })}
    </div>
  )
}
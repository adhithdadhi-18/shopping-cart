import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  address: z.string().trim().min(1, 'Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
})

export type ShippingDetails = z.infer<typeof shippingSchema>
export type ShippingErrors = Partial<Record<keyof ShippingDetails, string>>

export const emptyShipping: ShippingDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export function validateShipping(values: ShippingDetails): ShippingErrors {
  const result = shippingSchema.safeParse(values)
  if (result.success) return {}

  const errors: ShippingErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ShippingDetails
    if (!errors[field]) errors[field] = issue.message
  }
  return errors
}
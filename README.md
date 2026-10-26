# Shopping Cart Application

## Project Overview
A responsive shopping cart app built as an internship assignment. Users can browse products from a public API, search and filter them, manage a cart, and complete a 3-step checkout (Cart Review, Shipping, Payment Summary). There is no backend and no real payment.

- Live demo: https://shopping-cart-eight-livid.vercel.app
- Repository: https://github.com/adhithdadhi-18/shopping-cart.git

## Technologies Used
- React 19
- TypeScript
- Vite
- Tailwind CSS
- pnpm
- Zustand (cart state, with `persist` middleware)
- TanStack Query (product fetching, caching, loading and error states)
- Zod (API response and shipping form validation)
- localStorage (cart persistence)
- Vitest (unit tests for cart calculations)

## Setup Instructions
1. Install Node.js 20 or newer and pnpm (`npm install -g pnpm`).
2. Clone the repository:
   ```
   git clone <your GitHub link>
   cd shopping-cart
   ```
3. Install dependencies:
   ```
   pnpm install
   ```

## Commands
| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Type-check and create a production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests |

## API Used
[DummyJSON Products](https://dummyjson.com/products) (`https://dummyjson.com/products?limit=100`). The response is validated with Zod before use.

## Features Completed
- Product listing in a responsive grid (image, title, category, price, rating, Add to Cart)
- Loading, error (with retry), empty, and success states
- Search by title, filter by category, filter by price range, and clear all filters (custom `useProductFilters` hook)
- Cart: add, remove, increase, decrease, clear (quantity min 1, max 5, buttons disabled at limits)
- Cart summary: item list, quantities, line totals, subtotal, tax, discount, final total
- Cart item count in the header
- Minimum checkout of $10, with checkout disabled and an explanatory message
- Cart persistence in localStorage via Zustand `persist`
- 3-step checkout: Cart Review, Shipping, Payment Summary, where the user can only continue when the current step is valid
- Shipping form built with React state and Zod validation (no form library), with errors shown next to each field
- Read-only Payment Summary; Place Order shows a success message and clears the cart
- Unit tests for `calculateTotals`

## Calculation Rules (assumptions)
- Subtotal = sum of price x quantity
- Discount = 10% of the subtotal, only when the subtotal is greater than $100
- Tax = 5% of the subtotal (calculated before the discount)
- Final total = subtotal - discount + tax
- Minimum checkout value is $10, checked against the subtotal
- Amounts are rounded to 2 decimals

## Known Limitations
- Phone number is only checked as required, with no format validation
- Persisted localStorage data is not re-validated on load
- Orders are not sent anywhere (no backend or payment gateway)
- If the minimum price is greater than the maximum, no products are shown
- Cart prices are saved at the time of adding, so they won't update if the API price changes
- No pagination; all 100 products load at once
- Refreshing during checkout returns to the shop view (checkout step is not persisted)
- Limited automated tests (cart calculations only)
# E-commerce Frontend (React)

A responsive React frontend for the e-commerce platform. It integrates with the ecommerce_backend REST API to provide product browsing, authentication, cart management, and order placement.

## Features

- Product listing with category filter and search
- Product detail page with add-to-cart
- Authentication: register, login, logout, account update
- Shopping cart: add, remove, update quantities, clear
- Checkout: place order from cart
- View past orders
- Responsive layout using Material UI (MUI)
- API client via Axios with token interceptor
- Organized by features and pages, with React Hooks and Context

## Getting Started

1) Install dependencies:
   npm install

2) Configure environment:
   Copy .env.example to .env and set REACT_APP_API_BASE_URL to your backend API base (e.g., http://localhost:5000/api)

3) Start the app:
   npm start
   The app runs at http://localhost:3000

## Environment Variables

- REACT_APP_API_BASE_URL: Base URL of the backend API.

## Project Structure

- src/api: Axios client and endpoint wrappers
- src/context: Auth and Cart context providers
- src/components: Reusable UI components (Layout, ProductCard, CategoryFilter)
- src/pages: Route pages (Home, Products, Product Detail, Login, Register, Cart, Checkout, Orders, Account)
- src/App.js: Routing and providers

## Notes on Backend Integration

This frontend expects the backend to expose endpoints similar to:
- GET /products, GET /products/:id
- GET /categories
- POST /auth/login, POST /auth/register, GET /auth/me, POST /auth/logout, PUT /auth/me
- GET /cart, POST /cart/items, PUT /cart/items/:id, DELETE /cart/items/:id, DELETE /cart
- POST /orders, GET /orders, GET /orders/:id

Responses can vary; the frontend attempts to handle common shapes:
- Collections may be under items, results, or direct arrays.
- Pagination metadata may be under meta or pagination.

If your backend differs, adjust src/api/endpoints.js accordingly.

## Scripts

- npm start: Start dev server
- npm run build: Production build
- npm test: Run tests in CI mode
- npm run lint: Lint the codebase

## License

MIT

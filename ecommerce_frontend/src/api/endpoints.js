import api from './client';

// NOTE: Adjust these endpoints if your backend paths differ from the assumed ones.

// PUBLIC_INTERFACE
export const ProductAPI = {
  /** Fetch paginated products with optional category filter and search */
  list: (params = {}) => api.get('/products', { params }).then(r => r.data),
  /** Fetch single product by id */
  get: (id) => api.get(`/products/${id}`).then(r => r.data),
  /** Fetch categories */
  categories: () => api.get('/categories').then(r => r.data),
};

// PUBLIC_INTERFACE
export const AuthAPI = {
  /** Login user */
  login: (email, password) => api.post('/auth/login', { email, password }).then(r => r.data),
  /** Register user */
  register: (payload) => api.post('/auth/register', payload).then(r => r.data),
  /** Fetch current user profile */
  me: () => api.get('/auth/me').then(r => r.data),
  /** Logout user */
  logout: () => api.post('/auth/logout').then(r => r.data),
  /** Update account info */
  update: (payload) => api.put('/auth/me', payload).then(r => r.data),
};

// PUBLIC_INTERFACE
export const CartAPI = {
  /** Get current cart */
  get: () => api.get('/cart').then(r => r.data),
  /** Add item to cart */
  add: (productId, quantity = 1) => api.post('/cart/items', { product_id: productId, quantity }).then(r => r.data),
  /** Update cart item */
  update: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }).then(r => r.data),
  /** Remove cart item */
  remove: (itemId) => api.delete(`/cart/items/${itemId}`).then(r => r.data),
  /** Clear cart */
  clear: () => api.delete('/cart').then(r => r.data),
};

// PUBLIC_INTERFACE
export const OrderAPI = {
  /** Place order (assumes cart is source of truth) */
  place: (payload) => api.post('/orders', payload).then(r => r.data),
  /** List past orders for user */
  list: () => api.get('/orders').then(r => r.data),
  /** Get single order by id */
  get: (id) => api.get(`/orders/${id}`).then(r => r.data),
};

// PUBLIC_INTERFACE
export const PaymentAPI = {
  /** Initialize payment intent or similar flow */
  init: (orderId) => api.post(`/payments/init`, { order_id: orderId }).then(r => r.data),
};

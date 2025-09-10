import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartAPI } from '../api/endpoints';

const CartContext = createContext(undefined);

// Helpers
const calculateTotals = (items = []) => {
  const subtotal = items.reduce((sum, it) => sum + (it.price ?? it.product?.price ?? 0) * (it.quantity ?? 1), 0);
  return {
    subtotal,
    total: subtotal, // tax/shipping can be added here
    count: items.reduce((c, it) => c + (it.quantity ?? 1), 0),
  };
};

// PUBLIC_INTERFACE
export const CartProvider = ({ children }) => {
  /** Provides cart state and operations, backed by backend API. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await CartAPI.get();
      setItems(data?.items || data || []);
    } catch (e) {
      // ignore for guests if backend supports guest cart differently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addItem = useCallback(async (productId, quantity = 1) => {
    const data = await CartAPI.add(productId, quantity);
    setItems(data?.items || data || []);
  }, []);

  const updateItem = useCallback(async (itemId, quantity) => {
    const data = await CartAPI.update(itemId, quantity);
    setItems(data?.items || data || []);
  }, []);

  const removeItem = useCallback(async (itemId) => {
    const data = await CartAPI.remove(itemId);
    setItems(data?.items || data || []);
  }, []);

  const clear = useCallback(async () => {
    const data = await CartAPI.clear();
    setItems(data?.items || []);
  }, []);

  const totals = useMemo(() => calculateTotals(items), [items]);

  const value = useMemo(() => ({
    items, totals, loading,
    addItem, updateItem, removeItem, clear, reload: load
  }), [items, totals, loading, addItem, updateItem, removeItem, clear, load]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// PUBLIC_INTERFACE
export const useCart = () => {
  /** Hook to access cart context */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

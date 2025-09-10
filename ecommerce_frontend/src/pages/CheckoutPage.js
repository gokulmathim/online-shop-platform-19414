import React, { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';
import { OrderAPI } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { items, totals, clear } = useCart();
  const [form, setForm] = useState({ address: '', city: '', postal_code: '', payment_method: 'card' });
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const placeOrder = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const payload = {
        shipping_address: { address: form.address, city: form.city, postal_code: form.postal_code },
        payment_method: form.payment_method,
      };
      const order = await OrderAPI.place(payload);
      setSuccess('Order placed successfully.');
      await clear();
      setTimeout(() => navigate(`/orders`), 1200);
      return order;
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to place order');
    }
  };

  if (items.length === 0) {
    return <Typography>Your cart is empty.</Typography>;
  }

  return (
    <Stack alignItems="center">
      <Paper sx={{ p: 3, width: '100%', maxWidth: 560 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Checkout</Typography>
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Total: ${totals.total.toFixed(2)}</Typography>
        <Box component="form" onSubmit={placeOrder}>
          <Stack spacing={2}>
            <TextField label="Address" value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} required />
            <TextField label="City" value={form.city} onChange={(e)=>setForm({...form, city: e.target.value})} required />
            <TextField label="Postal Code" value={form.postal_code} onChange={(e)=>setForm({...form, postal_code: e.target.value})} required />
            <Button type="submit" variant="contained">Place Order</Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
}

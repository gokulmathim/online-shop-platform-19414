import React from 'react';
import { Box, Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, totals, updateItem, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (item, delta) => {
    const newQty = Math.max(1, (item.quantity ?? 1) + delta);
    updateItem(item.id ?? item.item_id, newQty);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Shopping Cart</Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty. <RouterLink to="/products">Go shopping</RouterLink></Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((it) => {
                const product = it.product || it;
                const price = product.price ?? it.price ?? 0;
                const qty = it.quantity ?? 1;
                return (
                  <TableRow key={it.id ?? product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">${Number(price).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                        <Button size="small" variant="outlined" onClick={() => updateQuantity(it, -1)}>-</Button>
                        <Typography>{qty}</Typography>
                        <Button size="small" variant="outlined" onClick={() => updateQuantity(it, 1)}>+</Button>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">${Number(price * qty).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <IconButton color="error" onClick={() => removeItem(it.id ?? it.item_id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button color="error" onClick={clear}>Clear Cart</Button>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6">Total: ${totals.total.toFixed(2)}</Typography>
              <Button variant="contained" onClick={() => navigate('/checkout')}>Checkout</Button>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
}

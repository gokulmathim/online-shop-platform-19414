import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductAPI } from '../api/endpoints';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    ProductAPI.list({ limit: 8 }).then(data => {
      const items = data?.items || data?.results || data || [];
      setProducts(items);
    }).catch(() => setProducts([]));
  }, []);

  return (
    <Box>
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h3" gutterBottom>Welcome to MyShop</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>Discover great products at the best prices.</Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/products')}>Shop Now</Button>
      </Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Featured</Typography>
      <Grid container spacing={2}>
        {products.map(p => (
          <Grid item key={p.id} xs={12} sm={6} md={3}>
            <ProductCard product={p} onAddToCart={(prod) => addItem(prod.id, 1)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

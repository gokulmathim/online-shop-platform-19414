import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ProductAPI } from '../api/endpoints';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    ProductAPI.get(id).then(setProduct).catch(() => setProduct(null));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  const image = product.image_url || 'https://via.placeholder.com/600x400?text=Product';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box component="img" src={image} alt={product.name} sx={{ width: '100%', borderRadius: 1 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>{product.name}</Typography>
        <Typography variant="h6" color="primary" gutterBottom>${Number(product.price ?? 0).toFixed(2)}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
        <Button variant="contained" size="large" onClick={() => addItem(product.id, 1)}>Add to Cart</Button>
      </Grid>
    </Grid>
  );
}

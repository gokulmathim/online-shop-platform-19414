import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function ProductCard({ product, onAddToCart }) {
  /** Card UI for a product with add to cart button */
  const { id, name, price, image_url, description } = product;
  const image = image_url || 'https://via.placeholder.com/400x300?text=Product';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} aria-label={`Product ${name}`}>
      <CardMedia component="img" height="180" image={image} alt={name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component={RouterLink} to={`/products/${id}`} sx={{ textDecoration: 'none' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description ? `${description.slice(0, 80)}...` : ''}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">${Number(price ?? 0).toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/products/${id}`}>View</Button>
        <Button size="small" variant="contained" onClick={() => onAddToCart?.(product)}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

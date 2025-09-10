import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, TextField, Pagination, Stack, Typography } from '@mui/material';
import { ProductAPI } from '../api/endpoints';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total_pages: 1 });
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  const params = useMemo(() => ({
    page: meta.page,
    category: category || undefined,
    search: search || undefined,
  }), [meta.page, category, search]);

  const load = async (p = params) => {
    const data = await ProductAPI.list(p);
    const items = data?.items || data?.results || data?.data || data || [];
    setProducts(items);
    const m = data?.meta || data?.pagination || {};
    setMeta({
      page: p.page || 1,
      total_pages: m.total_pages || m.pages || 1
    });
  };

  useEffect(() => {
    ProductAPI.categories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, meta.page]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Products</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <TextField fullWidth size="small" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </Stack>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={3}>
            <ProductCard product={p} onAddToCart={(prod) => addItem(prod.id, 1)} />
          </Grid>
        ))}
      </Grid>
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={meta.total_pages}
          page={meta.page}
          onChange={(_, page) => setMeta((m) => ({ ...m, page }))}
          color="primary"
        />
      </Stack>
    </Box>
  );
}

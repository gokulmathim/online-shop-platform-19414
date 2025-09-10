import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 6 }}>
      <Typography variant="h3">404</Typography>
      <Typography>Page not found</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
    </Stack>
  );
}

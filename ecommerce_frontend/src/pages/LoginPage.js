import React, { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      navigate('/');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Stack alignItems="center">
      <Paper sx={{ p: 3, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <Button type="submit" variant="contained">Login</Button>
          </Stack>
        </Box>
        <Typography sx={{ mt: 2 }}>
          Don't have an account? <RouterLink to="/register">Register</RouterLink>
        </Typography>
      </Paper>
    </Stack>
  );
}

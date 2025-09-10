import React, { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await register(form);
      navigate('/');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Stack alignItems="center">
      <Paper sx={{ p: 3, width: '100%', maxWidth: 480 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Create account</Typography>
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
            <TextField label="Email" type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required />
            <TextField label="Password" type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} required />
            <Button type="submit" variant="contained">Sign up</Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
}

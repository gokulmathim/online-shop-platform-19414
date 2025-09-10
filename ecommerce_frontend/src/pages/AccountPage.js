import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { AuthAPI } from '../api/endpoints';

export default function AccountPage() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({ name: '', email: '' });
  const [saved, setSaved] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', email: user.email || '' });
    }
  }, [user]);

  const update = async (e) => {
    e.preventDefault();
    setErr(''); setSaved('');
    try {
      await AuthAPI.update(form);
      setSaved('Profile updated successfully');
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || 'Update failed');
    }
  };

  if (!user) return <Typography>Please login to view your account.</Typography>;

  return (
    <Stack alignItems="center">
      <Paper sx={{ p: 3, width: '100%', maxWidth: 520 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>My Account</Typography>
        {saved && <Alert severity="success" sx={{ mb: 2 }}>{saved}</Alert>}
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
        <Box component="form" onSubmit={update}>
          <Stack spacing={2}>
            <TextField label="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
            <TextField label="Email" type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
            <Button type="submit" variant="contained">Save</Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
}

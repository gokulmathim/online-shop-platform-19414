import React from 'react';
import { AppBar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const NavLink = ({ to, children }) => (
  <Button color="inherit" component={RouterLink} to={to} sx={{ textTransform: 'none' }}>
    {children}
  </Button>
);

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** App layout with navigation bar and footer */
  const { user, logout } = useAuth();
  const { totals } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <StorefrontIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            MyShop
          </Typography>
          <NavLink to="/products">Products</NavLink>
          {user ? (
            <>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/account">Account</NavLink>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Sign up</NavLink>
            </>
          )}
          <IconButton component={RouterLink} to="/cart" color="inherit" aria-label="cart">
            <Badge badgeContent={totals.count} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ p: 2, bgcolor: 'grey.100', mt: 'auto', textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} MyShop. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}

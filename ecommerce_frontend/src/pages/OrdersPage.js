import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { OrderAPI } from '../api/endpoints';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    OrderAPI.list().then((data) => {
      setOrders(data?.items || data || []);
    }).catch(() => setOrders([]));
  }, []);

  if (!orders.length) return <Typography>No orders found.</Typography>;

  return (
    <Stack spacing={2}>
      <Typography variant="h4">My Orders</Typography>
      {orders.map((order) => (
        <Accordion key={order.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', justifyContent: 'space-between' }}>
              <Typography>Order #{order.id}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={order.status || 'created'} color="primary" size="small" />
                <Typography>Total: ${Number(order.total ?? order.amount ?? 0).toFixed(2)}</Typography>
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {(order.items || []).map((it) => (
                <Typography key={it.id || `${order.id}-${it.product_id}`}>{it.product?.name || it.name} x {it.quantity}</Typography>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}


// components/ShipmentStatusModal.tsx
import { Modal, Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Shipment } from '../types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./editviewmodal.module.css";

interface Props {
  open: boolean;
  shipment: Shipment | null;
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const statuses = ['Pending', 'In Transit', 'Delivered', 'Delayed'];

export default function EditViewModal({ open, shipment, onClose, onUpdateStatus }: Props) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (shipment) {
      setStatus(shipment.status);
    }
  }, [shipment]);

  const handleUpdate = () => {
    if (shipment) {
      onUpdateStatus(shipment.id, status);
    }
  };

  if (!shipment) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Update Shipment Status</Typography>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
        </Box>
      </Box>
    </Modal>
  );
}

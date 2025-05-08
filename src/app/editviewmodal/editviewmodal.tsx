// components/ShipmentStatusModal.tsx
import { Modal, Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Shipment } from '../types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./editviewmodal.module.css";

interface Props {
  // whether the modal is currently visible
  open: boolean;
  // shipment object
  shipment: Shipment | null;
  // called when closing modal
  onClose: () => void;
  // updates status of shipment in parent
  onUpdateStatus: (id: number, status: string) => void;
}

const statuses = ['Pending', 'In Transit', 'Delivered', 'Delayed'];

export default function EditViewModal({ open, shipment, onClose, onUpdateStatus }: Props) {
  const [status, setStatus] = useState('');

  // matches default modal status to shipments current status
  useEffect(() => {
    if (shipment) {
      setStatus(shipment.status);
    }
  }, [shipment]);

  // Calls the parent’s onUpdateStatus function with the current shipment ID and the selected status.
  const handleUpdate = () => {
    if (shipment) {
      onUpdateStatus(shipment.id, status);
    }
  };

  // If no shipment is selected, nothing is rendered.
  if (!shipment) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.style}>
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

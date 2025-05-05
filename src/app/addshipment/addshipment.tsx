'use client'
import { Carrier } from '../types';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

interface Props {
  carriers: Carrier[];
  onSubmit: (shipment: any) => void;
}

export default function AddShipmentForm({ carriers, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    carrier: '',
    shipDate: '',
    eta: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, status: 'Pending' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField name="origin" label="Origin" value={formData.origin} onChange={handleChange} required />
      <TextField name="destination" label="Destination" value={formData.destination} onChange={handleChange} required />
      <FormControl fullWidth>
        <InputLabel>Carrier</InputLabel>
        <Select name="carrier" value={formData.carrier} onChange={handleChange} required>
          {carriers.map((carrier) => (
            <MenuItem key={carrier.id} value={carrier.name}>
              {carrier.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField name="shipDate" label="Ship Date" type="date" InputLabelProps={{ shrink: true }} value={formData.shipDate} onChange={handleChange} required />
      <TextField name="eta" label="ETA" type="date" InputLabelProps={{ shrink: true }} value={formData.eta} onChange={handleChange} required />
      <Button variant="contained" color="primary" type="submit">Add Shipment</Button>
    </Box>
  );
}
/*
<LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker label="Ship Date" value={formData.shipDate} onChange={(date) => setFormData({ ...formData, shipDate: date })} />
//                     <DatePicker label="ETA" value={formData.eta} onChange={(date) => setFormData({ ...formData, eta: date })} />
//                 </LocalizationProvider>
*/ 
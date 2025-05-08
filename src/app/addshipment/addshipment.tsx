'use client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Carrier } from '../types';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

interface Props {
  carriers: Carrier[];
  onSubmit: (shipment: any) => void;
}

export default function AddShipmentForm({ carriers, onSubmit }: Props) {
  // initializes form and values
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    carrier: '',
    // default to todays date
    shipDate: dayjs<Dayjs>(),
    eta: dayjs<Dayjs>(),
    // shipDate: '',
    // eta: '',
  });

  // handles updates for origin, destination and carrier
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  // handles updates for both date fields
  const handleDateChange = (name: 'shipDate' | 'eta', value: Dayjs | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handles submission of form with status kept as Pending
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      origin: formData.origin,
      destination: formData.destination,
      carrier: formData.carrier,
      shipDate: formData.shipDate.format('YYYY-MM-DD'),
      eta: formData.eta.format('YYYY-MM-DD'),
      status: 'Pending', 
      // ...formData, status: 'Pending' 
    });
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Ship Date" value={formData.shipDate} onChange={(date) => handleDateChange('shipDate', date)}/>
        <DatePicker label="ETA" value={formData.eta} onChange={(date) => handleDateChange('eta', date)}/>
      </LocalizationProvider>
      {/* <TextField name="shipDate" label="Ship Date" type="date" InputLabelProps={{ shrink: true }} value={formData.shipDate} onChange={handleChange} required />
      <TextField name="eta" label="ETA" type="date" InputLabelProps={{ shrink: true }} value={formData.eta} onChange={handleChange} required /> */}
      <Button variant="contained" color="success" type="submit">Add Shipment</Button>
    </Box>
  );
}
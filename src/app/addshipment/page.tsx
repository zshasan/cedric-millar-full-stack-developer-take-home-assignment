'use client'
import Image from "next/image";
import Link from 'next/link'
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import axios from 'axios';
import styles from "./addshipment.module.css";

export default function AddShipmentForm() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    carrier: '',
    shipDate: null,
    eta: null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('/api/shipments', formData);
    alert('Shipment Added');
  };

  return (
      <div className={styles.page}>
        <a href = "/">
            <Image
                className={styles.logo}
                src="/Cedric Millar Logo.png"
                alt="Next.js logo"
                width={180}
                height={180}
                priority
            />
        </a>
        <main className={styles.main}>            
            <Box component="form" onSubmit={handleSubmit} className="user-details" display="flex" flexDirection="column" gap={2}>
                <TextField label="Origin" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} required />
                <TextField label="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} required />
                <TextField label="Carrier" select value={formData.carrier} onChange={(e) => setFormData({ ...formData, carrier: e.target.value })} required>
                    <MenuItem value="FedEx">FedEx</MenuItem>
                    <MenuItem value="UPS">UPS</MenuItem>
                    <MenuItem value="DHL">DHL</MenuItem>
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Ship Date" value={formData.shipDate} onChange={(date) => setFormData({ ...formData, shipDate: date })} />
                    <DatePicker label="ETA" value={formData.eta} onChange={(date) => setFormData({ ...formData, eta: date })} />
                </LocalizationProvider>
                <Button type="submit" variant="contained">Add Shipment</Button>
            </Box>
            <Button type="button" variant="contained"><a href = "/dashboard">Back</a></Button>
        </main>
    </div>
  );
}
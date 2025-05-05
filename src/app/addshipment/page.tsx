'use client'
import Image from "next/image";
import Link from 'next/link'
import { TextField, Button, MenuItem, Box, Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import styles from "./addshipment.module.css";
import { Carrier } from '../types';
import { useRouter } from "next/navigation";
import AddShipmentForm from "./addshipment";

export default function AddShipmentPage() {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/carriers').then((res) => setCarriers(res.data));
  }, []);

  const handleSubmit = async (shipment: any) => {
    console.log(shipment);
    await axios.post('/api/shipments', shipment);
    router.push('/dashboard');
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
      <Container>
        <Typography variant="h4" gutterBottom>Add Shipment</Typography>
        <AddShipmentForm carriers={carriers} onSubmit={handleSubmit} />
      </Container>
      <Link href="/dashboard"><Button type="button" variant="contained">Dashboard</Button></Link>
      </div>
  );  
}
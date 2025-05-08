'use client'
import Image from "next/image";
import Link from 'next/link'
import { TextField, Button, MenuItem, Box, Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./addshipment.module.css";
import { Carrier } from '../types';
import { useRouter } from "next/navigation";
import AddShipmentForm from "./addshipment";

export default function AddShipmentPage() {
  // holds the list of available carriers for the dropdown (e.g., FedEx, UPS, DHL)
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  // allows navigation
  const router = useRouter();

  // On open fetches carriers from backend
  useEffect(() => {
    axios.get('/api/carriers').then((res) => setCarriers(res.data));
  }, []);

  // 
  const handleSubmit = async (shipment: any) => {
    console.log(shipment);
    await axios.post('/api/shipments', shipment);
    // navigates back to dashboard page
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
        <Typography color="black" variant="h4" gutterBottom>Add Shipment</Typography>
        {/*Passes list of carriers and function to handle submission*/}
        <AddShipmentForm carriers={carriers} onSubmit={handleSubmit} />
      </Container>
      <Link href="/dashboard"><Button color="success" type="button" variant="contained">Dashboard</Button></Link>
      <footer>
        <Typography color="black" className="font-normal">
          &copy; Zaheer Hasan
        </Typography>
      </footer>
      </div>
  );  
}
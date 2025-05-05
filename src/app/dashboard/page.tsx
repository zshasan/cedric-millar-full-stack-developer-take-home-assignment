'use client'
import Image from "next/image";
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Container, Typography } from '@mui/material';
import { Shipment } from '../types';
import axios from 'axios';
import styles from "./dashboard.module.css";
import EditViewModal from "../editviewmodal/editviewmodal";
import Dashboard from "./dashboard";

export default function HomePage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = () => {
    axios.get('/api/shipments').then((res) => setShipments(res.data));
  };

  const handleRowClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setOpen(true);
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    await axios.put(`/api/shipments/${id}/status`, { status });
    setOpen(false);
    fetchShipments();
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
      <Typography variant="h4" gutterBottom>Shipment Dashboard</Typography>
      <Dashboard shipments={shipments} onRowClick={handleRowClick} />
      <EditViewModal
        open={open}
        shipment={selectedShipment}
        onClose={() => setOpen(false)}
        onUpdateStatus={handleStatusUpdate}
      />      
    </Container> 
    <Link href="/addshipment"><Button type="button" variant="contained">Add Shipment</Button></Link>
    </div>  
  );
}  
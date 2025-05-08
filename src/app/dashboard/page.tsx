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

export default function DashboardPage() {
  // shipments: holds the list of shipments from the backend.
  const [shipments, setShipments] = useState<Shipment[]>([]);
  // selectedShipment: holds the shipment selected to view/edit.
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  // open: controls whether the modal is open. In "closed" state
  const [open, setOpen] = useState(false);

  // Runs once on page load to populate the dashboard.
  useEffect(() => {
    fetchShipments();
  }, []);
  // Fetches shipments from your .NET API.
  const fetchShipments = () => {
    axios.get('/api/shipments').then((res) => setShipments(res.data));
  };

  // Clicking a shipment row opens the modal.
  const handleRowClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setOpen(true);
  };
  // Submitting a status change sends a PUT request, closes the modal, and refreshes the table.
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
      {/*Renders the table and modal inside a Material UI container.*/}
      <Container>
      <Typography color="black" variant="h4" gutterBottom>Shipment Dashboard</Typography>
      <Dashboard shipments={shipments} onRowClick={handleRowClick} />
      <EditViewModal
        open={open}
        shipment={selectedShipment}
        onClose={() => setOpen(false)}
        onUpdateStatus={handleStatusUpdate}
      />      
    </Container> 
    <Link href="/addshipment"><Button color="success" type="button" variant="contained">Add Shipment</Button></Link>    
    <footer>
      <Typography color="black" className="font-normal">
        &copy; Zaheer Hasan
      </Typography>
    </footer>
    </div>  
  );
}  
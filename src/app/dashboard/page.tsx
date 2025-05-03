'use client'
import Image from "next/image";
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import styles from "./dashboard.module.css";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'origin', headerName: 'Origin', width: 150 },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'carrier', headerName: 'Carrier', width: 150 },
  { field: 'shipDate', headerName: 'Ship Date', width: 150 },
  { field: 'eta', headerName: 'ETA', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
];

export default function ShipmentDashboard() {

  const [shipments, setShipments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('');

  useEffect(() => {
    axios.get('/api/shipments').then((res) => setShipments(res.data));
  }, []);

  const filteredData = shipments.filter(
    (s: any) =>
      (!statusFilter || s.status === statusFilter) &&
      (!carrierFilter || s.carrier === carrierFilter)
  );

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
      <Box>
        <Box display="flex" gap={2} mb={2}>
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Delayed">Delayed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Carrier</InputLabel>
            <Select value={carrierFilter} label="Carrier" onChange={(e) => setCarrierFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="FedEx">FedEx</MenuItem>
              <MenuItem value="UPS">UPS</MenuItem>
              <MenuItem value="DHL">DHL</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DataGrid rows={filteredData} columns={columns} pageSize={5} rowsPerPageOptions={[5]}/>
        </div>
      </Box>

      <Link href="/addshipment"><Button type="button" variant="contained">Add Shipment</Button></Link>
      </main>
    </div>
  );
}   
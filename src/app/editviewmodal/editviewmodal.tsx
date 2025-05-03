'use client'
import Image from "next/image";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import styles from "./editviewmodal.module.css";

export default function EditViewModal({ open, onClose, shipment, onSave }: any) {
  const [status, setStatus] = useState(shipment?.status || '');
  const handleSave = () => {
    onSave({ ...shipment, status });
    onClose();
  }

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
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Edit Shipment Status</DialogTitle>
                <DialogContent>
                    <TextField label="Status" select value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
                        <MenuItem value="In Transit">In Transit</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Delayed">Delayed</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>            
        </main>
      </div>
  );
}
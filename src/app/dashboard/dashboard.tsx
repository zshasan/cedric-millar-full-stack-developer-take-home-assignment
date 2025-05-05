import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Shipment } from '../types';
import { Box } from '@mui/material';

interface Props {
  shipments: Shipment[];
}

export default function Dashboard({ shipments, onRowClick}: Props) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'origin', headerName: 'Origin', width: 150 },
    { field: 'destination', headerName: 'Destination', width: 150 },
    { field: 'carrier', headerName: 'Carrier', width: 130 },
    { field: 'shipDate', headerName: 'Ship Date', width: 130 },
    { field: 'eta', headerName: 'ETA', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={shipments}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        onRowClick={(params: GridRowParams) => onRowClick(params.row as Shipment)}
      />
    </Box>
  );
}

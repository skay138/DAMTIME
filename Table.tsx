import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'Location', headerName: '장소명', width: 130 },
  { field: 'Description', headerName: '상세정보', width: 130 },
  { field: 'FacilityType', headerName: '흡연구역유형', width: 80 },
];


export default function DataTable( mypindata ) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={mypindata}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

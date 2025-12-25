import { GridColDef } from '@mui/x-data-grid';
import { format, isValid } from 'date-fns';

export const generateTableConfigs = (columns: GridColDef<any>[]): GridColDef[] => {
  return [
    {
      field: 'index',
      headerName: '*',
      width: 50,
      sortable: true,
      align: 'center' as const,
      headerAlign: 'center' as const,
    },
    ...columns,
    {
      field: 'nguoiTao',
      headerName: 'Người tạo',
      width: 150,
      sortable: true,
    },
    {
      field: 'ngayTao',
      headerName: 'Ngày tạo',
      width: 150,
      sortable: true,
      valueGetter: (value) => {
        if (!value) return '';
        const date = typeof value === 'string' ? new Date(value) : value;
        return isValid(date) ? format(date, 'dd/MM/yyyy HH:mm:ss') : '';
      },
    },
    {
      field: 'nguoiCapNhat',
      headerName: 'Người cập nhật',
      width: 150,
      sortable: true,
    },
    {
      field: 'ngayCapNhat',
      headerName: 'Ngày cập nhật',
      width: 150,
      sortable: true,
      valueGetter: (value) => {
        if (!value) return '';
        const date = typeof value === 'string' ? new Date(value) : value;
        return isValid(date) ? format(date, 'dd/MM/yyyy HH:mm:ss') : '';
      },
    },
  ];
};

import { GridColDef } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { getLoaiToaNhaLabel } from '../LoaiToaNhaEnums';

export const toaNhaColumns = (onViewStructure: (id: string) => void): GridColDef[] => [
  {
    field: 'tenToaNha',
    headerName: 'Tên tòa nhà',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'loaiToaNha',
    headerName: 'Loại tòa nhà',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => getLoaiToaNhaLabel(params.value),
  },
  {
    field: 'soTang',
    headerName: 'Số tầng',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'ghiChu',
    headerName: 'Ghi Chú',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'actions_structure',
    headerName: 'Cấu trúc',
    width: 50,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Tooltip title="Quản lý tầng & phòng">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onViewStructure(params.row.id);
          }}
        >
          <AccountTreeIcon color="primary" fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];

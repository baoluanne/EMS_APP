import { GridAlignment } from '@mui/x-data-grid';
import { generateTableConfigs } from '@renderer/shared/configs/base-table.config';

export const chuongTrinhDaoTaoLopHocMonHocColumns = generateTableConfigs([
  // Thông tin môn học
  {
    field: 'maMonHoc',
    headerName: 'Mã môn học',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'tenMonHoc',
    headerName: 'Tên môn học',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'maLopMonHoc',
    headerName: 'Mã lớp MH/MĐ',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'soTinChi',
    headerName: 'Số TC',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'soLanKiemTraDK',
    headerName: 'Số lần KTDK',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },

  // Số tiết
  { field: 'soTietLT', headerName: 'LT', sortable: true, headerAlign: 'center' as GridAlignment },
  { field: 'soTietTH', headerName: 'TH', sortable: true, headerAlign: 'center' as GridAlignment },

  // GVHD
  { field: 'maGV', headerName: 'Mã GV', sortable: true, headerAlign: 'center' as GridAlignment },
  { field: 'tenGV', headerName: 'Họ tên', sortable: true, headerAlign: 'center' as GridAlignment },

  // GV ra đề
  {
    field: 'gvRaDe',
    headerName: 'GV ra đề',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },

  // Hình thức thi
  {
    field: 'hinhThucThi',
    headerName: 'Hình thức thi',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },

  // Thời gian KTKT
  {
    field: 'ngayThi1',
    headerName: 'Ngày',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'soLuongThiSinh1',
    headerName: 'SL TS',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'ngayThi2',
    headerName: 'Ngày',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'soLuongThiSinh2',
    headerName: 'SL TS',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },

  // GV chấm KTKT
  {
    field: 'gvChamLan1',
    headerName: 'Lần 1',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
  {
    field: 'gvChamLan2',
    headerName: 'Lần 2',
    sortable: true,
    headerAlign: 'center' as GridAlignment,
  },
]);

export const chuongTrinhDaoTaoLopHocMonHocColumnGroupingModel = [
  {
    groupId: 'Thông tin môn học',
    headerAlign: 'center' as GridAlignment,
    children: [
      { field: 'maMonHoc' },
      { field: 'tenMonHoc' },
      { field: 'maLopMonHoc' },
      { field: 'soTinChi' },
      { field: 'soLanKiemTraDK' },
    ],
  },
  {
    groupId: 'Số tiết',
    headerAlign: 'center' as GridAlignment,
    children: [{ field: 'soTietLT' }, { field: 'soTietTH' }],
  },
  {
    groupId: 'GVHD',
    headerAlign: 'center' as GridAlignment,
    children: [{ field: 'maGV' }, { field: 'tenGV' }],
  },
  {
    groupId: 'Thời gian KTKT',
    headerAlign: 'center' as GridAlignment,
    children: [
      {
        groupId: 'Lần thi 1',
        headerAlign: 'center' as GridAlignment,
        children: [{ field: 'ngayThi1' }, { field: 'soLuongThiSinh1' }],
      },
      {
        groupId: 'Lần thi 2',
        headerAlign: 'center' as GridAlignment,
        children: [{ field: 'ngayThi2' }, { field: 'soLuongThiSinh2' }],
      },
    ],
  },
  {
    groupId: 'GV chấm KTKT',
    headerAlign: 'center' as GridAlignment,
    children: [{ field: 'gvChamLan1' }, { field: 'gvChamLan2' }],
  },
];

import { Option } from '@renderer/shared/types';

export const quyUocTCRadios: Option[] = [
  { label: 'Tất cả quy ước', value: '0' }, // Không filter
  { label: 'Không tính TBC', value: '1' }, // isKhongTinhTBC = true
  { label: 'Chỉ điểm cuối kỳ', value: '2' }, // isChiDiemCuoiKy = true
  { label: 'Có điểm thực hành', value: '3' }, // soCotDiemTH > 0 (hoặc not null)
  { label: 'Có điểm TL/BTL', value: '4' }, // tieuLuan_BTL > 0 (hoặc not null)
];

export const trangThaiQuyUocCotDiemTCRadios: Option[] = [
  { label: 'Tất cả', value: '0' }, // Không filter
  { label: 'Đang sử dụng', value: '1' }, // IsSuDung = true
  { label: 'Ngưng sử dụng', value: '2' }, // IsSuDung = false
];

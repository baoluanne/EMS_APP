import { NguonDangKyEnum } from '../enums';
import { Option } from '../types';

export const NGUON_DANG_KY_OPTIONS: Option[] = [
  { label: 'Đăng ký tự động', value: NguonDangKyEnum.DangKyTuDong },
  { label: 'Đăng ký thủ công', value: NguonDangKyEnum.DangKyThuCong },
];

export const NGUON_DANG_KY_MAP: Record<string, string> = Object.fromEntries(
  NGUON_DANG_KY_OPTIONS.map((opt) => [opt.value, opt.label]),
);

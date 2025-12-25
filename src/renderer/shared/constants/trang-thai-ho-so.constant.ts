import { Option } from '../types';

export const TRANG_THAI_HO_SO_OPTIONS: Option[] = [
  { label: 'Chờ duyệt', value: '0' },
  { label: 'Duyệt', value: '1' },
  { label: 'Từ chối', value: '2' },
];

export const TRANG_THAI_HO_SO_MAP: Record<string, string> = Object.fromEntries(
  TRANG_THAI_HO_SO_OPTIONS.map((opt) => [opt.value, opt.label]),
);

import { Option } from '../types';

export const GENDER_OPTIONS: Option[] = [
  { label: 'Nam', value: '0' },
  { label: 'Nữ', value: '1' },
  { label: 'Khác', value: '2' },
];

export const GIOI_TINH_MAP: Record<string, string> = Object.fromEntries(
  GENDER_OPTIONS.map((opt) => [opt.value, opt.label]),
);

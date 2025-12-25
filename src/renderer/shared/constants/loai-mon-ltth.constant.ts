import { Option } from '../types';

export const LOAI_MON_LTTH_OPTIONS: Option[] = [
  { label: 'Lý thuyết', value: '0' },
  { label: 'Thực hành', value: '1' },
];

export const LOAI_MON_LTTH_MAP: Record<string, string> = Object.fromEntries(
  LOAI_MON_LTTH_OPTIONS.map((opt) => [opt.value, opt.label]),
);

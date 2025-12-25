import { Option } from '../types';

export const LOAI_LOP_LHP_OPTIONS: Option[] = [
  { label: 'Tín chỉ', value: '0' },
  { label: 'Niên chế', value: '1' },
  { label: 'Thi lại', value: '2' },
];

export const LOAI_LOP_LHP_MAP: Record<string, string> = Object.fromEntries(
  LOAI_LOP_LHP_OPTIONS.map((opt) => [opt.value, opt.label]),
);

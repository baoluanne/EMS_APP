export const TRANG_THAI_SINH_VIEN_OPTIONS = [
  { value: '0', label: 'Đang học' },
  { value: '1', label: 'Đình chỉ' },
  { value: '2', label: 'Bảo lưu' },
  { value: '3', label: 'Thôi học' },
  { value: '4', label: 'Đã tốt nghiệp' },
  { value: '5', label: 'Vượt quá thời hạn tốt nghiệp' },
  { value: '6', label: 'Rút học phí' },
];

export const TRANG_THAI_SV_MAP: Record<string, string> = Object.fromEntries(
  TRANG_THAI_SINH_VIEN_OPTIONS.map((opt) => [opt.value, opt.label]),
);

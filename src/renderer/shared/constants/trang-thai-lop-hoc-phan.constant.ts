export const TRANG_THAI_LHP_OPTIONS = [
  { value: '0', label: 'Chưa mở' },
  { value: '1', label: 'Đang mở đăng ký' },
  { value: '2', label: 'Đã mở đăng ký' },
  { value: '3', label: 'Đang học' },
  { value: '4', label: 'Đã kết thúc' },
  { value: '5', label: 'Đã hủy' },
];

export const TRANG_THAI_LHP_MAP: Record<string, string> = Object.fromEntries(
  TRANG_THAI_LHP_OPTIONS.map((opt) => [opt.value, opt.label]),
);
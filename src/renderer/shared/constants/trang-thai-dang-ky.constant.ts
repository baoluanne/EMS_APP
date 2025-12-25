export const TRANG_THAI_DANG_KY_OPTIONS = [
  { label: 'Đăng ký mới', value: '0' },
  { label: 'Đăng ký học lại', value: '1' },
  { label: 'Đăng ký học cải thiện', value: '2' },
  { label: 'Hủy để học lại', value: '3' },
  { label: 'Hủy để học cải thiện', value: '4' },
  { label: 'Xóa bỏ đăng ký', value: '5' },
  { label: 'Chuyển ngành', value: '6' },
  { label: 'N*', value: '7' },
];


export const TRANG_THAI_DK_MAP: Record<string, string> = Object.fromEntries(
  TRANG_THAI_DANG_KY_OPTIONS.map((opt) => [opt.value, opt.label]),
);

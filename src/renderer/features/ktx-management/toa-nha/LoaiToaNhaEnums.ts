export const LOAI_TOA_NHA = {
  NAM: 0,
  NU: 1,
  HON_HOP: 2,
};

export const LOAI_TOA_NHA_OPTIONS = [
  { value: LOAI_TOA_NHA.NAM, label: 'Nam', color: 'blue' },
  { value: LOAI_TOA_NHA.NU, label: 'Nữ', color: 'pink' },
  { value: LOAI_TOA_NHA.HON_HOP, label: 'Hỗn hợp', color: 'purple' },
];

export const getLoaiToaNhaLabel = (value: number) => {
  const option = LOAI_TOA_NHA_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : 'Chưa xác định';
};

// src/renderer/features/student-financial-management/quan-ly-cong-no/hoan-tien-sinh-vien/types.ts
export interface PhieuChiSinhVien {
  id: string;
  soPhieu: string;
  sinhVienId: string;
  soTien: number;
  lyDoChi: string;
  ngayChi: string; // date string
  hinhThucChi: string;
  soTaiKhoanNhan?: string;
  nganHangNhan?: string;

  sinhVien?: {
    maSinhVien: string;
    hoDem: string;
    ten: string;
  };
}

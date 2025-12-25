// types.ts
export interface MienGiamSinhVien {
  id: string;
  sinhVienId: string;
  namHocHocKyId?: string;
  soTien: number;
  lyDo: string;
  fileDinhKem?: string;
  trangThai: 'ChoDuyet' | 'DaDuyet' | 'TuChoi';
  ghiChu?: string;

  sinhVien?: { maSinhVien: string; hoDem: string; ten: string; lopHoc?: { tenLop: string } };
  namHocHocKy?: { tenDot: string };
}

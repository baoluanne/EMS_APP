export interface GiangVien {
  id?: string;
  maGiangVien: string;
  hoDem: string;
  ten: string;
  ngaySinh?: Date;
  soDienThoai?: string;
  diaChi?: string;
  email?: string;
  idLoaiGiangVien: string;
  idHocVi?: string;
  idKhoa: string;
  idToBoMon?: string;
  tenVietTat?: string;
  hsgV_LT?: number;
  hsgV_TH?: number;
  phuongTien?: string;
  isChamDutHopDong: boolean;
  isCoiThi: boolean;
  isVisible?: boolean;
  isKhongChamCong: boolean;
  ngayChamDutHopDong?: Date;
}

export interface LoaiGiangVien {
  id?: string;
  maLoaiGiangVien: string;
  tenLoaiGiangVien: string;
}

export interface HocVi {
  id?: string;
  maHocVi: string;
  tenHocVi: string;
}

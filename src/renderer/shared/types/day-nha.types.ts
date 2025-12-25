export interface DayNha {
  id?: string;
  maDayNha: string;
  tenDayNha: string;
  soTang?: number;
  soPhong?: number;
  ghiChu?: string;
  idDiaDiemPhong: string;
  diaDiemPhong?: any; // Replace 'any' with the correct type if you have it
  phongHoc?: any[]; // Replace 'any' with the correct type if you have it
}

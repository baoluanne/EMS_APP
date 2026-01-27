import { z } from 'zod';

export enum LoaiViPhamNoiQuy {
  SuDungChatCam = 1,
  GayMatTratTu = 2,
  KhongVeDungGio = 3,
  NauAnTrongPhong = 4,
  DuaNguoiLaVaoPhong = 5,
}

export const LoaiViPhamConst = {
  [LoaiViPhamNoiQuy.SuDungChatCam]: { label: 'Sử dụng chất cấm', diem: 50 },
  [LoaiViPhamNoiQuy.GayMatTratTu]: { label: 'Gây mất trật tự', diem: 10 },
  [LoaiViPhamNoiQuy.KhongVeDungGio]: { label: 'Không về đúng giờ', diem: 5 },
  [LoaiViPhamNoiQuy.NauAnTrongPhong]: { label: 'Nấu ăn trong phòng', diem: 20 },
  [LoaiViPhamNoiQuy.DuaNguoiLaVaoPhong]: { label: 'Đưa người lạ vào phòng', diem: 30 },
};

export interface ViPhamNoiQuyFilterState {
  maBienBan?: string;
  maSinhVien?: string;
  hoTen?: string;
  maPhong?: string;
  viPhamTu?: number | '';
  soDienThoai?: string;
  tuNgay?: Date | null;
  denNgay?: Date | null;
  keyword?: string;
}

export const viPhamNoiQuyDefaultFilters: ViPhamNoiQuyFilterState = {
  maBienBan: '',
  maSinhVien: '',
  hoTen: '',
  maPhong: '',
  viPhamTu: '',
  soDienThoai: '',
  tuNgay: null,
  denNgay: null,
};

export const viPhamNoiQuySchema = z.object({
  id: z.string().nullable().optional(),
  sinhVienId: z
    .any()
    .transform((val) => (typeof val === 'object' && val !== null ? val.sinhVienId || val.id : val))
    .refine((val) => !!val, 'Vui lòng chọn sinh viên'),
  loaiViPham: z.nativeEnum(LoaiViPhamNoiQuy),
  maBienBan: z.string().optional(),
  noiDungViPham: z.string().optional(),
  hinhThucXuLy: z.string().nullable().optional(),
  diemTru: z.coerce.number().min(0),
  ngayViPham: z.coerce.date(),
  ghiChu: z.string().nullable().optional(),
});

export type ViPhamNoiQuy = z.infer<typeof viPhamNoiQuySchema> & {
  lanViPham?: number;
  sinhVien?: {
    maSinhVien: string;
    fullName: string;
    hoDem: string;
    ten: string;
    soDienThoai?: string;
  };
  phongKtx?: {
    maPhong: string;
  };
  tongDiemViPham?: number;
};

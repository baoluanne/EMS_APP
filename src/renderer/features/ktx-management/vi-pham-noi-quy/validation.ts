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
  tuNgay?: Date | null;
  denNgay?: Date | null;
  keyword?: string;
  //diemTru?: number | null; // Cho phép null để xóa bộ lọc dễ dàng
}

export const viPhamNoiQuyDefaultFilters: ViPhamNoiQuyFilterState = {
  maBienBan: '',
  maSinhVien: '',
  hoTen: '',
  tuNgay: null,
  denNgay: null,
  //diemTru: null, // Để null mặc định sẽ chuyên nghiệp hơn là để cứng 10
};

export const viPhamNoiQuySchema = z.object({
  id: z.string().nullable().optional(),
  sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),
  loaiViPham: z.nativeEnum(LoaiViPhamNoiQuy),
  maBienBan: z.string().optional(),
  noiDungViPham: z.string().min(1, 'Nhập nội dung chi tiết'),
  hinhThucXuLy: z.string().nullable().optional(),
  diemTru: z.coerce.number().min(0),
  ngayViPham: z.date(),
});

export type ViPhamNoiQuy = z.infer<typeof viPhamNoiQuySchema> & {
  lanViPham?: number;
  sinhVien?: {
    maSinhVien: string;
    fullName: string;
    hoDem: string;
    ten: string;
  };
};
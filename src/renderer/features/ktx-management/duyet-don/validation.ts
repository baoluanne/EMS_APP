import { z } from 'zod';

export const duyetDonSchema = z.object({
  id: z.string().optional(),
  idSinhVien: z.string().min(1, 'Sinh viên không được để trống'),
  idHocKy: z.string().min(1, 'Học kỳ không được để trống'),
  loaiDon: z.coerce.number().min(0, 'Loại đơn không được để trống'),
  phongYeuCauId: z.string().min(1, 'Phòng yêu cầu không được để trống'),
  trangThai: z.coerce.number(),
  ngayGuiDon: z.string().optional().nullable(),
  ngayBatDau: z.string().optional().nullable(),
  ngayHetHan: z.string().optional().nullable(),
  ghiChu: z.string().optional().nullable(),
  idGoiDichVu: z.string().optional().nullable(),
  phongDuocDuyetId: z.string().optional().nullable(),
  giuongDuocDuyetId: z.string().optional().nullable(),
});

export type DuyetDon = z.infer<typeof duyetDonSchema>;

export interface DuyetDonFilterState {
  idSinhVien?: string;
  idHocKy?: string;
  loaiDon?: number;
  trangThai?: number;
  tuNgay?: string;
  denNgay?: string;
}

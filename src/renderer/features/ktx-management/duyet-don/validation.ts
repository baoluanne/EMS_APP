import { z } from 'zod';

export const duyetDonSchema = z
  .object({
    id: z.string().optional(),
    idSinhVien: z.string().min(1, 'Sinh viên không được để trống'),
    idHocKy: z.string().optional().nullable(),
    loaiDon: z.coerce.number().min(0, 'Loại đơn không được để trống'),
    phongYeuCauId: z.string().optional().nullable(),
    trangThai: z.coerce.number(),
    ngayGuiDon: z.string().optional().nullable(),
    ngayBatDau: z.string().optional().nullable(),
    ngayHetHan: z.string().optional().nullable(),
    ghiChu: z.string().optional().nullable(),
    idGoiDichVu: z.string().optional().nullable(),
    phongDuocDuyetId: z.string().optional().nullable(),
    giuongDuocDuyetId: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.loaiDon === 0 || data.loaiDon === 1) &&
      (!data.idGoiDichVu || data.idGoiDichVu.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Khoản thu không được để trống',
        path: ['idGoiDichVu'],
      });
    }

    if (
      (data.loaiDon === 0 || data.loaiDon === 1) &&
      (!data.idHocKy || data.idHocKy.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Học kì không được để trống',
        path: ['idHocKy'],
      });
    }

    if (
      (data.loaiDon === 0 || data.loaiDon === 2) &&
      (!data.phongYeuCauId || data.phongYeuCauId.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phòng yêu cầu không được để trống',
        path: ['phongYeuCauId'],
      });
    }
  });

export type DuyetDon = z.infer<typeof duyetDonSchema>;

export interface DuyetDonFilterState {
  fullName?: string;
  idHocKy?: string;
  loaiDon?: number;
  trangThai?: number;
  tuNgay?: string;
  denNgay?: string;
  maDon?: string;
  gioiTinh?: number;
  ngaySinh?: string;
  ngayGuiDon?: string;
}

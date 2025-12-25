import { z } from 'zod';

export const MonHocSchema = z.object({
  id: z.string().optional(),
  maMonHoc: z
    .string({ required_error: 'Mã môn học là bắt buộc' })
    .trim()
    .min(1, 'Mã môn học là bắt buộc'),
  tenMonHoc: z
    .string({ required_error: 'Tên môn học là bắt buộc' })
    .trim()
    .min(1, 'Tên môn học là bắt buộc'),
  maTuQuan: z.string().nullable().optional(),
  tenTiengAnh: z.string().nullable().optional(),
  tenVietTat: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
  isKhongTinhTBC: z.boolean().nullable().optional(),
  idLoaiMonHoc: z
    .string({ required_error: 'Loại môn học là bắt buộc' })
    .min(1, 'Loại môn học là bắt buộc'),
  loaiMonHoc: z.any().optional(),
  idKhoa: z.string({ required_error: 'Khoa là bắt buộc' }).min(1, 'Khoa là bắt buộc'),
  khoa: z.any().optional(),
  idToBoMon: z.string().nullable().optional(),
  toBoMon: z.any().optional(),
  idLoaiTiet: z.string().nullable().optional(),
  loaiTiet: z.any().optional(),
  idKhoiKienThuc: z.string().nullable().optional(),
  khoiKienThuc: z.any().optional(),
  idTinhChatMonHoc: z.string().nullable().optional(),
  tinhChatMonHoc: z.any().optional(),
});

export type MonHocForm = z.infer<typeof MonHocSchema>;

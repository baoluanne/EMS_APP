import { z } from 'zod';

export const GiangVienSchema = z.object({
  id: z.string().optional(),
  maGiangVien: z
    .string({ required_error: 'Mã giảng viên không được để trống.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  hoDem: z
    .string({ required_error: 'Họ đệm không được để trống.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  ten: z
    .string({ required_error: 'Tên không được để trống.' })
    .trim()
    .min(1, { message: 'Trường này không được để trống.' }),
  ngaySinh: z.coerce.date().optional(),
  soDienThoai: z.string().nullable().optional(),
  diaChi: z.string().nullable().optional(),
  email: z.string().email('Email không hợp lệ.').optional(),
  idLoaiGiangVien: z
    .string({ required_error: 'Loại giảng viên không được để trống.' })
    .min(1, { message: 'Trường này không được để trống.' }),
  idHocVi: z.string().nullable().optional(),
  idKhoa: z
    .string({ required_error: 'Khoa không được để trống.' })
    .min(1, { message: 'Trường này không được để trống.' }),
  idToBoMon: z.string().nullable().optional(),
  tenVietTat: z.string().nullable().optional(),
  hsgV_LT: z.coerce.number().optional(),
  hsgV_TH: z.coerce.number().optional(),
  phuongTien: z.string().nullable().optional(),
  isChamDutHopDong: z.boolean(),
  isCoiThi: z.boolean(),
  isVisible: z.boolean().optional(),
  isKhongChamCong: z.boolean(),
  ngayChamDutHopDong: z.coerce.date().optional(),
});

export type GiangVien = z.infer<typeof GiangVienSchema>;

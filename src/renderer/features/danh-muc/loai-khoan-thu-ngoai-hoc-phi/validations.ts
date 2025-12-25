import { z } from 'zod';

export const loaiKhoanThuNgoaiHocPhiSchema = z.object({
  id: z.string().trim().optional().nullable(),
  maLoaiKhoanThu: z
    .string({ required_error: 'Mã loại khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Mã loại khoản thu là bắt buộc'),
  tenLoaiKhoanThu: z
    .string({ required_error: 'Tên loại khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Tên loại khoản thu là bắt buộc'),
  stt: z.coerce.number().min(0, 'STT không được âm').optional(),
  xuatHoaDonDienTu: z.boolean().default(false),
  phanBoDoanThu: z.boolean().default(false),
  hinhThucThu: z.number().optional().nullable(),
  maTKNganHang: z.string().trim().optional().nullable(),
});

export type LoaiKhoanThuNgoaiHocPhiSchema = z.input<typeof loaiKhoanThuNgoaiHocPhiSchema>;


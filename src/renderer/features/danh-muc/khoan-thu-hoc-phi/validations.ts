import { z } from 'zod';

export const danhMucKhoanThuHocPhiSchema = z.object({
  id: z.string().trim().optional().nullable(),

  maKhoanThu: z
    .string({ required_error: 'Mã khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Mã khoản thu là bắt buộc'),
  tenKhoanThu: z
    .string({ required_error: 'Tên khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Tên khoản thu là bắt buộc'),

  stt: z.coerce
    .number()
    .int('STT phải là số nguyên')
    .nonnegative('STT không được âm')
    .optional()
    .nullable(),

  capSoHoaDonDienTu: z.boolean().default(false),

  ghiChu: z.string().trim().optional().nullable(),
});

export type DanhMucKhoanThuHocPhiSchema = z.input<typeof danhMucKhoanThuHocPhiSchema>;

export const defaultDanhMucKhoanThuHocPhi: DanhMucKhoanThuHocPhiSchema = {
  id: null,
  maKhoanThu: '',
  tenKhoanThu: '',
  stt: null,
  capSoHoaDonDienTu: false,
  ghiChu: null,
};

import { z } from 'zod';

export const danhMucKhoanChiSchema = z.object({
  id: z.string().trim().optional().nullable(),

  maKhoanChi: z
    .string({ required_error: 'Mã khoản chi là bắt buộc' })
    .trim()
    .min(1, 'Mã khoản chi là bắt buộc'),
  tenKhoanChi: z
    .string({ required_error: 'Tên khoản chi là bắt buộc' })
    .trim()
    .min(1, 'Tên khoản chi là bắt buộc'),

  stt: z.coerce
    .number()
    .int('STT phải là số nguyên')
    .nonnegative('STT không được âm')
    .optional()
    .nullable(),

  ghiChu: z.string().trim().optional().nullable(),
});

export type DanhMucKhoanChiSchema = z.input<typeof danhMucKhoanChiSchema>;

export const defaultDanhMucKhoanChi: DanhMucKhoanChiSchema = {
  id: null,
  maKhoanChi: '',
  tenKhoanChi: '',
  stt: null,
  ghiChu: null,
};

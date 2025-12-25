import { DonViTinh } from '@renderer/shared/enums/donViTinh.enum';
import { z } from 'zod';

export const danhMucKhoanThuNgoaiHocPhiSchema = z.object({
  id: z.string().trim().optional().nullable(),

  maKhoanThu: z
    .string({ required_error: 'Mã khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Mã khoản thu là bắt buộc'),
  tenKhoanThu: z
    .string({ required_error: 'Tên khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Tên khoản thu là bắt buộc'),

  soTien: z.coerce.number().nonnegative('Số tiền không được âm'),

  stt: z.coerce
    .number()
    .int('STT phải là số nguyên')
    .nonnegative('STT không được âm')
    .optional()
    .nullable(),

  idLoaiKhoanThu: z
    .string()
    .min(1, 'Loại khoản thu là bắt buộc')
    .uuid('Id loại khoản thu không hợp lệ (UUID)')
    .refine(
      (data) => data !== '00000000-0000-0000-0000-000000000000',
      'Loại khoản thu là bắt buộc',
    ),

  loaiKhoanThu: z
    .object({
      id: z.string().uuid().optional().nullable(),
      maLoaiKhoanThu: z.string().nullable().optional(),
      tenLoaiKhoanThu: z.string().nullable().optional(),
    })
    .optional()
    .nullable(),

  donViTinh: z.nativeEnum(DonViTinh),

  thueVAT: z.coerce.number().min(0, 'Thuế VAT phải ≥ 0').max(100, 'Thuế VAT tối đa 100'),

  gomThueVAT: z.boolean().default(false),

  ghiChu: z.string().trim().optional().nullable(),
});

export type DanhMucKhoanThuNgoaiHocPhiSchema = z.input<typeof danhMucKhoanThuNgoaiHocPhiSchema>;

export const defaultDanhMucKhoanThuNgoaiHocPhi: DanhMucKhoanThuNgoaiHocPhiSchema = {
  id: null,
  maKhoanThu: '',
  tenKhoanThu: '',
  soTien: 0,
  stt: null,
  idLoaiKhoanThu: '00000000-0000-0000-0000-000000000000',
  loaiKhoanThu: null,
  donViTinh: DonViTinh.VND,
  thueVAT: 0,
  gomThueVAT: false,
  ghiChu: null,
};

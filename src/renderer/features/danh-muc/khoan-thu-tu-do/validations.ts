import { DonViTinh } from '@renderer/shared/enums/donViTinh.enum';
import { LoaiKhoanThu } from '@renderer/shared/types/loai-khoan-thu.types';
import { z } from 'zod';

export const DanhMucKhoanThuTuDoSchema = z.object({
  id: z.string().uuid().optional(),

  maKhoanThu: z
    .string({ required_error: 'Mã khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Mã khoản thu là bắt buộc'),
  tenKhoanThu: z
    .string({ required_error: 'Tên khoản thu là bắt buộc' })
    .trim()
    .min(1, 'Tên khoản thu là bắt buộc'),

  soTien: z.coerce.number().finite().nullable().optional(),
  stt: z.coerce.number().int().nullable().optional(),

  idLoaiKhoanThu: z
    .string({ required_error: 'Loại khoản thu là bắt buộc' })
    .uuid()
    .min(1, 'Loại khoản thu là bắt buộc'),

  thueVAT: z.coerce.number().nullable().optional(),
  gomThueVAT: z.coerce.boolean().default(false).nullable().optional(),

  isVisible: z.coerce.boolean().default(false).nullable().optional(),
  donViTinh: z.nativeEnum(DonViTinh).nullable().optional(),

  ghiChu: z.string().nullable().optional(),
});

export type KhoanThuTuDo = z.infer<typeof DanhMucKhoanThuTuDoSchema>;
export type DanhMucKhoanThuTuDo = KhoanThuTuDo & {
  loaiKhoanThu: LoaiKhoanThu;
};

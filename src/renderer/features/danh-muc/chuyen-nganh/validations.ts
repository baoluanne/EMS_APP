import { NganhHoc } from '@renderer/shared/types';
import { z } from 'zod';

export const ChuyenNganhSchema = z.object({
  id: z.string().optional(),
  maChuyenNganh: z
    .string({ required_error: 'Mã chuyên ngành là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã chuyên ngành là bắt buộc' }),
  tenChuyenNganh: z
    .string({ required_error: 'Tên chuyên ngành là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên chuyên ngành là bắt buộc' }),
  idNganhHoc: z.string({ required_error: 'Ngành là bắt buộc' }).min(1, 'Ngành là bắt buộc'),

  maNganhTuQuan: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
  stt: z.coerce.number().min(1, 'STT phải lớn hơn 0').nullable().optional(),
  tenVietTat: z.string().nullable().optional(),
  tenTiengAnh: z.string().nullable().optional(),
  isVisible: z.boolean().nullable().optional(),
});

export type ChuyenNganh = z.infer<typeof ChuyenNganhSchema>;
export type ChuyenNganhDaoTao = ChuyenNganh & {
  nganhHoc: NganhHoc;
};

import { z } from 'zod';

export const namHocSchema = z
  .object({
    id: z.string().trim().optional().nullable(),
    namHocValue: z
      .string({ required_error: 'Năm học là bắt buộc' })
      .trim()
      .min(1, 'Năm học là bắt buộc')
      .max(10, 'Năm học không được quá 10 ký tự'),
    nienHoc: z
      .string({ required_error: 'Niên học là bắt buộc' })
      .trim()
      .min(1, 'Niên học là bắt buộc')
      .max(10, 'Niên học không được quá 20 ký tự'),
    isVisible: z.boolean().default(true),

    tuNgay: z.coerce.date().optional().nullable(),
    denNgay: z.coerce.date().optional().nullable(),

    tenTiengAnh: z.string().trim().optional().nullable(),
    soTuan: z.coerce.number().min(0, 'Số tuần phải lớn hơn 0').optional().nullable(),
    ghiChu: z.string().trim().optional().nullable(),
  })
  .refine(
    (data) => !data.tuNgay || !data.denNgay || new Date(data.denNgay) >= new Date(data.tuNgay),
    {
      message: 'Đến ngày không được nhỏ hơn Từ ngày',
      path: ['denNgay'],
    },
  );

export type NamHocSchema = z.input<typeof namHocSchema>;

export const defaultNamHoc: NamHocSchema = {
  id: null,
  namHocValue: '',
  nienHoc: '',
  isVisible: true,
  tuNgay: null,
  denNgay: null,
  tenTiengAnh: null,
  soTuan: null,
  ghiChu: null,
};

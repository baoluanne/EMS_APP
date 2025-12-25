import { z } from 'zod';

export const khoaHocSchema = z.object({
  id: z.string().optional(),
  tenKhoaHoc: z
    .string({ required_error: 'Tên khóa học là bắt buộc' })
    .trim()
    .min(1, 'Tên khóa học là bắt buộc'),
  nam: z.string({ required_error: 'Năm là bắt buộc' }).trim().min(1, 'Năm là bắt buộc'),
  cachViet: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
  isVisible: z.boolean().default(true),
});

export type KhoaHocSchema = z.input<typeof khoaHocSchema>;

export const defaultKhoaHoc: KhoaHocSchema = {
  tenKhoaHoc: '',
  nam: '',
  cachViet: undefined,
  ghiChu: undefined,
  id: undefined,
  isVisible: true,
};

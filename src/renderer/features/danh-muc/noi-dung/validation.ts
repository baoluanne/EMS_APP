import { z } from 'zod';

export const DanhMucNoiDungSchema = z.object({
  id: z.string().uuid().optional(),
  loaiNoiDung: z
    .string({ required_error: 'Loại nội dung là bắt buộc' })
    .trim()
    .min(1, 'Loại nội dung là bắt buộc'),
  noiDung: z
    .string({ required_error: 'Nội dung là bắt buộc' })
    .trim()
    .min(1, 'Nội dung là bắt buộc'),
  isVisible: z.boolean().optional(),
});

export type DanhMucNoiDung = z.infer<typeof DanhMucNoiDungSchema>;

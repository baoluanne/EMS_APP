import { z } from 'zod';

export const TraCuuLichHocLichThiSVFilterFormSchema = z.object({
  idDot: z.string({ required_error: 'Đợt là bắt buộc.' }).min(1, { message: 'Đợt là bắt buộc.' }),
  maSinhVien: z
    .string({ required_error: 'Mã sinh viên là bắt buộc.' })
    .trim()
    .min(1, { message: 'Mã sinh viên là bắt buộc.' }),
  hoDem: z.string().optional(),
  ten: z.string().optional(),
  loaiLich: z.string().optional(),
  trangThai: z.string().optional(),
});

export type TraCuuLichHocLichThiSVFilterForm = z.infer<
  typeof TraCuuLichHocLichThiSVFilterFormSchema
>;

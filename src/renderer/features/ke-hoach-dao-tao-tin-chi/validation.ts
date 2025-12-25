import { z } from 'zod';

export const KeHoachDaoTao_TinChiSchema = z.object({
  idHocKy: z.string({ required_error: 'Học kỳ là bắt buộc' }).uuid().min(1, 'Học kỳ là bắt buộc'),
  ghiChu: z.string().nullable().optional(),
});

export type KeHoachDaoTao_TinChi = z.infer<typeof KeHoachDaoTao_TinChiSchema>;

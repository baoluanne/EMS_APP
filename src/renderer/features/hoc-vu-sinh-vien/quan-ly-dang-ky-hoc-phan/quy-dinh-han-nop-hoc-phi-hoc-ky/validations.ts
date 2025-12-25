import { z } from 'zod';

export const QuyDinhHanNopHocPhiHocKySchema = z.object({
  idDot: z.string().optional(),
  idKhoaHoc: z.string().optional(),
  idBacDaoTao: z.string().optional(),
  idLoaiDaoTao: z.string().optional(),
});

export type QuyDinhHanNopHocPhiHocKySchema = z.input<typeof QuyDinhHanNopHocPhiHocKySchema>;


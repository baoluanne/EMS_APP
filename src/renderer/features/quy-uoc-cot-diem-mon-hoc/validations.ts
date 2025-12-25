import { z } from 'zod';
import { MonHocBacDaoTaoSchema } from '../mon-hoc-bac-dao-tao/validations';
import { TrangThaiXetQuyUocSchema } from '../trang-thai-xet-quy-uoc/validations';

export const QuyUocCotDiem_MonHocSchema = z.object({
  id: z.string().uuid().optional(),

  idQuyUocCotDiem_NC: z.string().uuid(),
  quyUocCotDiem_NC: z.any().optional(),

  idQuyUocCotDiem_TC: z.string().uuid(),
  quyUocCotDiem_TC: z.any().optional(),

  idMonHocBacDaoTao: z.string().uuid(),
  monHocBacDaoTao: MonHocBacDaoTaoSchema.optional(),

  idTrangThaiXetQuyUoc: z.string().uuid(),
  trangThaiXetQuyUoc: TrangThaiXetQuyUocSchema.optional(),
  ghiChu: z.string().nullable().optional(),
});
export type QuyUocCotDiem_MonHoc = z.infer<typeof QuyUocCotDiem_MonHocSchema>;
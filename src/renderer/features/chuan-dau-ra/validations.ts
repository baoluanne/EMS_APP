import { z } from 'zod';

export const ChuanDauRaSchema = z.object({
  id: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
  idCoSoDaoTao: z.string(),
  idKhoaHoc: z.string(),
  idBacDaoTao: z.string(),
  idLoaiDaoTao: z.string(),
  idLoaiChungChi: z.string(),
  idChungChi: z.string(),
});

export type ChuanDauRa = z.infer<typeof ChuanDauRaSchema> & {
  isChuanDauRaBoSung?: boolean;
};

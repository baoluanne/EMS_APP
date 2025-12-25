import { z } from 'zod';

export const ChuanDauRaBoSungSchema = z.object({
  id: z.string().optional(),
  ghiChu: z.string().nullable().optional(),
  idCoSoDaoTao: z.string(),
  idKhoaHoc: z.string(),
  idBacDaoTao: z.string(),
  idLoaiDaoTao: z.string(),
  idLoaiChungChi: z.string(),
  idChungChi: z.string(),
  idChuyenNganh: z.string(),
});

export type ChuanDauRaBoSung = z.infer<typeof ChuanDauRaBoSungSchema> & {
  isChuanDauRaBoSung?: boolean;
};

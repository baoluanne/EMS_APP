import { z } from 'zod';
import { MonHocSchema } from '../danh-sach-mon-hoc/validation';

export const MonHocBacDaoTaoSchema = z.object({
  id: z.string().optional(),

  dvhT_TC: z.coerce.number().min(0).optional(),
  dvhT_HP: z.coerce.number().min(0).optional(),
  dvhT_Le: z.coerce.number().min(0).optional(),
  soTinChi: z.coerce.number().min(0).optional(),
  soTietLyThuyet: z.coerce.number().min(0).optional(),
  soTietThucHanh: z.coerce.number().min(0).optional(),
  tuHoc: z.coerce.number().min(0).optional(),
  thucHanh: z.coerce.number().min(0).optional(),
  lyThuyet: z.coerce.number().min(0).optional(),
  moRong: z.coerce.number().min(0).optional(),
  soTietLTT: z.coerce.number().min(0).optional(),
  soTietTHBT: z.coerce.number().min(0).optional(),
  soTietTuHoc: z.coerce.number().min(0).optional(),
  soGioThucTap: z.coerce.number().min(0).optional(),
  soGioDoAnBTLon: z.coerce.number().min(0).optional(),
  soTietKT: z.coerce.number().min(0).optional(),

  ghiChu: z.string().nullable().optional(),
  isLyThuyet: z.boolean().optional().nullable(),
  isKhongTinhDiemTBC: z.boolean().optional().nullable(),

  idBacDaoTao: z.string().nullable().optional(),
  idMonHoc: z.string().nullable().optional(),
  monHoc: MonHocSchema.optional(),
  idHinhThucThi: z.string().nullable().optional(),
  idLoaiHinhGiangDay: z.string().nullable().optional(),
  idLoaiTiet: z.string().nullable().optional(),
  idQuyUocCotDiem_NC: z.string().nullable().optional(),
  idQuyUocCotDiem_TC: z.string().nullable().optional(),
});

export type MonHocBacDaoTaoForm = z.infer<typeof MonHocBacDaoTaoSchema>;

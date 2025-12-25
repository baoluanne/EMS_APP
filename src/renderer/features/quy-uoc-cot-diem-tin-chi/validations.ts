import { z } from 'zod';

export const QuyUocCotDiemTinChiSchema = z.object({
  id: z.string().uuid().optional(),
  tenQuyUoc: z
    .string({ required_error: 'Quy ước là bắt buộc.' })
    .trim()
    .min(1, 'Quy ước là bắt buộc.'),

  idQuyChe_TinChi: z
    .string({ required_error: 'Quy chế là bắt buộc.' })
    .min(1, 'Quy chế là bắt buộc.')
    .uuid(),

  idKieuMon: z
    .string({ required_error: 'Kiểu môn là bắt buộc.' })
    .min(1, 'Kiểu môn là bắt buộc.')
    .uuid(),
  tenKieuMonHoc: z.string().nullable().optional(),

  idKieuLamTron: z.string().uuid().optional(),
  tenKieuLamTron: z.string().nullable().optional(),

  isKhongTinhTBC: z.boolean().nullable().optional(),
  diemTBC: z.coerce.number().optional(),

  isChiDiemCuoiKy: z.boolean().nullable().optional(),
  isChiDanhGia: z.boolean().nullable().optional(),
  isXetDuThiGiuaKy: z.boolean().nullable().optional(),
  isSuDung: z.boolean().nullable().optional(),

  chuyenCan: z.coerce.number().nullable().optional(),
  thuongXuyen1: z.coerce.number().nullable().optional(),
  thuongXuyen2: z.coerce.number().nullable().optional(),
  thuongXuyen3: z.coerce.number().nullable().optional(),
  thuongXuyen4: z.coerce.number().nullable().optional(),
  thuongXuyen5: z.coerce.number().nullable().optional(),
  tieuLuan_BTL: z.coerce.number().nullable().optional(),
  cuoiKy: z.coerce.number().nullable().optional(),

  soCotDiemTH: z.coerce.number().int().nullable().optional(),
  isHSLTTH_TC: z.boolean().nullable().optional(),
  heSoTH: z.coerce.number().optional(),
  heSoLT: z.coerce.number().optional(),

  isDiemRangBuocCK: z.boolean().nullable().optional(),
  diemRangBuocCK: z.coerce.number().nullable().optional(),
  drB_CotDiemGK: z.coerce.number().nullable().optional(),
  drB_CotDiemCC: z.coerce.number().nullable().optional(),
  drB_DiemThuongKy: z.coerce.number().nullable().optional(),
  drB_DiemGiuaKy: z.coerce.number().nullable().optional(),

  drB_CongThucTinhDTB_TK: z.string().nullable().optional(),
  drB_GhiChu: z.string().nullable().optional(),
  drB_DiemChuyenCan: z.coerce.number().nullable().optional(),
  drB_DiemTieuLuan: z.coerce.number().nullable().optional(),
  drB_ThangDiemMax: z.coerce.number().nullable().optional(),
});

export type QuyUocCotDiemTinChi = z.infer<typeof QuyUocCotDiemTinChiSchema>;

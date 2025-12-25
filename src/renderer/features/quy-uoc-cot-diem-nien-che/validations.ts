import { z } from 'zod';

export const QuyUocCotDiem_NCSchema = z.object({
  id: z.string().uuid().optional(),
  tenQuyUoc: z
    .string({ required_error: 'Quy ước là bắt buộc.' })
    .trim()
    .min(1, 'Quy ước là bắt buộc.'),

  idQuyChe_NienChe: z
    .string({ required_error: 'Quy chế là bắt buộc.' })
    .min(1, 'Quy chế là bắt buộc.')
    .uuid(),

  idKieuMon: z
    .string({ required_error: 'Kiểu môn là bắt buộc.' })
    .min(1, 'Kiểu môn là bắt buộc.')
    .uuid(),

  idKieuLamTron: z.string().uuid().nullable().optional(),

  isKhongTinhTBC: z.boolean().nullable().optional(),
  diemTBC: z.coerce.number().nullable().optional(),
  isChiDiemCuoiKy: z.boolean().nullable().optional(),
  isChiDanhGia: z.boolean().nullable().optional(),
  isSuDung: z.boolean().nullable().optional(),
  chuyenCan: z.coerce.number().nullable().optional(),
  thuongXuyen1: z.coerce.number().nullable().optional(),
  thuongXuyen2: z.coerce.number().nullable().optional(),
  thuongXuyen3: z.coerce.number().nullable().optional(),
  thuongXuyen4: z.coerce.number().nullable().optional(),
  thuongXuyen5: z.coerce.number().nullable().optional(),
  soCotChuyenCan: z.coerce.number().int().nullable().optional(),
  soCotThucHanh: z.coerce.number().int().nullable().optional(),
  heSoTheoDVHT: z.boolean().nullable().optional(),
  soCotLTHS1: z.coerce.number().int().nullable().optional(),
  soCotLTHS2: z.coerce.number().int().nullable().optional(),
  soCotLTHS3: z.coerce.number().int().nullable().optional(),
  soCotTHHS1: z.coerce.number().int().nullable().optional(),
  soCotTHHS2: z.coerce.number().int().nullable().optional(),
  soCotTHHS3: z.coerce.number().int().nullable().optional(),
  heSoTBTK: z.coerce.number().nullable().optional(),
  heSoCK: z.coerce.number().nullable().optional(),
  heSoTheoLTTH_TC: z.boolean().nullable().optional(),
  heSoLT: z.coerce.number().nullable().optional(),
  heSoTH: z.coerce.number().nullable().optional(),
  isApDungQuyCheNghe: z.boolean().nullable().optional(),
  isApDungQuyCheMonVH: z.boolean().nullable().optional(),
  isRangBuocDCK: z.boolean().nullable().optional(),
  diemRangBuocCK: z.coerce.number().nullable().optional(),
  isXetDuThiGK: z.boolean().nullable().optional(),
  isKhongApDungHSCD: z.boolean().nullable().optional(),
  drB_CotDiemGK: z.coerce.number().nullable().optional(),
  drB_CotDiemCC: z.coerce.number().nullable().optional(),
  drB_DiemThuongKy: z.coerce.number().nullable().optional(),
  drB_DiemGiuaKy: z.coerce.number().nullable().optional(),
  drB_DiemChuyenCan: z.coerce.number().nullable().optional(),
  drB_DiemTieuLuan: z.coerce.number().nullable().optional(),
  soCotDiemGK: z.coerce.number().int().nullable().optional(),
  soCotDiemCC: z.coerce.number().int().nullable().optional(),
  drB_CongThucTinhDTB_TK: z.string().nullable().optional(),
  drB_GhiChu: z.string().nullable().optional(),
  drB_ThangDiemMax: z.coerce.number().nullable().optional(),
});

export type QuyUocCotDiem_NC = z.infer<typeof QuyUocCotDiem_NCSchema>;

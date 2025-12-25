import { z } from 'zod';

export const QuyCheHocVuSchema = z.object({
  id: z.string().optional(),
  maQuyChe: z
    .string({ required_error: 'Mã quy chế là bắt buộc.' })
    .trim()
    .min(1, 'Mã quy chế là bắt buộc.'),
  tenQuyChe: z
    .string({ required_error: 'Tên quy chế là bắt buộc.' })
    .trim()
    .min(1, 'Tên quy chế là bắt buộc.'),
  bieuThuc: z.string().nullable().optional(),
  isNienChe: z.boolean(),
  ghiChu: z.string().nullable().optional(),
  dkdT_IsDongHocPhi: z.boolean(),
  dkdT_IsDiemTBTK: z.boolean(),
  dkdT_DiemTBTK: z.coerce.number().optional(),
  dkdT_IsDiemTBTH: z.boolean(),
  dkdT_DiemTBTH: z.coerce.number().optional(),
  dkdT_IsKhongVangQua: z.boolean(),
  dkdT_TongTietVang: z.coerce.number().optional(),
  dkdT_LyThuyet: z.coerce.number().optional(),
  dkdT_ThucHanh: z.coerce.number().optional(),
  dkdT_DuocThiLai: z.coerce.number().optional(),
  dddS_DiemThanhPhan: z.coerce.number().optional(),
  dddS_DiemCuoiKy: z.coerce.number().optional(),
  dddS_DiemTBThuongKy: z.coerce.number().optional(),
  dddS_DiemTBTH: z.coerce.number().optional(),
  dddS_DiemTB: z.coerce.number().optional(),
  dddS_DiemTBHK: z.coerce.number().optional(),
  dddS_DiemTN: z.coerce.number().optional(),
  dddS_DiemTK: z.coerce.number().optional(),
  dddS_KieuLamTron: z.string().nullable().optional(),
});

export type QuyCheHocVu = z.infer<typeof QuyCheHocVuSchema>;

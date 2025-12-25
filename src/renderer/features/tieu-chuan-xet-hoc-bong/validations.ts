import { z } from 'zod';

export const TieuChuanXetHocBongSchema = z.object({
  id: z.string().optional(),
  stt: z.coerce.number({
    required_error: 'STT là bắt buộc',
    invalid_type_error: 'STT là bắt buộc',
  }),
  nhom: z
    .string({ required_error: 'Nhóm là bắt buộc' })
    .trim()
    .min(1, { message: 'Nhóm là bắt buộc' }),
  hocBong: z
    .string({ required_error: 'Học bổng là bắt buộc' })
    .trim()
    .min(1, { message: 'Học bổng là bắt buộc' }),
  hocLucDiem10Tu: z.coerce.number({
    required_error: 'Học lực điểm 10 từ là bắt buộc',
    invalid_type_error: 'Học lực điểm 10 từ là bắt buộc',
  }),
  hocLucDiem10Den: z.coerce.number({
    required_error: 'Học lực điểm 10 đến là bắt buộc',
    invalid_type_error: 'Học lực điểm 10 đến là bắt buộc',
  }),
  hocLucDiem4Tu: z.coerce.number().optional(),
  hocLucDiem4Den: z.coerce.number().optional(),
  hanhKiemTu: z.coerce.number({
    required_error: 'Hạnh kiểm từ là bắt buộc',
    invalid_type_error: 'Hạnh kiểm từ là bắt buộc',
  }),
  hanhKiemDen: z.coerce.number({
    required_error: 'Hạnh kiểm đến là bắt buộc',
    invalid_type_error: 'Hạnh kiểm đến là bắt buộc',
  }),
  soTien: z.coerce.number().optional(),
  phanTramSoTien: z.coerce.number().optional(),
  ghiChu: z.string().nullable().optional(),
});

export type TieuChuanXetHocBong = z.infer<typeof TieuChuanXetHocBongSchema>;

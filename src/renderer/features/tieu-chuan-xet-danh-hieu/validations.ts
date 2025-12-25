import { z } from 'zod';

export const TieuChuanXetDanhHieuSchema = z.object({
  id: z.string().optional(),
  stt: z.coerce
    .number({
      invalid_type_error: 'STT phải là số.',
    })
    .optional(),
  nhomDanhHieu: z.string().nullable().optional(),
  hocLuc10Tu: z.coerce.number({
    required_error: 'Học lực 10 từ là bắt buộc.',
    invalid_type_error: 'Học lực 10 từ phải là số.',
  }),
  hocLuc10Den: z.coerce.number({
    required_error: 'Học lực 10 đến là bắt buộc.',
    invalid_type_error: 'Học lực 10 đến phải là số.',
  }),
  hocLuc4Tu: z.coerce
    .number({
      invalid_type_error: 'Học lực 4 từ phải là số.',
    })
    .optional(),
  hocLuc4Den: z.coerce
    .number({
      invalid_type_error: 'Học lực 4 đến phải là số.',
    })
    .optional(),
  hanhKiemTu: z.coerce.number({
    required_error: 'Hạnh kiểm từ là bắt buộc.',
    invalid_type_error: 'Hạnh kiểm từ phải là số.',
  }),
  hanhKiemDen: z.coerce.number({
    required_error: 'Hạnh kiểm đến là bắt buộc.',
    invalid_type_error: 'Hạnh kiểm đến phải là số.',
  }),
  ghiChu: z.string().nullable().optional(),
});

export type TieuChuanXetDanhHieu = z.infer<typeof TieuChuanXetDanhHieuSchema>;
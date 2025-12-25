// src/renderer/src/features/ktx-management/chi-so-dien-nuoc/validation.ts
import { z } from 'zod';
import dayjs from 'dayjs';

export const chiSoDienNuocSchema = z.object({
  id: z.string().optional().nullable(),
  toaNhaId: z.string().optional(),
  phongKtxId: z.string().min(1, 'Vui lòng chọn phòng'),
  thangNam: z.any().refine((val) => dayjs.isDayjs(val) && val.isValid(), {
    message: 'Vui lòng chọn tháng năm hợp lệ',
  }),
  dienCu: z.number().min(0),
  dienMoi: z.number().min(0),
  nuocCu: z.number().min(0),
  nuocMoi: z.number().min(0),
  daChot: z.boolean(),
});

export type ChiSoDienNuocKtx = z.infer<typeof chiSoDienNuocSchema>;

export const defaultValues: Partial<ChiSoDienNuocKtx> = {
  id: null,
  toaNhaId: '',
  phongKtxId: '',
  thangNam: dayjs(),
  dienCu: 0,
  dienMoi: 0,
  nuocCu: 0,
  nuocMoi: 0,
  daChot: false,
};

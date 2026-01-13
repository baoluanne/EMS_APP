import { z } from 'zod';

export const chiSoDienNuocSchema = z.object({
  id: z.string().optional(),
  toaNhaId: z.string().optional(),
  phongKtxId: z.string().min(1, 'Vui lòng chọn phòng'),
  thangNam: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: 'Vui lòng chọn tháng năm hợp lệ',
  }),
  dienCu: z.coerce.number().min(0, 'Chỉ số cũ không được âm'),
  dienMoi: z.coerce.number().min(0, 'Chỉ số mới không được âm'),
  nuocCu: z.coerce.number().min(0, 'Chỉ số cũ không được âm'),
  nuocMoi: z.coerce.number().min(0, 'Chỉ số mới không được âm'),
  daChot: z.boolean(),
});

export type ChiSoDienNuocFormData = z.infer<typeof chiSoDienNuocSchema>;

export const defaultValues: ChiSoDienNuocFormData = {
  id: undefined,
  toaNhaId: '',
  phongKtxId: '',
  thangNam: new Date(),
  dienCu: 0,
  dienMoi: 0,
  nuocCu: 0,
  nuocMoi: 0,
  daChot: false,
};

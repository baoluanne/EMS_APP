import { z } from 'zod';
import dayjs from 'dayjs';

export const chiSoDienNuocSchema = z.object({
  id: z.string().optional(),
  toaNhaId: z.string().optional(),
  phongKtxId: z.string().min(1, 'Vui lòng chọn phòng'),
  thangNam: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: 'Vui lòng chọn tháng năm hợp lệ',
  }),
  dienCu: z.number().min(0),
  dienMoi: z.number().min(0),
  nuocCu: z.number().min(0),
  nuocMoi: z.number().min(0),
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

// Transform function để gửi lên backend
export const transformChiSoDienNuoc = (formData: ChiSoDienNuocFormData): Record<string, any> => {
  const dayjsDate = dayjs(formData.thangNam);

  return {
    id: formData.id,
    phongKtxId: formData.phongKtxId,
    thang: dayjsDate.month() + 1, // month() trả về 0-11, cần +1
    nam: dayjsDate.year(),
    dienCu: formData.dienCu,
    dienMoi: formData.dienMoi,
    nuocCu: formData.nuocCu,
    nuocMoi: formData.nuocMoi,
    daChot: formData.daChot,
  };
};

import { z } from 'zod';

export const taiSanKtxSchema = z.object({
  id: z.string().nullable().optional(),
  maTaiSan: z.string().min(1, 'Mã tài sản là bắt buộc'),
  tenTaiSan: z.string().min(1, 'Tên tài sản là bắt buộc'),
  tinhTrang: z.string().min(1, 'Vui lòng chọn tình trạng'),

  giaTri: z.coerce.number().min(0, 'Giá trị không được âm'),

  ghiChu: z.string(),

  phongKtxId: z.string().min(1, 'Vui lòng chọn phòng KTX'),
  maPhong: z.string().optional(),
  tenToaNha: z.string().optional(),
});

export type TaiSanKtxSchema = z.infer<typeof taiSanKtxSchema>;

import { z } from 'zod';

export const taiSanKtxSchema = z.object({
  id: z.string().nullable().optional(),
  maTaiSan: z.string().min(1, 'Mã tài sản không được để trống'),
  tenTaiSan: z.string().min(1, 'Tên tài sản không được để trống'),
  tinhTrang: z
    .enum(['Tot', 'BinhThuong', 'CanSuaChua', 'Hong'], {
      errorMap: () => ({ message: 'Vui lòng chọn tình trạng' }),
    })
    .optional()
    .nullable(),
  giaTri: z.number().min(0, 'Giá trị phải lớn hơn hoặc bằng 0').optional().nullable(),
  ghiChu: z.string().nullable().optional(),
  phongKtxId: z.string().min(1, 'Vui lòng chọn phòng KTX'),
  maPhong: z.string().optional(),
  tenToaNha: z.string().optional(),
});

export type TaiSanKtx = z.infer<typeof taiSanKtxSchema>;

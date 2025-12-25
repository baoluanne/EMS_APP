import { z } from 'zod';

export const phieuThuSchema = z.object({
  sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),
  congNoId: z.string().optional(),
  soTien: z.coerce.number().min(1000, 'Số tiền tối thiểu 1.000đ'),
  hinhThucThanhToan: z.string().min(1, 'Vui lòng chọn hình thức'),
  ghiChu: z.string().optional(),
  xuatHoaDon: z.boolean().optional(),

  chiTiets: z
    .array(
      z.object({
        idCongNoChiTiet: z.string().optional(),
        loaiKhoanThuId: z.string(),
        soTien: z.number(),
        ghiChu: z.string().optional(),
      }),
    )
    .optional(),
});

export type PhieuThuSchema = z.infer<typeof phieuThuSchema>;

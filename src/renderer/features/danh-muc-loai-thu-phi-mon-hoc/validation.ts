import { z } from 'zod';

export const DanhMucLoaiThuPhiMonHocSchema = z.object({
  id: z.string().uuid().optional(),
  maLoaiThuPhi: z
    .string({ required_error: 'Mã loại thu phí là bắt buộc' })
    .trim()
    .min(1, 'Mã loại thu phí là bắt buộc'),
  tenLoaiThuPhi: z
    .string({ required_error: 'Tên loại thu phí là bắt buộc' })
    .trim()
    .min(1, 'Tên loại thu phí là bắt buộc'),
  stt: z.coerce.number().min(0).optional(),
  capSoHoaDonDienTu: z.boolean().optional().nullable(),
  congThucQuyDoi: z.string().nullable().optional(),
  maTKNganHang: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
});

export type DanhMucLoaiThuPhiMonHoc = z.infer<typeof DanhMucLoaiThuPhiMonHocSchema>;

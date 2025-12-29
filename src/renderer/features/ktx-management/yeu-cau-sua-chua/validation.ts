import { z } from 'zod';

export const yeuCauSuaChuaSchema = z
  .object({
    id: z.string().nullable().optional(),
    tieuDe: z.string().min(1, 'Tiêu đề không được để trống'),

    noiDung: z.string().min(1, 'Nội dung không được để trống'),

    sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),

    phongKtxId: z.string().optional(),

    taiSanKtxId: z.string().nullable().optional(),

    trangThai: z.enum(['MoiGui', 'DangXuLy', 'DaXong', 'Huy']).optional(),

    ghiChuXuLy: z.string().nullable().optional(),

    ngayGui: z.string().optional(),

    ngayXuLy: z.string().nullable().optional(),

    ngayHoanThanh: z.string().nullable().optional(),

    chiPhiPhatSinh: z.number().min(0).default(0).optional(),

    maTaiSan: z.string().optional(),
    tenTaiSan: z.string().optional(),
    tinhTrangTaiSan: z.string().optional(),
    maPhong: z.string().optional(),
    tenToaNha: z.string().optional(),
    hoTenSinhVien: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.trangThai &&
        data.trangThai !== 'MoiGui' &&
        data.trangThai !== 'DangXuLy' &&
        !data.ghiChuXuLy?.trim()
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Ghi chú xử lý không được để trống',
      path: ['ghiChuXuLy'],
    },
  );

export type YeuCauSuaChua = z.infer<typeof yeuCauSuaChuaSchema>;
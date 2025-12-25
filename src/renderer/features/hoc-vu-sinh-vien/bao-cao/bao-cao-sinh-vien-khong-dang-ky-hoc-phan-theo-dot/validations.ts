import { z } from 'zod';

export const BaoCaoSinhVienKhongDangKyHocPhanTheoDotSchema = z.object({
  idDot: z.string().optional(),
  idCoSo: z.string().optional(),
  idKhoaHoc: z.string().optional(),
  idBacDaoTao: z.string().optional(),
  idLoaiDaoTao: z.string().optional(),
  idKhoa: z.string().optional(),
  idNganh: z.string().optional(),
  idChuyenNganh: z.string().optional(),
  idLopHoc: z.string().optional(),
  idTrangThaiSV: z.string().optional(),
  maSinhVien: z.string().optional(),
});

export type BaoCaoSinhVienKhongDangKyHocPhanTheoDotSchema = z.input<
  typeof BaoCaoSinhVienKhongDangKyHocPhanTheoDotSchema
>;


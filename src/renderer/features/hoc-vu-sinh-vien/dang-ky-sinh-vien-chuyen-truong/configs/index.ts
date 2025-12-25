import { z } from 'zod';

export const DangKySinhVienChuyenTruongSchema = z.object({
  id: z.string().optional(),

  maHoSo: z.string({ required_error: 'Mã hồ sơ là bắt buộc.' }).min(1, 'Mã hồ sơ là bắt buộc.'),

  hoTen: z.string().nullable().optional(),
  ngaySinh: z.string().nullable().optional(),

  gioiTinh: z.enum(['Nam', 'Nữ']),

  idCoSo: z.string().nullable().optional(),
  idKhoaHoc: z.string().nullable().optional(),
  idBacDaoTao: z.string().nullable().optional(),
  idLoaiDaoTao: z.string().nullable().optional(),
  idNganh: z.string().nullable().optional(),

  tuTaoMaSinhVien: z.boolean().default(true),
  maSinhVien: z.string().nullable().optional(),

  idChuyenNganh: z
    .string({ required_error: 'Chuyên ngành là bắt buộc.' })
    .min(1, 'Chuyên ngành là bắt buộc.'),

  idLopHoc: z.string({ required_error: 'Lớp học là bắt buộc.' }).min(1, 'Lớp học là bắt buộc.'),
});

export type DangKySinhVienChuyenTruong = z.infer<typeof DangKySinhVienChuyenTruongSchema>;

export const defaultDangKySinhVienChuyenTruongValues: DangKySinhVienChuyenTruong = {
  maHoSo: '',
  hoTen: '',
  ngaySinh: '',
  gioiTinh: 'Nam',
  idCoSo: '',
  idKhoaHoc: '',
  idBacDaoTao: '',
  idLoaiDaoTao: '',
  idNganh: '',
  tuTaoMaSinhVien: true,
  maSinhVien: '',
  idChuyenNganh: '',
  idLopHoc: '',
};

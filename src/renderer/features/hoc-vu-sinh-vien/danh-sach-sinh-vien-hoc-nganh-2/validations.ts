import { z } from 'zod';

export const dangKyNganh2ValidationSchema = z.object({
  id: z.string().nullable().optional(),
  // ---- Thông tin sinh viên ----
  idSinhVien: z.string().nullable().optional(),
  maSinhVien: z
    .string({ required_error: 'Vui lòng nhập mã sinh viên để tìm kiếm.' })
    .min(1, 'Mã sinh viên là bắt buộc'),
  hoTen: z.string().optional(),
  ngaySinh: z.string().nullable().optional(),
  gioiTinh: z.coerce.number().min(0).optional(),
  tenLop1: z.string().nullable().optional(),
  idLopHoc1: z.string().nullable().optional(),
  idBacDaoTao: z.string().nullable().optional(),
  idLoaiDaoTao: z.string().nullable().optional(),
  idKhoaHoc: z.string().nullable().optional(),
  idNganh: z.string().nullable().optional(),
  // ---- Thông tin ngành học 2 ----
  idCoSo: z
    .string({ required_error: 'Cơ sở là bắt buộc' })
    .uuid('Cơ sở là bắt buộc')
    .min(1, 'Cơ sở là bắt buộc'),
  idKhoaHoc2: z
    .string({ required_error: 'Vui lòng chọn khóa học cho ngành 2.' })
    .uuid('Khóa học là bắt buộc')
    .min(1, 'Khóa học là bắt buộc'),
  idNganh2: z
    .string({ required_error: 'Vui lòng chọn ngành học cho ngành 2.' })
    .uuid('Ngành học là bắt buộc')
    .min(1, 'Ngành học là bắt buộc'),
  idLopHoc2: z
    .string({ required_error: 'Vui lòng chọn lớp học cho ngành 2.' })
    .uuid('Lớp học là bắt buộc')
    .min(1, 'Lớp học là bắt buộc'),
  ghiChu: z.string().nullable().optional(),
  soQuyetDinh: z.string().nullable().optional(),
  ngayQuyetDinh: z.any().nullable().optional(),
  nguoiKy: z.string().nullable().optional(),
});

export type DangKyNganh2FormData = z.input<typeof dangKyNganh2ValidationSchema>;

// ----- Sinh viên học ngành 2 Filter
export const sinhVienHocNganh2FilterSchema = z.object({
  idCoSo: z.string().nullable().optional(),
  idKhoaHoc: z.string().nullable().optional(),
  idBacDaoTao: z.string().nullable().optional(),
  idLoaiDaoTao: z.string().nullable().optional(),
  idNganh: z.string().nullable().optional(),
  idChuyenNganh: z.string().nullable().optional(),
  idLopHoc: z.string().nullable().optional(),
  maSinhVien: z.string().nullable().optional(),
  hoDem: z.string().nullable().optional(),
  tenSV: z.string().nullable().optional(),
  trangThai: z.string().nullable().optional(),
});

export type SinhVienHocNganh2Filter = z.input<typeof sinhVienHocNganh2FilterSchema>;

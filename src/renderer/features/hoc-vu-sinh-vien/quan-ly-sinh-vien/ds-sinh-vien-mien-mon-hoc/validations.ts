import { z } from 'zod';

export const sinhVienMienMonHocFilterSchema = z.object({
  id: z.string().uuid(),
  idQuyetDinh: z.string().nullable().optional(),
  idCoSo: z.string().nullable().optional(),
  idKhoaHoc: z.string().nullable().optional(),
  idBacDaoTao: z.string().nullable().optional(),
  idLoaiDaoTao: z.string().nullable().optional(),
  idNganh: z.string().nullable().optional(),
  idChuyenNganh: z.string().nullable().optional(),
  idLopHoc: z.string().nullable().optional(),
  idSinhVien: z.string().nullable().optional(),
  maSinhVien: z.string().nullable().optional(),
  hoDem: z.string().nullable().optional(),
  ten: z.string().nullable().optional(),
  trangThai: z.string().nullable().optional(),
  startNgayTao: z.string().nullable().optional(),
  endNgayTao: z.string().nullable().optional(),
  idMonHocBacDaoTao: z.string().nullable().optional(),
});

export type SinhVienMienMonHocFilter = z.infer<typeof sinhVienMienMonHocFilterSchema>;

export const quyetDinhValidationSchema = z.object({
  id: z.string().uuid().optional(),
  soQuyetDinh: z
    .string({ required_error: 'Số quyết định không được để trống.' })
    .min(1, 'Số quyết định không được để trống.'),

  tenQuyetDinh: z
    .string({ required_error: 'Tên quyết định không được để trống.' })
    .min(1, 'Tên quyết định không được để trống.'),
  ngayRaQuyetDinh: z.any().optional().nullable(),
  nguoiRaQD: z.string().optional().nullable(),
  ngayKyQuyetDinh: z.any().optional().nullable(),
  nguoiKyQD: z.string().optional().nullable(),
  idLoaiQuyetDinh: z.string().uuid('Loại quyết định không hợp lệ.').optional().nullable(),
  noiDung: z.string().optional().nullable(),
});

export type QuyetDinhFormDataType = z.infer<typeof quyetDinhValidationSchema>;

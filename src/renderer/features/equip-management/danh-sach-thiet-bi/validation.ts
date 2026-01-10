import { z } from 'zod';

export const danhSachThietBiSchema = z.object({
  id: z.string().optional(),
  maThietBi: z.string().min(1, 'Mã thiết bị không được để trống'),
  tenThietBi: z.string().min(1, 'Tên thiết bị không được để trống'),
  loaiThietBiId: z.string().min(1, 'Loại thiết bị không được để trống'),
  nhaCungCapId: z.string().min(1, 'Nhà cung cấp không được để trống'),
  model: z.string().optional().nullable(),
  serialNumber: z.string().optional().nullable(),
  thongSoKyThuat: z.string().optional().nullable(),
  namSanXuat: z.number().optional().nullable(),
  ngayMua: z.string().optional().nullable(),
  ngayHetHanBaoHanh: z.string().optional().nullable(),
  nguyenGia: z.number().min(0, 'Nguyên giá phải lớn hơn hoặc bằng 0').optional().nullable(),
  giaTriKhauHao: z
    .number()
    .min(0, 'Giá trị khấu hao phải lớn hơn hoặc bằng 0')
    .optional()
    .nullable(),
  trangThai: z.number().optional().nullable(),
  ghiChu: z.string().optional().nullable(),
  hinhAnh: z.string().optional().nullable(),
  hinhAnhUrl: z.string().optional().nullable(),
  phongHocId: z.string().optional().nullable(),
});

export type DanhSachThietBi = z.infer<typeof danhSachThietBiSchema>;

export const nhapHangLoatSchema = z.object({
  id: z.string().optional().nullable(),
  soLuong: z.number().min(1, 'Số lượng phải lớn hơn 0'),
  tenThietBi: z.string().min(1, 'Tên thiết bị không được để trống'),
  loaiThietBiId: z.string().min(1, 'Loại thiết bị không được để trống'),
  nhaCungCapId: z.string().min(1, 'Nhà cung cấp không được để trống'),
  model: z.string().optional().nullable(),
  thongSoKyThuat: z.string().optional().nullable(),
  nguyenGia: z.number().min(0, 'Nguyên giá phải lớn hơn hoặc bằng 0').optional().nullable(),
  prefixMaThietBi: z.string().optional().nullable(),
  namSanXuat: z.string().optional().nullable(),
  ngayMua: z.string().optional().nullable(),
  ngayHetHanBaoHanh: z.string().optional().nullable(),
  ghiChu: z.string().optional().nullable(),
  trangThai: z.number().optional().nullable(),
});

export type NhapHangLoat = z.infer<typeof nhapHangLoatSchema>;

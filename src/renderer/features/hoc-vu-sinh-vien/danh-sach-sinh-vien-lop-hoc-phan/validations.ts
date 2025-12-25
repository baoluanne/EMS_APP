import { z } from 'zod';

// Helpers
const trimStr = z.string({ message: 'Đây là trường bắt buộc' }).trim();

// --- Main schema ---
export const DanhSachSinhVienLopHocPhanSchema = z.object({
  id: z.string().nullable().optional(),
  stt: z.string().nullable().optional(),
  maSinhVien: trimStr.min(1, 'Mã sinh viên là bắt buộc'),
  hoDem: trimStr.min(1, 'Họ đệm là bắt buộc'),
  ten: trimStr.min(1, 'Tên là bắt buộc'),
  gioiTinh: z.coerce.number({ message: 'Giới tính là bắt buộc' }),
  ngaySinh: z.date({ message: 'Ngày sinh là bắt buộc' }),
  soDienThoai: trimStr.min(1, 'Điện thoại là bắt buộc'),
  noiSinh: z.string({ message: 'Nơi sinh là bắt buộc' }),
  email: z.string({ message: 'Email là bắt buộc' }).email({ message: 'Email là bắt buộc' }),
  nhom: z.string({ message: 'Nhóm là bắt buộc' }).email({ message: 'Nhóm là bắt buộc' }),
  trangThaiSinhVien: z
    .string({ message: 'Trạng thái sinh viên là bắt buộc' })
    .email({ message: 'Trạng thái sinh viên là bắt buộc' }),
  trangThaiDangKyLopHocPhan: z
    .string({ message: 'Trạng thái đăng ký lớp học phần là bắt buộc' })
    .email({ message: 'Trạng thái đăng ký lớp học phần là bắt buộc' }),
  hocPhi: z.coerce.number({ message: 'Học phí là bắt buộc' }),
  maLopChu: z
    .string({ message: 'Mã lớp chữ là bắt buộc' })
    .email({ message: 'Mã lớp chữ là bắt buộc' }),
  ngayDangKy: z.string({ message: 'Ngày đăng ký là bắt buộc' }),
  nguonDangKy: z
    .string({ message: 'Nguồn đăng ký là bắt buộc' })
    .email({ message: 'Nguồn đăng ký là bắt buộc' }),
  hoTenNguoiDangKy: z
    .string({ message: 'Họ tên người đăng ký là bắt buộc' })
    .email({ message: 'Họ tên người đăng ký là bắt buộc' }),
});

export type DanhSachSinhVienLopHocPhanType = z.input<typeof DanhSachSinhVienLopHocPhanSchema>;

export const SinhVienLopHocPhanFilterSchema = z.object({
  id: z.string().optional(),
  idHocKy: trimStr.min(1, 'Đợt là bắt buộc'),
  maLHP: trimStr.min(1, 'Mã lớp học phần là bắt buộc'),
  tenLHP: z.string().nullable().optional(),
  nhom: z.coerce.number().nullable().optional(),
  trangThaiSinhVien: z.string().nullable().optional(),
  trangThaiDangKyLHP: z.array(z.string()).nullable().optional(),
  hocPhiFilter: z.string().nullable().optional(),
  hocPhi: z.boolean().nullable().optional(),
});

export type SinhVienLopHocPhanFilterType = z.input<typeof SinhVienLopHocPhanFilterSchema>;

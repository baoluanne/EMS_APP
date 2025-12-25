import { z } from 'zod';
import type { RegistrationType, CourseFilter, ModernCourseFilter } from './types';

export const studentLookupSchema = z.object({
  maSinhVien: z.string().min(1, 'Mã sinh viên là bắt buộc'),
  loaiDangKy: z.enum(['dang-ky-moi', 'hoc-lai', 'hoc-cai-thien'] as const, {
    required_error: 'Loại đăng ký là bắt buộc',
    invalid_type_error: 'Loại đăng ký không hợp lệ',
  }),
  gioiTinh: z.enum(['nam', 'nu'] as const).optional(),
});

export type StudentLookupFormData = z.infer<typeof studentLookupSchema>;

// Registration type labels for display
export const registrationTypeLabels: Record<RegistrationType, string> = {
  'dang-ky-moi': 'Đăng ký mới',
  'hoc-lai': 'Học lại',
  'hoc-cai-thien': 'Học cải thiện',
};

// Gender labels for display
export const genderLabels: Record<'nam' | 'nu', string> = {
  'nam': 'Nam',
  'nu': 'Nữ',
};

// Course filter validation schema
export const courseFilterSchema = z.object({
  dot: z.string().optional(),
  khoaHoc: z.string().optional(),
  coSo: z.string().optional(),
  bacDaoTao: z.string().optional(),
  loaiDaoTao: z.string().optional(),
  nganh: z.string().optional(),
  hocPhanHoc: z.string().optional(),
  lopHocPhan: z.string().optional(),
  chiMonCTK: z.boolean(),
});

export type CourseFilterFormData = z.infer<typeof courseFilterSchema>;

// Modern Course Filter validation schema
export const modernCourseFilterSchema = z.object({
  dot: z.string().optional(),
  khoaHoc: z.string().optional(),
  coSo: z.string().optional(),
  bacDaoTao: z.string().optional(),
  loaiDaoTao: z.string().optional(),
  nganh: z.string().optional(),
  hocPhanHoc: z.string().optional(),
  lopHocPhan: z.string().optional(),
  chiMonCTK: z.boolean(),
});

export type ModernCourseFilterFormData = z.infer<typeof modernCourseFilterSchema>;

// Default modern filter values
export const defaultModernCourseFilter: ModernCourseFilter = {
  dot: undefined,
  khoaHoc: undefined,
  coSo: undefined,
  bacDaoTao: undefined,
  loaiDaoTao: undefined,
  nganh: undefined,
  hocPhanHoc: undefined,
  lopHocPhan: undefined,
  chiMonCTK: false,
};

// Default filter values
export const defaultCourseFilter: CourseFilter = {
  dot: undefined,
  khoaHoc: undefined,
  coSo: undefined,
  bacDaoTao: undefined,
  loaiDaoTao: undefined,
  nganh: undefined,
  hocPhanHoc: undefined,
  lopHocPhan: undefined,
  chiMonCTK: false,
};
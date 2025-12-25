// Student lookup types
export interface Student {
  id: string;
  maSinhVien: string;        // Student ID
  hoTen: string;             // Full name
  ngaySinh: string;          // Date of birth (ISO format)
  lopHoc: string;            // Class
  khoaHoc?: string;          // Cohort
  nganh?: string;            // Major
  gioiTinh?: 'nam' | 'nu';   // Gender
}

// Registration types
export type RegistrationType = 'dang-ky-moi' | 'hoc-lai' | 'hoc-cai-thien';

export interface StudentLookup {
  maSinhVien: string;
  loaiDangKy: RegistrationType;
  gioiTinh?: 'nam' | 'nu';
}


// Form display state
export interface StudentLookupFormState {
  isSearching: boolean;
  student: Student | null;
  error: string | null;
}

// Course filter types
export interface CourseFilter {
  dot?: string | undefined;  // Batch/Period
  khoaHoc?: string | undefined; // Cohort
  coSo?: string | undefined; // Campus
  bacDaoTao?: string | undefined; // Training level
  loaiDaoTao?: string | undefined; // Training type
  nganh?: string | undefined; // Major
  hocPhanHoc?: string | undefined; // Study plan
  lopHocPhan?: string | undefined; // Class group
  chiMonCTK: boolean;        // CTK courses only
}

// Filter option type
export interface FilterOption {
  id: string;
  name: string;
}

// Modern Course Filter interface for new drawer-based design
export interface ModernCourseFilter {
  dot?: string;              // Batch/Period
  khoaHoc?: string;          // Cohort
  coSo?: string;             // Campus
  bacDaoTao?: string;        // Training level
  loaiDaoTao?: string;       // Training type
  nganh?: string;            // Major
  hocPhanHoc?: string;       // Study plan
  lopHocPhan?: string;       // Class group
  chiMonCTK: boolean;        // CTK courses only
}

// Filter form state
export interface CourseFilterFormState {
  isApplying: boolean;
  error: string | null;
}

// Course types
export interface Course {
  id: string;                     // Unique identifier
  maHP: string;                   // Course code
  tenHP: string;                  // Course name
  soTinChi: number;               // Number of credits
  loaiHP: string;                 // Course type
  kiHoc: string;                  // Academic term
  giaoVien: string;               // Instructor
  lopHocPhan: string;             // Class group
  thoiKhoaBieu: string;           // Schedule
  soSVToiDa: number;              // Maximum students
  soSVHienTai: number;            // Current enrolled students
  trangThai: 'mo' | 'dong' | 'huy'; // Status: open, closed, cancelled
  khoa?: string;                  // Faculty/Department
  nganh?: string;                 // Major
  hocPhanHoc?: string;            // Study plan
  chiMonCTK?: boolean;            // Is CTK course
}
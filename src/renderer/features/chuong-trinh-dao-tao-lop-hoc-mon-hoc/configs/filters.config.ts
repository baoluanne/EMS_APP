import { Filter } from '@renderer/components/toolbars';

export const chuongTrinhDaoTaoLopHocMonHocFilters: Filter[] = [
  {
    key: 'coSo',
    label: 'Cơ Sở',
    options: ['K.KTXD - Khoa Kiến trúc', 'K.KTXD - Khoa Xây dựng'],
  },
  {
    key: 'khoaHoc',
    label: 'Khóa học',
    options: ['Âm học kiến trúc', 'Thiết kế nội thất', 'Cấu trúc nhà ở'],
  },
  {
    key: 'bacDaoTao',
    label: 'Bậc đào tạo',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'khoa',
    label: 'Khoa',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'nganh',
    label: 'Ngành',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'chuyenNganh',
    label: 'Chuyên ngành',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'lopHoc',
    label: 'Lớp học',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
];

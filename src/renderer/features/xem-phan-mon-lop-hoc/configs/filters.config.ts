import { Filter } from '@renderer/components/toolbars';

export const xemPhanMonLopHocFilters: Filter[] = [
  {
    key: 'khoaHoc',
    label: 'Khóa học',
    options: ['Âm học kiến trúc', 'Thiết kế nội thất', 'Cấu trúc nhà ở'],
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

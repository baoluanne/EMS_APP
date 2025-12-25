import { Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { Title } from '@renderer/components/Title';
import { Filter, FiltersToolbar, ToolbarActions } from '@renderer/components/toolbars';
import {
  mockData,
  quyUocCotDiemLopHocPhanTableColumns,
} from '@renderer/features/quan-ly-quy-uoc-cot-diem-lop-hoc-phan';
import { useDisclosure } from '@renderer/shared/hooks';
import { useState } from 'react';

const allFilters: Filter[] = [
  {
    key: 'dot',
    label: 'Đợt',
    options: ['K.KTXD - Khoa Kiến trúc', 'K.KTXD - Khoa Xây dựng'],
  },
  {
    key: 'coSo',
    label: 'Cơ sở',
    options: ['Âm học kiến trúc', 'Thiết kế nội thất', 'Cấu trúc nhà ở'],
  },
  {
    key: 'khoaChuQuan',
    label: 'Khoa chủ quản',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'batDaoTao',
    label: 'Bật đào tạo',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'loaiDaoTao',
    label: 'Loại đào tạo',
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
    key: 'lopBanDau',
    label: 'Lớp ban đầu',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'loaiMonHoc',
    label: 'Loại môn học',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
];

const QuanLyQuyUocCotDiemLopHocPhan = () => {
  const { isOpen: isOpenFilter, toggle: toggleFilter } = useDisclosure(true);
  const [filters, setFilters] = useState<Filter[]>([allFilters[0], allFilters[1]]);

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={isOpenFilter ? 3 : 0}>
        <Stack
          flex={1}
          gap={2}
          sx={{
            overflow: 'auto',
          }}
        >
          <Title
            title="Quản lý quy ước cột điểm lớp học phần"
            showSidebarExpandIcon={!isOpenFilter}
            onClickExpand={toggleFilter}
          />
          <ToolbarActions onJournal={() => {}} />
          <FiltersToolbar filters={filters} setFilters={setFilters} availableFilters={allFilters} />
          <DataGridTable
            columns={quyUocCotDiemLopHocPhanTableColumns}
            rows={mockData}
            getRowId={(row) => row.id}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuanLyQuyUocCotDiemLopHocPhan;

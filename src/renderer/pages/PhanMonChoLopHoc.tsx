import { Card, Stack } from '@mui/material';
import { DataGridTable } from '@renderer/components/Table';
import { Title } from '@renderer/components/Title';
import { Filter, FiltersToolbar, ToolbarActions } from '@renderer/components/toolbars';
import {
  phanMonChoLopHocColumns,
  PhanMonChoLopHocTitleBar,
} from '@renderer/features/phan-mon-cho-lop-hoc';
import { TABS_CONFIG } from '@renderer/shared/configs';
import { useDisclosure } from '@renderer/shared/hooks';
import { useState } from 'react';

const allFilters: Filter[] = [
  {
    key: 'coSo',
    label: 'Cơ sở',
    options: ['K.KTXD - Khoa Kiến trúc', 'K.KTXD - Khoa Xây dựng'],
  },
  {
    key: 'bacDaoTao',
    label: 'Bậc đào tạo',
    options: ['Âm học kiến trúc', 'Thiết kế nội thất', 'Cấu trúc nhà ở'],
  },
  {
    key: 'loaiDaoTao',
    label: 'Loại đào tạo',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
  {
    key: 'khoaHoc',
    label: 'Khóa học',
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
  {
    key: 'hocKy',
    label: 'Học kỳ',
    options: ['Học kỳ 1', 'Học kỳ 2'],
  },
];

const PhanMonChoLopHoc = () => {
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
            title={TABS_CONFIG.PhanMonChoLopHoc.label}
            showSidebarExpandIcon={!isOpenFilter}
            onClickExpand={toggleFilter}
          />
          <ToolbarActions />
          <FiltersToolbar filters={filters} setFilters={setFilters} availableFilters={allFilters} />

          <Card>
            <Stack spacing={2}>
              <PhanMonChoLopHocTitleBar title="Môn học bắt buộc: " />
              <DataGridTable
                columns={phanMonChoLopHocColumns}
                rows={[]}
                getRowId={(row) => row.id}
                checkboxSelection={false}
              />
            </Stack>
          </Card>
          <Card>
            <Stack spacing={2}>
              <PhanMonChoLopHocTitleBar title="Môn học tự chọn: " />
              <DataGridTable
                columns={phanMonChoLopHocColumns}
                rows={[]}
                getRowId={(row) => row.id}
                checkboxSelection={false}
              />
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PhanMonChoLopHoc;

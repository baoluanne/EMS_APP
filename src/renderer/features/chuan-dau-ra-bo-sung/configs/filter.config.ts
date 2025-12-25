import { ChuanDauRaFilters } from '@renderer/features/chuan-dau-ra/configs';
import { NganhHoc, Option } from '@renderer/shared/types';

export const ChuanDauRaBoSungFilters = [
  ...ChuanDauRaFilters,
  {
    key: 'idNganhHoc',
    queryKey: 'NganhHoc',
    label: 'Ngành Học',
    mapper: (data: NganhHoc[]): Option[] =>
      data.map((item) => ({ label: item.tenNganhHoc, value: item.id! })),
  },
];

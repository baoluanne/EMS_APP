import { FilterV2 } from '@renderer/components/toolbars';

export interface SpecialMappedFilter {
  key: string;
  value: string | boolean;
}

export const MapSpecialFilters = (filters: FilterV2[]): SpecialMappedFilter[] => {
  return filters.flatMap<SpecialMappedFilter>((filter) => {
    // Trạng Thái
    if (filter.key === 'idTrangThai') {
      if (filter.value === '1') {
        return [{ key: 'isSuDung', value: true }];
      }
      if (filter.value === '2') {
        return [{ key: 'isSuDung', value: false }];
      }
      return [];
    }

    // Lọc theo quy ước
    if (filter.key === 'locTheoQuyUoc') {
      switch (filter.value) {
        case '1':
          return [{ key: 'isKhongTinhTBC', value: true }];
        case '2':
          return [{ key: 'isChiDiemCuoiKy', value: true }];
        case '3':
          return [{ key: 'soCotDiemTH', value: 'special:greaterThanZero' }];
        case '4':
          return [{ key: 'tieuLuan_BTL', value: 'special:greaterThanZero' }];
        default:
          return [];
      }
    }

    // Default filter
    return filter.value
      ? [{ key: filter.key, value: filter.value }]
      : [];
  });
};

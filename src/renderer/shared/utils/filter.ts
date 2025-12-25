import { TieuChuanXetDanhHieu } from '../types';

/**
 * Generic search filter function that searches through multiple fields of an object
 * @param data - Array of objects to filter
 * @param keyword - Search keyword
 * @param searchableFields - Array of field names to search in
 * @returns Filtered array of objects
 */
export const filterByKeyword = <T extends Record<string, any>>(
  data: T[],
  keyword: string,
  searchableFields: (keyof T)[],
): T[] => {
  if (!keyword.trim()) {
    return data;
  }

  const lowerKeyword = keyword.toLowerCase();

  return data.filter((item) =>
    searchableFields.some((field) => {
      const value = item[field];
      if (value == null) return false;

      // Convert to string and search case-insensitive
      return value.toString().toLowerCase().includes(lowerKeyword);
    }),
  );
};

export const filterTieuChuanXetDanhHieu = (
  data: TieuChuanXetDanhHieu[],
  keyword: string,
): any[] => {
  const searchableFields = [
    'stt',
    'nhomDanhHieu',
    'hocLuc10Tu',
    'hocLuc10Den',
    'hocLuc4Tu',
    'hocLuc4Den',
    'hanhKiemTu',
    'hanhKiemDen',
    'ghiChu',
  ] as (keyof TieuChuanXetDanhHieu)[];

  return filterByKeyword<TieuChuanXetDanhHieu>(data, keyword, searchableFields);
};

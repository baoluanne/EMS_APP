/**
 * Remove accents from Vietnamese strings
 * Useful for case-insensitive and accent-insensitive searches
 */
export const removeAccents = (str: string): string => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

/**
 * Check if a source string contains a search term (accent-insensitive)
 */
export const matchesSearch = (sourceValue: string | null | undefined, searchTerm: string): boolean => {
  if (!searchTerm) return true;
  if (!sourceValue) return false;
  return removeAccents(sourceValue).includes(removeAccents(searchTerm));
};

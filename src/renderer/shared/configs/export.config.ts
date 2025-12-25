export const DATA_OPTIONS = {
  FILTERED: 'filtered',
  ALL: 'all',
} as const;

export const COLUMN_OPTIONS = {
  VISIBLE: 'visible',
  ALL: 'all',
} as const;

export type DataOption = (typeof DATA_OPTIONS)[keyof typeof DATA_OPTIONS];
export type ColumnOption = (typeof COLUMN_OPTIONS)[keyof typeof COLUMN_OPTIONS];

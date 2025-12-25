export interface Option<T = any> {
  label: string;
  value: string | number;
  disabled?: boolean;
  fullOption?: T;
}

export interface FilterOption {
  label: string;
  path: string;
}

export interface PaginationResponse<T> {
  currentPage: number;
  pageSize: number;
  result: T[];
  totalCount: number;
  totalPages: number;
}

export type ObjectKeys<T> = keyof T;
export type ObjectValues<T> = T[ObjectKeys<T>];

export interface FilterComponentProps<T> {
  filter: T;
  setFilter: (newFilter: Partial<T>) => void;
}

export interface FilterFormProps<T> {
  onApply: (filter: T) => void;
  onClear?: () => void;
}

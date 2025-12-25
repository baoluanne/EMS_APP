import { GridColDef } from '@mui/x-data-grid';

export interface ImportExcelProps {
  title: string;
  columns: GridColDef[];
  entity: string;
  onSuccess?: () => void;
  sampleFilePath?: string;
  buttonTitle?: string;
}

export type RawRow = {
  rowNumber?: number;
  data?: Record<string, any>;
  success?: boolean;
  errorMessage?: string | null;
};

export type NormalizedRow = {
  id: number;
  rowNumber: number;
  data: Record<string, any>;
  success: boolean;
  errorMessage: string | null;
  status: 'success' | 'failed';
};

export type NormalizedResult = {
  success: boolean;
  errorMessage: string | null;
  totalRecords: number;
  successRecords: number;
  failedRecords: number;
  rows: NormalizedRow[];
};

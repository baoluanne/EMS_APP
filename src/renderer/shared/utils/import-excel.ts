import { NormalizedResult, NormalizedRow, RawRow } from '@renderer/shared/types';

/** Convert File to Base64 */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/** Normalize server response */
export const normalizeResult = (raw: any): NormalizedResult => {
  const payload = raw?.data ?? raw ?? {};
  const rowsRaw: RawRow[] = payload.rows ?? [];

  const rows: NormalizedRow[] = rowsRaw.map((r, idx) => {
    const isSuccess = r.success ?? !r.errorMessage;
    return {
      id: idx,
      rowNumber: r.rowNumber ?? idx + 2,
      data: r.data ?? {},
      success: isSuccess,
      errorMessage: r.errorMessage ?? null,
      status: isSuccess ? 'success' : 'failed',
    };
  });

  return {
    totalRecords: payload.totalRecords ?? rows.length,
    successRecords: payload.successRecords ?? rows.filter((x) => x.success).length,
    failedRecords: payload.failedRecords ?? rows.filter((x) => !x.success).length,
    rows,
    success: payload.success ?? false,
    errorMessage: payload.errorMessage ?? null,
  };
};

/** Build DataGrid rows */
export const buildRows = (result: NormalizedResult | null) =>
  result?.rows.map((row) => ({
    ...row,
    ...row.data,
  })) ?? [];

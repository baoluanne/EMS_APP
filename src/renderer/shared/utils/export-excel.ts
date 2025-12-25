import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
import { COLUMN_OPTIONS, ColumnOption, DATA_OPTIONS, DataOption } from '../configs';
import { axios } from '../lib';
import { toast } from 'react-toastify';

export interface ExportExcelOptions {
  dataOption: DataOption;
  columnOption: ColumnOption;
}

export interface ExportPaginationParams<T> {
  entity: string;
  filteredData: T[];
  columns: GridColDef[];
  fileName: string;
  options: ExportExcelOptions;
  columnVisibilityModel: GridColumnVisibilityModel;
}

export const fetchAllEntityData = async <T>(entity: string) => await axios.get<T[]>(`/${entity}`);

export async function exportPaginationToExcel<T>(
  params: ExportPaginationParams<T>,
): Promise<string | null | undefined> {
  const { entity, filteredData, columns, fileName, options, columnVisibilityModel } = params;

  const dataToExport =
    options.dataOption === DATA_OPTIONS.FILTERED ? filteredData : await fetchAllEntityData(entity);

  if (!dataToExport || dataToExport.length === 0) {
    return;
  }

  // Build rows with custom headers
  const mappedData = dataToExport.map((row) => {
    const newRow: Record<string, any> = {};
    columns
      .filter(
        (col) =>
          options.columnOption === COLUMN_OPTIONS.ALL ||
          columnVisibilityModel[col.field] === undefined ||
          columnVisibilityModel[col.field],
      ) // Exclude hidden columns
      .forEach((col) => {
        if (!col.field) return;

        // If renderCell exists and valueFormatter is not needed, fallback to raw
        const value = (row as any)[col.field];
        newRow[col.headerName ?? col.field] = col.valueGetter
          ? col.valueGetter(value as never, row, col, {} as any)
          : value;
      });
    return newRow;
  });

  const result = await exportStyledExcel(mappedData, fileName);
  return result;
}

export interface ExportExcelParams<T> {
  data: T[];
  filteredData: T[];
  columns: GridColDef[];
  fileName: string;
  options: ExportExcelOptions;
  columnVisibilityModel: GridColumnVisibilityModel;
}

export async function exportGridToExcel<T>(params: ExportExcelParams<T>) {
  const { data, filteredData, columns, fileName, options, columnVisibilityModel } = params;
  const dataToExport = options.dataOption === DATA_OPTIONS.FILTERED ? filteredData : data;

  if (!dataToExport || dataToExport.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Build rows with custom headers
  const mappedData = dataToExport.map((row) => {
    const newRow: Record<string, any> = {};
    columns
      .filter(
        (col) =>
          options.columnOption === COLUMN_OPTIONS.ALL ||
          columnVisibilityModel[col.field] === undefined ||
          columnVisibilityModel[col.field],
      ) // Exclude hidden columns
      .forEach((col) => {
        if (!col.field) return;

        // If renderCell exists and valueFormatter is not needed, fallback to raw
        const value = (row as any)[col.field];
        newRow[col.headerName ?? col.field] = col.valueGetter
          ? col.valueGetter(value as never, row, col, {} as any)
          : value;
      });
    return newRow;
  });

  return await exportStyledExcel(mappedData, fileName);
}

export async function exportStyledExcel(
  data: any[],
  fileName: string,
): Promise<string | null | undefined> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Add header row
  const headerRow = worksheet.addRow(Object.keys(data[0]));
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

  // Add data rows
  data.forEach((item) => {
    worksheet.addRow(Object.values(item));
  });

  // Auto-fit column widths
  worksheet.columns.forEach((col) => {
    let maxLength = 10; // minimum width
    if (typeof col.eachCell === 'function') {
      col.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
    }
    col.width = maxLength + 10; // add padding
    col.alignment = { horizontal: 'left', vertical: 'middle' };
  });

  // Add borders to all cells
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // Save as file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  // saveAs(blob, `${fileName}.xlsx`);
  const base64Data = await blobToBase64(blob);

  const savePath = await window.electronAPI.saveFile(base64Data, `${fileName}.xlsx`);

  if (!savePath) {
    toast.error('Export Excel thất bại!');
    return null;
  }

  toast.success('Export Excel thành công!');
  await window.electronAPI.openFile(savePath);
  return savePath;
}

/**
 * Helper function to convert a Blob (which exceljs creates)
 * into a base64 string that can be sent over IPC.
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      // reader.result is a Data URL (e.g., "data:app/vnd...;base64,SGVsbG8s...")
      // We just want the base64 data part after the comma
      const data = (reader.result as string).split(',')[1];
      resolve(data);
    };
    reader.readAsDataURL(blob);
  });
}

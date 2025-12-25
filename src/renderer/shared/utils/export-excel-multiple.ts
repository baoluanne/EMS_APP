import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { COLUMN_OPTIONS, DATA_OPTIONS } from '../configs';
import { ExportExcelOptions, fetchAllEntityData } from './export-excel';

export interface MultiExportSheet<T> {
  sheetName: string;
  entity?: string;
  filteredData: T[];
  columns: GridColDef[];
  options: ExportExcelOptions;
  columnVisibilityModel: GridColumnVisibilityModel;
}

/**
 * Hàm mở rộng cho phép export 1 hoặc nhiều bảng vào cùng 1 file Excel.
 * - Nếu truyền 1 bảng → tương tự exportPaginationToExcel hiện tại.
 * - Nếu truyền nhiều bảng → tạo nhiều sheet trong cùng file.
 */
export async function exportMultiplePaginationToExcel<T>(
  sheets: MultiExportSheet<T>[],
  fileName: string,
) {
  if (!sheets || sheets.length === 0) {
    console.warn('No sheets provided for export');
    return;
  }

  const workbook = new ExcelJS.Workbook();

  for (const sheet of sheets) {
    const { sheetName, entity, filteredData, columns, options, columnVisibilityModel } = sheet;

    const dataToExport =
      options.dataOption === DATA_OPTIONS.FILTERED || !entity
        ? filteredData
        : await fetchAllEntityData<T>(entity || '');

    if (!dataToExport || dataToExport.length === 0) {
      console.warn(`No data to export for sheet "${sheetName}"`);
      continue;
    }

    const mappedData = dataToExport.map((row) => {
      const newRow: Record<string, any> = {};
      columns
        .filter(
          (col) =>
            options.columnOption === COLUMN_OPTIONS.ALL ||
            columnVisibilityModel[col.field] === undefined ||
            columnVisibilityModel[col.field],
        )
        .forEach((col) => {
          const value = (row as any)[col.field];
          newRow[col.headerName ?? col.field] = col.valueGetter
            ? col.valueGetter(value as never, row, col, {} as any)
            : value;
        });
      return newRow;
    });

    // Tạo worksheet
    const worksheet = workbook.addWorksheet(sheetName);

    // Header
    const headerRow = worksheet.addRow(Object.keys(mappedData[0]));
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Data
    mappedData.forEach((item) => worksheet.addRow(Object.values(item)));

    // Autofit columns
    worksheet.columns.forEach((col) => {
      let maxLength = 10;
      col.eachCell?.({ includeEmpty: true }, (cell) => {
        const val = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, val.length);
      });
      col.width = maxLength + 10;
      col.alignment = { horizontal: 'left', vertical: 'middle' };
    });

    // Borders
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
  }

  // Lưu file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `${fileName}.xlsx`);
}

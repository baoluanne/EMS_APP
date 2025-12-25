export enum LoaiFileType {
  DOCX = 1,
  XLSX,
  PDF,
  PNG,
  JPEG,
}

export const LoaiFileOptions = [
  { value: LoaiFileType.DOCX, label: 'Word (DOCX)' },
  { value: LoaiFileType.XLSX, label: 'Excel (XLSX)' },
  { value: LoaiFileType.PDF, label: 'PDF' },
  { value: LoaiFileType.PNG, label: 'Ảnh PNG' },
  { value: LoaiFileType.JPEG, label: 'Ảnh JPEG' },
];

export type ThongTinImportForm = {
  folderPath: string;
  supportBackground: boolean;
  importTime?: string;
};
export const defaultThongTinImportForm: ThongTinImportForm = {
  folderPath: '',
  supportBackground: true,
  importTime: '',
};

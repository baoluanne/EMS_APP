import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    electronAPI: {
      getAppVersion: () => Promise<string>;
      downloadResourceFile: (fileName: string) => Promise<{
        success: boolean;
        message: string;
      }>;
      selectFolder: () => Promise<string>;

      // Auto-update APIs
      onUpdateAvailable: (
        callback: (event: any, info: { version: string; releaseDate?: string }) => void,
      ) => () => void;
      onUpdateDownloadProgress: (callback: (event: any, percent: number) => void) => () => void;
      onUpdateDownloaded: (callback: (event: any, info: { version: string }) => void) => () => void;
      onUpdateError: (callback: (event: any, error: { message: string }) => void) => () => void;
      startUpdateDownload: () => void;
      installUpdateNow: () => void;
      readFolderFiles: (folderPath: string) => Promise<{
        success: boolean;
        data?: {
          name: string;
          path: string;
          size: number;
          modified: string;
          ext: string;
          fileBase64: string;
        }[];
        message?: string;
      }>;
      openFile: (filePath: string) => Promise<void>;
      saveFile: (data_base64: string, defaultFileName: string) => Promise<string | null>;
    };
  }
}

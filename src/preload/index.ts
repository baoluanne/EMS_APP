import { contextBridge, ipcRenderer, webFrame } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('zoomControls', {
      setZoom: (factor: number) => webFrame.setZoomFactor(factor),
      getZoom: () => webFrame.getZoomFactor(),
    });
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  downloadResourceFile: (fileName: string) =>
    ipcRenderer.invoke('download-resource-file', fileName),
  selectFolder: () => ipcRenderer.invoke('dialog:selectFolder'),

  // Auto-update APIs
  onUpdateAvailable: (callback: (event: any, info: any) => void) => {
    ipcRenderer.on('update-available', callback);
    return () => ipcRenderer.removeListener('update-available', callback);
  },
  onUpdateDownloadProgress: (callback: (event: any, percent: number) => void) => {
    ipcRenderer.on('update-download-progress', callback);
    return () => ipcRenderer.removeListener('update-download-progress', callback);
  },
  onUpdateDownloaded: (callback: (event: any, info: any) => void) => {
    ipcRenderer.on('update-downloaded', callback);
    return () => ipcRenderer.removeListener('update-downloaded', callback);
  },
  onUpdateError: (callback: (event: any, error: any) => void) => {
    ipcRenderer.on('update-error', callback);
    return () => ipcRenderer.removeListener('update-error', callback);
  },
  startUpdateDownload: () => ipcRenderer.send('start-update-download'),
  installUpdateNow: () => ipcRenderer.send('install-update-now'),
  readFolderFiles: (folderPath: string) => ipcRenderer.invoke('read-folder-files', folderPath),
  openFile: (filePath: string) => ipcRenderer.invoke('open-file', filePath),
  saveFile: (data_base64, defaultFileName) =>
    ipcRenderer.invoke('save-file-dialog', data_base64, defaultFileName),
});

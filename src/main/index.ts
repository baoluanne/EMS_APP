import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import icon from '../../resources/logo.png?asset';
import fs from 'fs';
import path from 'path';

// Logging to make debugging easier
log.transports.file.level = 'info';
autoUpdater.logger = log;

// TODO: Although this to ensure the security when set to true
// but the application is load from private repo
autoUpdater.disableWebInstaller = false;
autoUpdater.autoDownload = false; // Ask user before downloading
log.info('App starting...');

// TODO: This is a work around because cannot load env from env.config.ts
// and the autoUpdater module require GH_TOKEN to work correctly in private repo
const owner = process.env.OWNER;
const repo = process.env.REPO;
const token = process.env.GH_TOKEN;
autoUpdater.setFeedURL({
  provider: 'github',
  owner: owner,
  repo: repo,
  private: true,
  token: token,
});

// To notify the user download is still in progress
let isDownloadingUpdate = false;

// Auto-update event handlers
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for updates...');
});

autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available. Current version is up to date:', info.version);
});

autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info.version);
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    allWindows[0].webContents.send('update-available', {
      version: info.version,
      releaseDate: info.releaseDate,
    });
  }
});

autoUpdater.on('download-progress', (progressObj) => {
  isDownloadingUpdate = true;
  log.info('Download progress:', progressObj.percent);
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    allWindows[0].webContents.send('update-download-progress', Math.floor(progressObj.percent));
  }
});

autoUpdater.on('update-downloaded', (info) => {
  isDownloadingUpdate = false;
  log.info('Update downloaded:', info.version);
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    allWindows[0].webContents.send('update-downloaded', {
      version: info.version,
    });
  }
});

autoUpdater.on('error', (err) => {
  isDownloadingUpdate = false;
  log.error('Update error:', err);
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    allWindows[0].webContents.send('update-error', {
      message: err.message,
    });
  }
});

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 420,
    height: 558,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });
  if (process.platform === 'darwin') {
    mainWindow.setWindowButtonVisibility(false);
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();

    // Check for updates after window is shown and app is fully loaded
    // Delay by 2 seconds to ensure renderer is ready
    setTimeout(() => {
      log.info('Checking for updates after app loaded...');
      autoUpdater.checkForUpdates();
    }, 2000);
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
  // Minimize & Maximize
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('maximize-status-change', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('maximize-status-change', false);
  });

  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('maximize-restore-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    // Prevent closing if update download in progress
    if (isDownloadingUpdate) {
      dialog.showMessageBox(mainWindow!, {
        type: 'warning',
        buttons: ['OK'],
        title: 'Đang tải xuống bản cập nhật',
        message: 'Vui lòng chờ bản cập nhật tải xuống hoàn tất trước khi đóng ứng dụng.',
      });
      return;
    }

    mainWindow.close();
  });

  ipcMain.on('resize-window', (_, { width, height, isEscapeFullscreen = false }) => {
    if (isEscapeFullscreen && mainWindow.isFullScreen()) mainWindow.setFullScreen(false);
    if (isEscapeFullscreen && mainWindow.isMaximized()) mainWindow.unmaximize();

    mainWindow.setSize(width, height);
    mainWindow.center();
  });

  ipcMain.on('set-resizable', (_, isResizable: boolean) => {
    mainWindow.setResizable(isResizable);
  });

  ipcMain.handle('get-app-version', () => {
    return app.getVersion();
  });

  /**
   * Cho phép tải bất kỳ file từ thư mục resources
   * và cho phép người dùng chọn nơi lưu.
   */
  ipcMain.handle('download-resource-file', async (_event, relativePath: string) => {
    try {
      const basePath = is.dev
        ? path.join(__dirname, '../../resources')
        : path.join(process.resourcesPath, 'resources');

      const sourcePath = path.join(basePath, relativePath);
      log.info('Environment:', is.dev ? 'Development' : 'Production');
      log.info('Source file path:', sourcePath);

      if (!fs.existsSync(sourcePath)) {
        const msg = `Không tìm thấy file nguồn: ${sourcePath}`;
        log.error(msg);
        return { success: false, message: msg };
      }

      const extFromSource = path.extname(sourcePath) || ''; // ví dụ .xlsx

      const { filePath, canceled } = await dialog.showSaveDialog({
        title: 'Chọn nơi lưu file',
        defaultPath: path.basename(sourcePath),
        filters: [{ name: 'All Files', extensions: ['*'] }],
      });

      if (canceled || !filePath) {
        log.info('The user has cancelled the storage location selection.');
        return { success: false, message: 'Đã hủy tải file' };
      }

      // Nếu user quên gõ đuôi file -> tự thêm lại
      let finalPath = filePath;
      if (path.extname(finalPath).toLowerCase() !== extFromSource.toLowerCase()) {
        finalPath += extFromSource;
        log.info(`Automatically add file extensions: ${extFromSource}`);
      }

      // Xử lý nếu file đã tồn tại
      const targetDir = path.dirname(finalPath);
      const ext = path.extname(finalPath);
      const baseName = path.basename(finalPath, ext);

      let counter = 1;
      while (fs.existsSync(finalPath)) {
        finalPath = path.join(targetDir, `${baseName} (${counter})${ext}`);
        counter++;
      }

      fs.copyFileSync(sourcePath, finalPath);

      log.info(`File saved successfully at: ${finalPath}`);
      return {
        success: true,
        message: `Đã lưu file "${path.basename(finalPath)}" thành công!`,
      };
    } catch (err: any) {
      log.error('Error when downloading file:', err);
      return { success: false, message: err.message };
    }
  });

  ipcMain.handle('dialog:selectFolder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });

  // Auto-update IPC handlers
  ipcMain.on('start-update-download', () => {
    log.info('User initiated update download');
    autoUpdater.downloadUpdate();
  });

  ipcMain.on('install-update-now', () => {
    log.info('User confirmed update installation');
    // quitAndInstall(isSilent, isForceRunAfter)
    autoUpdater.quitAndInstall(false, true);
  });
  ipcMain.handle('read-folder-files', async (_event, folderPath: string) => {
    try {
      const files = fs.readdirSync(folderPath, { withFileTypes: true });

      const fileList = files
        .filter((f) => f.isFile())
        .map((f) => {
          const fullPath = path.join(folderPath, f.name);
          const stats = fs.statSync(fullPath);
          const fileBuffer = fs.readFileSync(fullPath); // read file into buffer

          return {
            name: f.name,
            path: fullPath,
            size: stats.size,
            modified: stats.mtime,
            ext: path.extname(f.name),
            fileBase64: fileBuffer.toString('base64'), // encode buffer
          };
        });

      return { success: true, data: fileList };
    } catch (err: any) {
      console.error('Error reading folder:', err);
      return { success: false, message: err.message };
    }
  });

  ipcMain.handle('open-file', async (_event, filePath: string) => {
    try {
      // Check if the file actually exists first
      if (!fs.existsSync(filePath)) {
        const msg = `File not found: ${filePath}`;
        log.error(msg);
        return { success: false, message: msg };
      }

      const response = await dialog.showMessageBox({
        type: 'info',
        title: 'Thông báo',
        message: `Bạn có muốn mở file "${path.basename(filePath)}" không?`,
        buttons: ['Có', 'Đóng'],
      });

      if (response.response === 0) {
        const error = await shell.openPath(filePath);
        if (error) {
          log.error('Error opening file:', error);
          return { success: false, message: error };
        } else {
          log.info('File opened successfully.');
          return { success: true, message: 'File opened.' };
        }
      }

      return { success: false, message: 'User cancelled.' };
    } catch (err: any) {
      log.error('Error opening file:', err.message);
      return { success: false, message: err.message };
    }
  });

  /**
   * Opens "Save As..." dialog and saves base64 data to the chosen path.
   * Returns the full file path, or null if cancelled.
   */
  ipcMain.handle(
    'save-file-dialog',
    async (_event, fileData_base64: string, defaultFileName: string) => {
      try {
        const { filePath, canceled } = await dialog.showSaveDialog({
          title: 'Chọn nơi lưu file',
          defaultPath: defaultFileName,
        });

        if (canceled || !filePath) {
          log.info('User cancelled file save.');
          return null;
        }

        const buffer = Buffer.from(fileData_base64, 'base64');
        fs.writeFileSync(filePath, buffer);

        log.info(`File saved successfully at: ${filePath}`);
        return filePath; // <-- Returns the full path!
      } catch (err: any) {
        log.error('Failed to save file:', err);
        return null;
      }
    },
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.()
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

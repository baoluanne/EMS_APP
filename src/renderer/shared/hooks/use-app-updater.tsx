import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateToast } from '@renderer/components/update/UpdateToast';

interface UpdateInfo {
  version: string;
  releaseDate?: string;
}

export const useAppUpdater = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [toastId, setToastId] = useState<string | number | null>(null);

  const dismissToast = () => {
    console.log('[Auto-Updater] Dismissing toast with ID:', toastId);
    if (toastId) {
      toast.dismiss(toastId);
      setToastId(null);
    } else {
      console.warn('[Auto-Updater] No toast ID found, dismissing all toasts');
      toast.dismiss();
    }
  };

  const handleStartUpdate = () => {
    console.log('[Auto-Updater] User clicked update button');
    dismissToast();
    setShowConfirmModal(true);
  };

  const handleCancelUpdate = () => {
    console.log('[Auto-Updater] User clicked cancel button');
    dismissToast();
    setUpdateInfo(null);
  };

  const showUpdateToast = (info: UpdateInfo) => {
    const id = toast.info(
      <UpdateToast
        version={info.version}
        onUpdate={handleStartUpdate}
        onCancel={handleCancelUpdate}
      />,
      {
        position: 'top-right',
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
      },
    );
    console.log('[Auto-Updater] Toast created with ID:', id);
    setToastId(id);
  };

  useEffect(() => {
    // Check if electronAPI is available
    if (!window.electronAPI) {
      console.warn('electronAPI not available - auto-update disabled');
      return;
    }

    // Listen for update available
    const removeUpdateAvailableListener = window.electronAPI.onUpdateAvailable(
      (_event: any, info: UpdateInfo) => {
        console.log('[Auto-Updater] Update available:', info);
        setUpdateInfo(info);
        // Show toast after 15 seconds delay
        console.log('[Auto-Updater] Will show update toast in 15 seconds');
        setTimeout(() => {
          console.log('[Auto-Updater] Showing update toast after 15 seconds delay');
          showUpdateToast(info);
        }, 15000); // 15 seconds = 15000ms
      },
    );

    // Listen for download progress
    const removeProgressListener = window.electronAPI.onUpdateDownloadProgress(
      (_event: any, percent: number) => {
        console.log('Download progress:', percent);
        setDownloadProgress(percent);
      },
    );

    // Listen for update downloaded
    const removeDownloadedListener = window.electronAPI.onUpdateDownloaded(
      (_event: any, info: UpdateInfo) => {
        console.log('Update downloaded:', info);
        setShowProgressModal(false);
        // Automatically install after download completes
        setTimeout(() => {
          window.electronAPI.installUpdateNow();
        }, 1000);
      },
    );

    // Listen for errors
    const removeErrorListener = window.electronAPI.onUpdateError((_event: any, error: any) => {
      console.error('Update error:', error);
      setShowProgressModal(false);
      setShowConfirmModal(false);
      dismissToast();
      toast.error(`Lỗi cập nhật: ${error.message || 'Không thể tải xuống bản cập nhật'}`, {
        position: 'top-right',
        autoClose: 5000,
      });
    });

    // Cleanup listeners on unmount
    return () => {
      removeUpdateAvailableListener();
      removeProgressListener();
      removeDownloadedListener();
      removeErrorListener();
    };
  }, []);

  const handleConfirmUpdate = () => {
    console.log('User confirmed update');
    setShowConfirmModal(false);
    setShowProgressModal(true);
    setDownloadProgress(0);
    // Trigger download
    window.electronAPI.startUpdateDownload();
  };

  const handleCancelConfirmation = () => {
    console.log('User cancelled confirmation');
    setShowConfirmModal(false);
    setUpdateInfo(null);
  };

  return {
    updateInfo,
    showConfirmModal,
    showProgressModal,
    downloadProgress,
    handleConfirmUpdate,
    handleCancelConfirmation,
  };
};

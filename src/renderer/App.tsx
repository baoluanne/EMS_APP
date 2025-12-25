import { Box, ThemeProvider } from '@mui/material';
import { LoadingScreen } from '@renderer/components/loading';
import { useAppBoot } from '@renderer/shared/hooks';
import { QueryClientProvider } from '@renderer/shared/lib';
import { theme } from '@renderer/shared/themes';
import { ToastContainer } from 'react-toastify';

import 'overlayscrollbars/overlayscrollbars.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/main.css';
import { DialogsProvider, NotificationsProvider } from '@toolpad/core';
import React from 'react';
import { TabContents } from '@renderer/layout/components/TabContents';
import { AppContextProvider } from '@renderer/shared/context/app.context';
import { useAppUpdater } from '@renderer/shared/hooks/use-app-updater';
import { UpdateConfirmModal } from '@renderer/components/update/UpdateConfirmModal';
import { UpdateProgressModal } from '@renderer/components/update/UpdateProgressModal';

const MainLayout = () => {
  const { isBooted } = useAppBoot();
  if (!isBooted) {
    return (
      <Box height="100vh" width="100vw">
        <LoadingScreen />
      </Box>
    );
  }

  return (
    <AppContextProvider>
      <TabContents></TabContents>
    </AppContextProvider>
  );
};

const App: React.FC = () => {
  const {
    updateInfo,
    showConfirmModal,
    showProgressModal,
    downloadProgress,
    handleConfirmUpdate,
    handleCancelConfirmation,
  } = useAppUpdater();

  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <DialogsProvider>
            <MainLayout />
          </DialogsProvider>
        </NotificationsProvider>
        <ToastContainer />

        {/* Auto-update modals */}
        {updateInfo && (
          <>
            <UpdateConfirmModal
              open={showConfirmModal}
              version={updateInfo.version}
              onCancel={handleCancelConfirmation}
              onConfirm={handleConfirmUpdate}
            />
            <UpdateProgressModal open={showProgressModal} progress={downloadProgress} />
          </>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

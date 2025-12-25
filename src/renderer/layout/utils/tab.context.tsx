import { createContext, useContext, useEffect, useRef } from 'react';

type TabContext = {
  handleRefresh: (args?: any) => void;
  setRefreshHandler: (args: any, options?: RefreshHandlerOption) => void;
};

type RefreshHandlerOption = {
  force?: boolean;
};

const TabContext = createContext<TabContext | undefined>(undefined);

export function TabContextProvider({ children }) {
  const refreshHandler = useRef<(args?: any) => void>(null);
  const handleRefresh = (args?: any) => {
    if (typeof refreshHandler.current === 'function') {
      refreshHandler.current(args);
    }
  };
  const setRefreshHandler = (args: any, options: RefreshHandlerOption = {}) => {
    if (refreshHandler.current && !options.force) {
      return;
    }
    refreshHandler.current = args;
  };
  return (
    <TabContext.Provider value={{ handleRefresh, setRefreshHandler }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within TabContextProvider');
  }
  return context;
}

export function useHandleRefresh() {
  const context = useTabContext();
  return context.handleRefresh;
}

export function useRefreshHandler(handler: (args?: any) => void) {
  const context = useTabContext();
  useEffect(() => {
    context.setRefreshHandler(handler);
    return () => context.setRefreshHandler(null, { force: true });
  }, []);
  return handler;
}

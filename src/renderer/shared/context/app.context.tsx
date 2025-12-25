import { createContext, Dispatch, useContext, useState } from 'react';

const AppContext = createContext<{ context?: any, setContext?: Dispatch<Record<string, any>> }>({});

export function AppContextProvider({ children }) {
  const [context, setContext] = useState({});
  return <AppContext.Provider value={{ context, setContext }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

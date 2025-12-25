import { createContext, ReactNode, useContext as useReactContext } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export const generateContext = <T,>(useCreateContextValue: () => T, name = 'Context') => {
  const Context = createContext<T | undefined>(undefined);

  const Provider = ({ children }: ProviderProps) => {
    const value = useCreateContextValue();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = (): T => {
    const context = useReactContext(Context);
    if (context === undefined) {
      throw new Error(`useContext must be used within its corresponding ${name} Provider`);
    }
    return context;
  };

  return { Provider, useContext };
};

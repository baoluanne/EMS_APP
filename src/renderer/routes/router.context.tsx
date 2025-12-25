import { createContext, useContext } from 'react';
import { createRouter } from './routes';

const RouterContext = createContext<{ key: number }>({ key: 0 });

export function createRouterContext(key: number = 0) {
  const router = createRouter();
  return <RouterContext.Provider value={{ key }}>{router}</RouterContext.Provider>;
}

export function useRouterContext() {
  return useContext(RouterContext);
}

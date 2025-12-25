import { ExplorerTree } from '@renderer/components/explorer-tree/ExplorerTree';
import { Footer } from '@renderer/layout/components/Footer';
import { WindowAction } from '@renderer/layout/components/WindowAction';
import { getRouteByPath } from '@renderer/routes';
import { useRouterContext } from '@renderer/routes/router.context';
import { useAppContext } from '@renderer/shared/context/app.context';
import { useAuthStore, useSidebarStore } from '@renderer/shared/stores';
import { useTabsStore } from '@renderer/shared/stores/tabs.store';
import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Split from 'react-split';

/**
 * Returns true when we should update window size/resizability:
 * - only on transitions between login and main app
 * - only when on login OR when there’s ≤1 tab (for main app)
 * - ignore initial "default" navigation
 */
const shouldResizeWindow = (
  prevIsLogin: boolean | undefined,
  isLogin: boolean,
  numberOfTabs: number,
  locationKey: string,
): boolean => {
  const routeChangedBetweenAuthStates = prevIsLogin === undefined || prevIsLogin !== isLogin;

  const tabConstraintOk = isLogin || numberOfTabs <= 1;

  const notInitialNavigation = locationKey !== 'default';

  return routeChangedBetweenAuthStates && tabConstraintOk && notInitialNavigation;
};

export default function Layout() {
  const { isAuth } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const routerContext = useRouterContext();
  const appContext = useAppContext();
  const { isOpen } = useSidebarStore();
  const { tabs } = useTabsStore();

  const prevIsLoginRef = useRef<boolean>(undefined);

  const numberOfTabs = tabs.length;

  useEffect(() => {
    appContext.setContext!((ctx) => ({
      ...ctx,
      [routerContext.key]: getRouteByPath(location.pathname),
    }));
  }, [location.pathname]);

  useEffect(() => {
    const isLogin = location.pathname === '/login';
    const prevIsLogin = prevIsLoginRef.current;

    if (shouldResizeWindow(prevIsLogin, isLogin, numberOfTabs, location.key)) {
      const size = isLogin
        ? { width: 420, height: 558, isEscapeFullscreen: true }
        : { width: 1400, height: 900 };

      const isResizable = !isLogin;

      window.electron.ipcRenderer.send('resize-window', size);
      window.electron.ipcRenderer.send('set-resizable', isResizable);
      prevIsLoginRef.current = isLogin;
    }
  }, [location.key, location.pathname, numberOfTabs]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    navigate('/dashboard');
  }, [isAuth]);

  if (location.pathname === '/login') {
    return (
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <WindowAction></WindowAction>
        <div className="h-full w-full overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden relative">
      <WindowAction></WindowAction>
      <div id={`tab-${routerContext.key}`} className="w-full will-change-transform pb-8">
        <Split
          className="flex h-[calc(100vh-112px)]"
          sizes={isOpen ? [20, 80] : [0, 100]}
          minSize={[isOpen ? 250 : 0, 640]}
          gutterSize={10}
          expandToMin={!isOpen}
        >
          <div className="h-full overflow-auto border-r border-gray-200 bg-white">
            <ExplorerTree />
          </div>
          <div className="h-full w-full overflow-auto">
            <Outlet />
          </div>
        </Split>
      </div>

      <div className="absolute -bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

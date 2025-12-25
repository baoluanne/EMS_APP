import { generateStore } from '@renderer/shared/lib/store';
import { createRouterContext } from '@renderer/routes/router.context';

type Tab = {
  content?: any;
  route?: any;
  key: number;
};

type State = {
  tabs: Tab[];
  activeKey: number;
  history: number[];
};

let initialKey = 0;

const generateKey = () => ++initialKey;

const defaultTab: Tab = {
  route: undefined,
  content: undefined,
  key: 0,
};

const createDefaultTab = (key?: number) => {
  key = key || generateKey();
  return {
    ...defaultTab,
    key,
    content: createRouterContext(key),
  };
};

export const useTabsStore = generateStore({
  state: (): State => {
    const tab = createDefaultTab();
    return {
      tabs: [tab],
      activeKey: tab.key,
      history: [tab.key],
    };
  },
  getters: (state) => {
    return {
      allowCloseTab: state.tabs.length > 1,
    };
  },
  actions: (set) => ({
    addNewTab: () => {
      set((state) => {
        const activeKey = generateKey();
        state.tabs.push(createDefaultTab(activeKey));
        state.history.push(activeKey);
        state.activeKey = activeKey;
        return { ...state };
      });
    },
    setActiveKey: (key: number) => {
      set((state) => {
        state.activeKey = key;
        return { ...state };
      });
    },
    closeTab: (key: number) => {
      set((state) => {
        state.tabs = state.tabs.filter((tab) => tab.key !== key);
        state.history = state.history.filter((tabKey) => tabKey !== key);
        const isActiveTabExisted = state.tabs.find((tab) => tab.key === state.activeKey);
        if (!isActiveTabExisted) {
          state.activeKey = state.history[state.history.length - 1];
        }
        return { ...state };
      });
    },
    resetTab: () => {
      set((state) => {
        const activeKey = generateKey();
        state.activeKey = activeKey;
        state.tabs = [createDefaultTab(activeKey)];
        return { ...state };
      });
    },
  }),
});

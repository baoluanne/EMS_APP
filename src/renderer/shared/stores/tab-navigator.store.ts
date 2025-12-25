import { TABS_CONFIG } from '../configs';
import { NavigatorTab } from '../configs/routes.config/types';
import { generateStore } from '../lib/store';

const defaultTabs: NavigatorTab[] = [TABS_CONFIG.DanhSachMonHoc];

const initialState = {
  activeTab: defaultTabs[0],
  tabs: defaultTabs,
};

export const useTabNavigatorStore = generateStore({
  state: () => initialState,
  getters: (state) => ({
    tabCount: state.tabs.length,
  }),
  actions: (set) => ({
    createNewTab: () =>
      set((prev) => ({
        ...prev,
        tabs: [
          ...prev.tabs,
          {
            id: Date.now().toString(),
            label: `QL quy ước cách tính điểm môn học #${Date.now()}`,
            path: '',
          },
        ],
      })),

    openTab: (newTab: NavigatorTab) =>
      set((prev) => {
        const existTab = prev.tabs.find((tab) => tab.id === newTab.id);
        if (existTab) {
          return {
            ...prev,
            activeTab: existTab,
          };
        }

        const tabs = [...prev.tabs, newTab];
        const activeTab = newTab;

        return { ...prev, tabs, activeTab };
      }),

    removeTab: (id: string) =>
      set((prev) => {
        // At least one tab
        if (prev.tabs.length <= 1) {
          return prev;
        }

        const tabs = prev.tabs.filter((tab) => tab.id !== id);

        // Ensure active tab exist
        const isActiveTabExist = tabs.find((tab) => tab.id === prev.activeTab.id);
        const activeTab = isActiveTabExist ? prev.activeTab : tabs[0];

        return {
          ...prev,
          tabs,
          activeTab,
        };
      }),

    setActiveTab: (id: string) =>
      set((prev) => {
        const activeTab = prev.tabs.find((tab) => tab.id === id);
        if (!activeTab) {
          return prev;
        }

        return { ...prev, activeTab };
      }),

    setTabs: (tabs: NavigatorTab[]) => set({ tabs }),
  }),
});

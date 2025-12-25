import { generateStore } from '../lib/store';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
};

export const useSidebarStore = generateStore({
  state: () => initialState,
  getters: (state) => ({
    isOpen: state.isOpen,
  }),
  actions: (set) => ({
    toggle: () => set((prev) => ({ isOpen: !prev.isOpen })),
  }),
});

import { generateStore } from '@renderer/shared/lib/store';

type Node = {
  id: string;
  fullPath: string;
  icon: string;
  label: string;
  pinned?: boolean;
};

type State = {
  home: Node[];
  pinned: Node[];
  others: Node[];
};

const initialState: State = {
  home: [],
  pinned: [],
  others: [],
};

export const useExplorerTreeStore = generateStore({
  state: () => ({
    ...initialState,
  }),

  actions: (set) => ({
    setHomeItems: (items: Node[]) => {
      set((state) => {
        state.home = items;
        return { ...state };
      });
    },
    setPinItems: (items: Node[]) => {
      set((state) => {
        state.pinned = items;
        return { ...state };
      });
    },
    setOtherItems: (items: Node[]) => {
      set((state) => {
        state.others = items;
        return { ...state };
      });
    },
    togglePinItem: (item: Node) => {
      set((state) => {
        const isPinned = state.pinned.some((pinnedItem) => pinnedItem.id === item.id);
        if (isPinned) {
          state.pinned = state.pinned.filter((pinnedItem) => pinnedItem.id !== item.id);
        } else {
          state.pinned.push(item);
        }
        return { ...state };
      });
    },
  }),
});

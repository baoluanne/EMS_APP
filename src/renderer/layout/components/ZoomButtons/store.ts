import { generateStore } from '@renderer/shared/lib/store';

export const useZoomControlStore = generateStore({
  state: () => {
    return {
      zoomLevel: 100,
    };
  },
  actions: (set) => ({
    setZoomLevel: (zoomLevel: number) =>
      set((prev) => ({
        ...prev,
        zoomLevel,
      })),
  }),
});

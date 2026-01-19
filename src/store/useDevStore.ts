import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DevState {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

export const useDevStore = create<DevState>()(
  persist(
    (set) => ({
      isDevMode: false,
      toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
    }),
    {
      name: "dev-mode-storage",
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProgressState {
  learned: string[];
  toggleLearned: (variantId: string) => void;
  importData: (data: { learned: string[] }) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      learned: [],

      toggleLearned: (id) =>
        set((state) => ({
          learned: state.learned.includes(id)
            ? state.learned.filter((i) => i !== id)
            : [...state.learned, id],
        })),

      importData: (data) =>
        set({
          learned: data.learned || [],
        }),
    }),
    {
      name: "guitar-progress-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

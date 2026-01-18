import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProgressState {
  learned: string[];
  learning: string[];
  toggleLearned: (variantId: string) => void;
  toggleLearning: (variantId: string) => void;
  importData: (data: { learned: string[]; learning: string[] }) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      learned: [],
      learning: [],

      toggleLearned: (id) =>
        set((state) => ({
          learned: state.learned.includes(id)
            ? state.learned.filter((i) => i !== id)
            : [...state.learned, id],
          learning: state.learning.filter((i) => i !== id),
        })),

      toggleLearning: (id) =>
        set((state) => ({
          learning: state.learning.includes(id)
            ? state.learning.filter((i) => i !== id)
            : [...state.learning, id],
          learned: state.learned.filter((i) => i !== id),
        })),

      importData: (data) =>
        set({
          learned: data.learned || [],
          learning: data.learning || [],
        }),
    }),
    {
      name: "guitar-progress-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

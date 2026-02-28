import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProgressState {
  userList: string[];
  toggleUserList: (variantId: string) => void;
  importData: (data: { userList: string[] }) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      userList: [],

      toggleUserList: (id) =>
        set((state) => ({
          userList: state.userList.includes(id) ? state.userList.filter((i) => i !== id) : [...state.userList, id],
        })),

      importData: (data) =>
        set({
          userList: data.userList || [],
        }),
    }),
    {
      name: "guitar-progress-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

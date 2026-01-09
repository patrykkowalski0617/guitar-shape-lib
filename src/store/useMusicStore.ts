import type { MusicKeyId } from "@/utils/musicKeys/musicKeys";
import { create } from "zustand";

interface MusicState {
  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),
}));

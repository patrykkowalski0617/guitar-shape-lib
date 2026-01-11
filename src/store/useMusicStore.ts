import type { MusicKeyId } from "@/utils/musicKeys/musicKeys";
import { create } from "zustand";

export type isMajorMode = boolean;

interface MusicState {
  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;
  isMajorMode: isMajorMode;
  setIsMajorMode: (isMajorMode: isMajorMode) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => set({ isMajorMode: isMajorMode }),
}));

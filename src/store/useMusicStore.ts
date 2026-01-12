import type { MusicFunctionId, MusicKeyId } from "@/utils";
import { create } from "zustand";

export type isMajorMode = boolean;

interface MusicState {
  isMajorMode: isMajorMode;
  setIsMajorMode: (isMajorMode: isMajorMode) => void;

  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;

  currentMusicFunctionId: MusicFunctionId;
  setCurrentMusicFunctionId: (id: MusicFunctionId) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => set({ isMajorMode: isMajorMode }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),

  currentMusicFunctionId: "tonic",
  setCurrentMusicFunctionId: (id) => set({ currentMusicFunctionId: id }),
}));

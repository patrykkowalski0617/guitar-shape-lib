import type { MusicFunctionId, MusicKeyId } from "@/utils";
import { create } from "zustand";

interface MusicState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;

  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;

  currentMusicFunctionId: MusicFunctionId;
  setCurrentMusicFunctionId: (id: MusicFunctionId) => void;

  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (areDescriptiveLabels: boolean) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => set({ isMajorMode: isMajorMode }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),

  currentMusicFunctionId: "tonic",
  setCurrentMusicFunctionId: (id) => set({ currentMusicFunctionId: id }),

  areDescriptiveLabels: false,
  setAreDescriptiveLabels: (areDescriptiveLabels) =>
    set({ areDescriptiveLabels: areDescriptiveLabels }),
}));

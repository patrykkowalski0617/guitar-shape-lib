import { create } from "zustand";
import { type MusicFunctionId, type MusicKeyId } from "@/utils";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;
  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;
  currentMusicFunctionId: MusicFunctionId | null;
  setCurrentMusicFunctionId: (id: MusicFunctionId | null) => void;
  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (areDescriptiveLabels: boolean) => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => set({ isMajorMode, currentMusicFunctionId: null }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id, currentMusicFunctionId: null }),

  currentMusicFunctionId: null,
  setCurrentMusicFunctionId: (id) => set({ currentMusicFunctionId: id }),

  areDescriptiveLabels: false,
  setAreDescriptiveLabels: (areDescriptiveLabels) => set({ areDescriptiveLabels }),
}));

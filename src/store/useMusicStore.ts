import {
  generateScaleSteps,
  getStepsCountForFunction,
  type MusicFunctionId,
  type MusicKeyId,
  type Note,
} from "@/utils";
import { create } from "zustand";

interface MusicState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;

  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;

  currentMusicFunctionId: MusicFunctionId | null;
  setCurrentMusicFunctionId: (id: MusicFunctionId) => void;

  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (areDescriptiveLabels: boolean) => void;

  activeScaleNotes: Note[];
  setActiveScaleNotes: (notes: Note[]) => void;

  activeScaleSteps: number[];
}

export const useMusicStore = create<MusicState>((set) => ({
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => {
    set({
      isMajorMode: isMajorMode,
      currentMusicFunctionId: null,
      activeScaleSteps: generateScaleSteps(9),
    });
  },

  currentKeyId: "C",
  setCurrentKey: (id) => {
    set({
      currentKeyId: id,
      currentMusicFunctionId: null,
      activeScaleSteps: generateScaleSteps(9),
    });
  },

  currentMusicFunctionId: null,
  setCurrentMusicFunctionId: (id) => {
    const stepsCount = getStepsCountForFunction(id);
    set({
      currentMusicFunctionId: id,
      activeScaleSteps: generateScaleSteps(stepsCount),
    });
  },

  areDescriptiveLabels: false,
  setAreDescriptiveLabels: (areDescriptiveLabels) =>
    set({ areDescriptiveLabels: areDescriptiveLabels }),

  activeScaleNotes: [],
  setActiveScaleNotes: (notes) => set({ activeScaleNotes: notes }),

  activeScaleSteps: generateScaleSteps(9),
}));

import {
  MINOR_MAJOR_TEMPLATE_STEPS,
  MINOR_MAJOR_TEMPLATE_STEPS_2octaves,
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

  expansionTimeoutId: ReturnType<typeof setTimeout> | null;
  activeScaleSteps: number[];
  triggerActiveScaleStepsExpansion: (duration: number) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => set({ isMajorMode: isMajorMode }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),

  currentMusicFunctionId: null,
  setCurrentMusicFunctionId: (id) => set({ currentMusicFunctionId: id }),

  areDescriptiveLabels: false,
  setAreDescriptiveLabels: (areDescriptiveLabels) =>
    set({ areDescriptiveLabels: areDescriptiveLabels }),

  activeScaleNotes: [],
  setActiveScaleNotes: (notes) => set({ activeScaleNotes: notes }),

  expansionTimeoutId: null,
  activeScaleSteps: MINOR_MAJOR_TEMPLATE_STEPS,
  triggerActiveScaleStepsExpansion: (duration) => {
    const { expansionTimeoutId } = get();

    if (expansionTimeoutId !== null) {
      clearTimeout(expansionTimeoutId);
    }

    set({ activeScaleSteps: MINOR_MAJOR_TEMPLATE_STEPS_2octaves });

    const newTimeoutId = setTimeout(() => {
      set({
        activeScaleSteps: MINOR_MAJOR_TEMPLATE_STEPS,
        expansionTimeoutId: null,
      });
    }, duration);

    set({ expansionTimeoutId: newTimeoutId });
  },
}));

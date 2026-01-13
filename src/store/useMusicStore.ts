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
  setIsMajorMode: (isMajorMode) => {
    const { expansionTimeoutId } = get();
    if (expansionTimeoutId) clearTimeout(expansionTimeoutId);

    set({
      isMajorMode: isMajorMode,
      currentMusicFunctionId: null,
      activeScaleSteps: MINOR_MAJOR_TEMPLATE_STEPS,
      expansionTimeoutId: null,
    });
  },

  currentKeyId: "C",
  setCurrentKey: (id) => {
    const { expansionTimeoutId } = get();
    if (expansionTimeoutId) clearTimeout(expansionTimeoutId);

    set({
      currentKeyId: id,
      currentMusicFunctionId: null,
      activeScaleSteps: MINOR_MAJOR_TEMPLATE_STEPS,
      expansionTimeoutId: null,
    });
  },

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

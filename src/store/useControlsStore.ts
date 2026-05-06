import { create } from "zustand";
import type { BaseChordId, TuneKeyId } from "@/data";

interface ControlsState {
  tuneKeyId: TuneKeyId;
  setTuneKeyId: (id: TuneKeyId) => void;

  baseChordId: BaseChordId | null;
  setBaseChordId: (id: BaseChordId | null) => void;

  shapeId: string | null;
  shapeSemitoneOffsetFromC: number | null;
  setShape: (
    shapeId: string | null,
    shapeSemitoneOffsetFromC: number | null,
  ) => void;

  resetControls: () => void;

  isShapeSelectOpen: boolean;
  setIsShapeSelectOpen: (open: boolean) => void;

  isShapeSliderHold: boolean;
  setIsShapeSliderHold: (hold: boolean) => void;

  isActuallyPlayable: boolean;
  toggleItIsActuallyPlayable: () => void;
}

const initialState = {
  tuneKeyId: "C" as TuneKeyId,
  baseChordId: null,
  shapeId: null,
  shapeSemitoneOffsetFromC: null as number | null,
  isShapeSelectOpen: false,
  isShapeSliderHold: false,
  isActuallyPlayable: false,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setTuneKeyId: (tuneKeyId) => set({ tuneKeyId }),

  setBaseChordId: (baseChordId) => set({ baseChordId }),

  setShape: (shapeId, shapeSemitoneOffsetFromC) =>
    set({
      shapeId,
      shapeSemitoneOffsetFromC,
    }),

  setIsShapeSelectOpen: (isShapeSelectOpen) => set({ isShapeSelectOpen }),

  setIsShapeSliderHold: (isShapeSliderHold) => set({ isShapeSliderHold }),

  toggleItIsActuallyPlayable: () =>
    set((state) => ({ isActuallyPlayable: !state.isActuallyPlayable })),

  resetControls: () => set(initialState),
}));

import { create } from "zustand";
import type { BaseChordId, TuneKeyId, RoleId } from "@/data";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;

  tuneKeyId: TuneKeyId;
  setTuneKeyId: (id: TuneKeyId) => void;

  roleId: RoleId | null;

  baseChordId: BaseChordId | null;
  setBaseChordId: (id: BaseChordId | null) => void;

  setToggleBaseChordId: (id: BaseChordId | null) => void;
  toggleBaseChordId: BaseChordId | null;

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
}

const initialState = {
  isMajorMode: true,
  tuneKeyId: "C" as TuneKeyId,
  baseChordId: null,
  toggleBaseChordId: null,
  roleId: "all-matching-key" as RoleId | null,
  shapeId: null as string | null,
  shapeSemitoneOffsetFromC: null as number | null,
  isShapeSelectOpen: false,
  isShapeSliderHold: false,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setIsMajorMode: (isMajorMode) =>
    set((state) => {
      if (!state.roleId) return { isMajorMode };

      return {
        isMajorMode,
      };
    }),

  setTuneKeyId: (id) => set({ tuneKeyId: id }),

  setBaseChordId: (id) => set({ baseChordId: id }),
  setToggleBaseChordId: (id) => set({ toggleBaseChordId: id }),

  setShape: (shapeId, shapeSemitoneOffsetFromC) =>
    set({
      shapeId,
      shapeSemitoneOffsetFromC,
    }),

  setIsShapeSelectOpen: (open) => set({ isShapeSelectOpen: open }),

  setIsShapeSliderHold: (hold) => set({ isShapeSliderHold: hold }),

  resetControls: () => set(initialState),
}));

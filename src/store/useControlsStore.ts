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

  shapeId: string | null;
  shapeSemitoneOffsetFromC: number | null;
  setShape: (
    shapeId: string | null,
    shapeSemitoneOffsetFromC: number | null,
  ) => void;

  resetControls: () => void;
}

const initialState = {
  isMajorMode: true,
  tuneKeyId: "C" as TuneKeyId,
  baseChordId: null,
  roleId: "all-matching-key" as RoleId | null,
  shapeId: null as string | null,
  shapeSemitoneOffsetFromC: null as number | null,
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

  setShape: (shapeId, shapeSemitoneOffsetFromC) =>
    set({
      shapeId,
      shapeSemitoneOffsetFromC,
    }),

  resetControls: () => set(initialState),
}));

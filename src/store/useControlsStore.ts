import { create } from "zustand";
import { getAutoSelectedShape } from "@/components/Controls/ShapeSelect/helpers";
import type { MusicKeyId, RoleId } from "@/data";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;

  tuneKeyId: MusicKeyId;
  setTuneKeyId: (id: MusicKeyId) => void;

  roleId: RoleId | null;
  setRoleId: (id: RoleId | null) => void;

  shapeId: string | null;
  shapeSemitoneOffsetFromC: number | null;
  setShape: (shapeId: string | null, shapeSemitoneOffsetFromC: number | null) => void;

  isPianoVisable: boolean;
  setIsPianoVisable: (show: boolean) => void;

  resetControls: () => void;
}

const initialState = {
  isMajorMode: true,
  tuneKeyId: "C" as MusicKeyId,
  roleId: "all-one-instance" as RoleId | null,
  shapeId: null as string | null,
  shapeSemitoneOffsetFromC: null as number | null,
  isPianoVisable: false,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setIsMajorMode: (isMajorMode) =>
    set((state) => {
      if (!state.roleId) return { isMajorMode };

      const { shapeId, shapeSemitoneOffsetFromC } = getAutoSelectedShape(state.roleId, isMajorMode, state.tuneKeyId);

      return {
        isMajorMode,
        shapeId: shapeId,
        shapeSemitoneOffsetFromC: shapeSemitoneOffsetFromC,
      };
    }),

  setTuneKeyId: (id) => set({ tuneKeyId: id }),

  setRoleId: (id) =>
    set((state) => {
      if (!id) {
        return {
          roleId: null,
          shapeId: null,
          shapeSemitoneOffsetFromC: null,
        };
      }

      const { shapeId, shapeSemitoneOffsetFromC } = getAutoSelectedShape(id, state.isMajorMode, state.tuneKeyId);

      return {
        roleId: id,
        shapeId: shapeId,
        shapeSemitoneOffsetFromC: shapeSemitoneOffsetFromC,
      };
    }),

  setShape: (shapeId, shapeSemitoneOffsetFromC) =>
    set({
      shapeId,
      shapeSemitoneOffsetFromC,
    }),

  setIsPianoVisable: (show) => set({ isPianoVisable: show }),

  resetControls: () => set(initialState),
}));

import { create } from "zustand";
import { getAutoSelectedShape } from "@/components/Controls/ShapeSelect/helpers";
import type { MusicKeyId, RoleId } from "@/data";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;

  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;

  currentRoleId: RoleId | null;
  setCurrentRoleId: (id: RoleId | null) => void;

  currentShapeId: string | null;
  currentShapeSemitoneOffsetFromC: number | null;
  setShape: (id: string | null, offset: number | null) => void;

  isPianoVisable: boolean;
  setIsPianoVisable: (show: boolean) => void;

  resetControls: () => void;
}

const initialState = {
  isMajorMode: true,
  currentKeyId: "C" as MusicKeyId,
  currentRoleId: "all-one-instance" as RoleId | null,
  currentShapeId: null as string | null,
  currentShapeSemitoneOffsetFromC: null as number | null,
  isPianoVisable: false,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setIsMajorMode: (isMajorMode) =>
    set((state) => {
      if (!state.currentRoleId) return { isMajorMode };

      const { shapeId, offset } = getAutoSelectedShape(state.currentRoleId, isMajorMode);

      return {
        isMajorMode,
        currentShapeId: shapeId,
        currentShapeSemitoneOffsetFromC: offset,
      };
    }),

  setCurrentKey: (id) => set({ currentKeyId: id }),

  setCurrentRoleId: (id) =>
    set((state) => {
      if (!id) {
        return {
          currentRoleId: null,
          currentShapeId: null,
          currentShapeSemitoneOffsetFromC: null,
        };
      }

      const { shapeId, offset } = getAutoSelectedShape(id, state.isMajorMode);

      return {
        currentRoleId: id,
        currentShapeId: shapeId,
        currentShapeSemitoneOffsetFromC: offset,
      };
    }),

  setShape: (id, offset) =>
    set({
      currentShapeId: id,
      currentShapeSemitoneOffsetFromC: offset,
    }),

  setIsPianoVisable: (show) => set({ isPianoVisable: show }),

  resetControls: () => set(initialState),
}));

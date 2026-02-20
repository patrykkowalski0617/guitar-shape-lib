import { create } from "zustand";
import { getAutoSelectedShape } from "@/components/Controls/ShapeSelect/helpers/shapeHelpers";
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
  showPiano: boolean;
  setShowPiano: (show: boolean) => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  isMajorMode: true,
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

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),

  currentRoleId: "all",
  setCurrentRoleId: (id) =>
    set((state) => {
      if (id === null || id.length === 0) {
        return { currentRoleId: null, currentShapeId: null, currentShapeSemitoneOffsetFromC: null };
      }
      const { shapeId, offset } = getAutoSelectedShape(id, state.isMajorMode);

      return {
        currentRoleId: id,
        currentShapeId: shapeId,
        currentShapeSemitoneOffsetFromC: offset,
      };
    }),

  currentShapeId: null,
  currentShapeSemitoneOffsetFromC: null,
  setShape: (id, offset) => set({ currentShapeId: id, currentShapeSemitoneOffsetFromC: offset }),

  showPiano: false,
  setShowPiano: (show) => set({ showPiano: show }),
}));

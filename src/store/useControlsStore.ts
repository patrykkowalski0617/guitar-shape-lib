import { create } from "zustand";
import { type RoleId, type MusicKeyId } from "@/utils";
import { getAutoSelectedShape } from "@/components/ShapeSelect/helpers/shapeHelpers";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;
  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;
  currentRoleId: RoleId | null;
  setCurrentRoleId: (id: RoleId | null) => void;
  currentShapeId: string | null;
  currentShapeOffset: number | null;
  setShape: (id: string | null, offset: number | null) => void;
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
        currentShapeOffset: offset,
      };
    }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),

  currentRoleId: null,
  setCurrentRoleId: (id) =>
    set((state) => {
      if (id === null) {
        return { currentRoleId: null, currentShapeId: null, currentShapeOffset: null };
      }
      const { shapeId, offset } = getAutoSelectedShape(id, state.isMajorMode);

      return {
        currentRoleId: id,
        currentShapeId: shapeId,
        currentShapeOffset: offset,
      };
    }),

  currentShapeId: null,
  currentShapeOffset: null,
  setShape: (id, offset) => set({ currentShapeId: id, currentShapeOffset: offset }),
}));

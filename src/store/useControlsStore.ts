import { create } from "zustand";
import { type RoleId, type MusicKeyId, UNIFIED_MUSIC_KEYS } from "@/utils";
import { getAutoSelectedShape } from "@/components/ShapeSelect/helpers/shapeHelpers";

type direction = "next" | "prev";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;
  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;
  shiftKey: (id: direction) => void;
  currentRoleId: RoleId | null;
  setCurrentRoleId: (id: RoleId | null) => void;
  currentShapeId: string | null;
  currentShapeOffset: number | null;
  setShape: (id: string | null, offset: number | null) => void;
}

const KEY_IDS = Object.keys(UNIFIED_MUSIC_KEYS) as MusicKeyId[];

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
  shiftKey: (direction) =>
    set((state) => {
      const currentIndex = KEY_IDS.indexOf(state.currentKeyId);
      const lastIndex = KEY_IDS.length - 1;

      let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex > lastIndex) nextIndex = 0;
      if (nextIndex < 0) nextIndex = lastIndex;

      return { currentKeyId: KEY_IDS[nextIndex] };
    }),

  currentRoleId: null,
  setCurrentRoleId: (id) =>
    set((state) => {
      console.log(typeof id);

      if (id === null || id.length === 0) {
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

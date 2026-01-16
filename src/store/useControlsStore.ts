import { create } from "zustand";
import { type RoleId, type MusicKeyId } from "@/utils";

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
  setIsMajorMode: (isMajorMode) => set({ isMajorMode }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id }),

  currentRoleId: null,
  setCurrentRoleId: (id) =>
    set({ currentRoleId: id, currentShapeId: null, currentShapeOffset: null }),

  currentShapeId: null,
  currentShapeOffset: null,
  setShape: (id, offset) => set({ currentShapeId: id, currentShapeOffset: offset }),
}));

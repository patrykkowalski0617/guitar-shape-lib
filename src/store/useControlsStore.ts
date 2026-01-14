import { create } from "zustand";
import { type RoleId, type MusicKeyId } from "@/utils";

interface ControlsState {
  isMajorMode: boolean;
  setIsMajorMode: (isMajorMode: boolean) => void;
  currentKeyId: MusicKeyId;
  setCurrentKey: (id: MusicKeyId) => void;
  currentRoleId: RoleId | null;
  setCurrentRoleId: (id: RoleId | null) => void;
  areDescriptiveLabels: boolean;
  setAreDescriptiveLabels: (areDescriptiveLabels: boolean) => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  isMajorMode: true,
  setIsMajorMode: (isMajorMode) => set({ isMajorMode, currentRoleId: null }),

  currentKeyId: "C",
  setCurrentKey: (id) => set({ currentKeyId: id, currentRoleId: null }),

  currentRoleId: null,
  setCurrentRoleId: (id) => set({ currentRoleId: id }),

  areDescriptiveLabels: false,
  setAreDescriptiveLabels: (areDescriptiveLabels) => set({ areDescriptiveLabels }),
}));

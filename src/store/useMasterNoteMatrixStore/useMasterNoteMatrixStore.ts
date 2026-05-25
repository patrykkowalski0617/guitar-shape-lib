import { create } from "zustand";
import type { MasterNoteMatrixState } from "./types";

export const useMasterNoteMatrixStore = create<MasterNoteMatrixState>(
  (set) => ({
    masterTargetNoteIndex: null,
    setMasterTargetNoteIndex: (masterTargetNoteIndex) =>
      set({ masterTargetNoteIndex }),
  }),
);

import { create } from "zustand";
import { type Note } from "@/utils";

interface MusicState {
  currentKey: Note;
  setCurrentKey: (note: Note) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  currentKey: "C",
  setCurrentKey: (note) => set({ currentKey: note }),
}));

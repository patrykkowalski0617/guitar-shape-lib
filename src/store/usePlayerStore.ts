import { create } from "zustand";

interface ControlsState {
  bricks: any;
  setBricks: (isMajorMode: boolean) => void;
}

export const useControlsStore = create<ControlsState>(() => ({}));

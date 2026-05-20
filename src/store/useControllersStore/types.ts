import type { StringIndexes } from "@/components/GuitarFretboard/constants";

export interface ControllersState {
  isPianoOn: boolean;
  togglePianoOn: () => void;

  visibleStrings: StringIndexes;
  setVisibleStrings: (strings: StringIndexes) => void;

  playback: boolean;
  togglePlayBackingtrack: () => void;
}

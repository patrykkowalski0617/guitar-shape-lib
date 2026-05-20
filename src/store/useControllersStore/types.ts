import type { StringIndexes } from "@/components/GuitarFretboard/constants";

export interface ControllersState {
  isPianoOn: boolean;
  togglePianoOn: () => void;

  visibleStrings: StringIndexes;
  setVisibleStrings: (strings: StringIndexes) => void;

  playback: boolean;
  togglePlayBackingtrack: () => void;

  lookAheadShapeBeatsAmount: number;
  setLookAheadShapeBeatsAmount: (lookAheadShapeBeatsAmount: number) => void;

  lookAheadTargetNoteBeatsAmount: number;
  setLookAheadTargetNoteBeatsAmount: (
    lookAheadShapeBeatsAmount: number,
  ) => void;
}

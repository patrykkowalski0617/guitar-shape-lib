import type { NoteName } from "@/data";
import type { NoteObject } from "@/utils";

export interface FretboardCellProps {
  noteObject: NoteObject;
  fretIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
  isBaseChordCell: boolean;
}

export interface UseFretboardCellProps {
  noteObject: NoteObject;
  isShapeCell: boolean;
}

export interface FretboardCellHandlers {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
  noteLabel: NoteName | null;
  isActiveNote: boolean;
}

import type { NoteName } from "@/data";
import type { NoteObject } from "@/utils";

export interface FretboardCellProps {
  noteObject: NoteObject;
  fretIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
  isBaseChordCell: boolean;
  isInNextTargetShape: boolean;
}

export interface UseFretboardCellProps {
  noteObject: NoteObject;
  isShapeCell: boolean;
  isInNextTargetShape: boolean;
}

export interface FretboardCellHandlers {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
  noteLabel: NoteName | null;
  isTargetNote: boolean;
  isActiveNote: boolean;
}

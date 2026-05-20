import type { FretboardCoordinate, NoteName } from "@/data";
import type { NoteObject } from "@/utils";

export interface FretboardCellProps {
  noteObject: NoteObject;
  fretIndex: number;
  stringIndex: number;
  isVisibleString: boolean;
  isShapeCell: boolean;
  isBaseChordCell: boolean;
  nextTargetShapeCoordinates: FretboardCoordinate[];
}

export interface UseFretboardCellProps {
  noteObject: NoteObject;
  isShapeCell: boolean;
  stringIndex: number;
  fretIndex: number;
  nextTargetShapeCoordinates: FretboardCoordinate[];
}

export interface FretboardCellHandlers {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
  noteLabel: NoteName | null;
  isTargetNote: boolean;
  isActiveNote: boolean;
}

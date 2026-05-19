import type { NoteObject } from "@/utils";
import type { FretboardCoordinate } from "@/data";
import type { StringValidIndex } from "../constants";

export interface FretboardRowProps {
  stringIndex: StringValidIndex;
  rowNotes: NoteObject[];
  guitarShapeCoordinates: FretboardCoordinate[];
  baseChordCoordinates: FretboardCoordinate[];
}

export interface IsShapeCellParams {
  guitarShapeCoordinates: FretboardCoordinate[];
  stringIndex: number;
  fretIndex: number;
}

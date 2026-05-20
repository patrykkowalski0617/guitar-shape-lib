import type {
  BaseChordDataKey,
  GuitarShapeDataKey,
  SharpNoteName,
  UnifiedMusicKeysDataKey,
} from "@/data";

export interface ShapePlayerBrick {
  id: string;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  guitarShapeDataKey: GuitarShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
  playLength: number;
  sliderRange?: [number, number];
  targetSharpNoteNames: SharpNoteName[];
}

interface ShapePlayerHistoryEntry {
  guitarShapePlayerBricks: ShapePlayerBrick[];
  type: "SINGLE_REMOVAL" | "CLEAN_ALL";
  originalIndex?: number;
}

export interface ShapePlayerState {
  exerciseTitle: string | null;
  guitarShapePlayerBricks: ShapePlayerBrick[];
  guitarShapePlayerHistory: ShapePlayerHistoryEntry[];
  setExerciseTitle: (exerciseTitle: string) => void;
  addShapePlayerBrick: (brickData: Omit<ShapePlayerBrick, "id">) => void;
  removeShapePlayerBrick: (id: string) => void;
  updateBrickRange: (id: string, sliderRange: [number, number]) => void;
  updateBrickTargetNotes: (
    id: string,
    targetSharpNoteNames: SharpNoteName[],
  ) => void;
  clearShapePlayerBricks: () => void;
  restoreLastAction: () => void;
  reorderShapePlayerBricks: (oldIndex: number, newIndex: number) => void;
  setBricks: (guitarShapePlayerBricks: ShapePlayerBrick[]) => void;
}

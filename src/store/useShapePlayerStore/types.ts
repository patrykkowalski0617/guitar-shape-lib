import type { Range } from "@/components/ui/MultiRangeSlider/MultiRangeSlider/useMultiRangeSlider";
import type {
  BaseChordDataKey,
  GuitarShapeDataKey,
  UnifiedMusicKeysDataKey,
} from "@/data";

export interface ShapePlayerBrick {
  id: string;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  isMajorMode: boolean;
  guitarShapeDataKey: GuitarShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
  playLength: number;
  sliderRange?: [number, number];
  targetNoteIndices?: number[];
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
  activeBrickId: null | string;
  setExerciseTitle: (setActiveBrickId: string) => void;
  setActiveBrickId: (activeBrickId: string) => void;
  addShapePlayerBrick: (brickData: Omit<ShapePlayerBrick, "id">) => void;
  removeShapePlayerBrick: (id: string) => void;
  updateBrick: (id: string, partialBrick: Partial<ShapePlayerBrick>) => void;
  clearShapePlayerBricks: () => void;
  restoreLastAction: () => void;
  reorderShapePlayerBricks: (oldIndex: number, newIndex: number) => void;
  setBricks: (guitarShapePlayerBricks: ShapePlayerBrick[]) => void;
  transposeShapePlayerBricks: (semitones: 1 | -1) => void;
  playbackRange: Range | null;
  setPlaybackRange: (playbackRange: Range | null) => void;
}

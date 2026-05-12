import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import type { Exact } from "@/types";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKeys,
} from "@/data";

export interface ShapePlayerBrick {
  id: string;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKeys;
  baseChordDataKey: BaseChordDataKey;
  shapeDataKey: ShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
}

interface ShapePlayerHistoryEntry {
  bricks: ShapePlayerBrick[];
  type: "SINGLE_REMOVAL" | "CLEAN_ALL";
  originalIndex?: number;
}

interface ShapePlayerState {
  shapePlayerBricks: ShapePlayerBrick[];
  shapePlayerHistory: ShapePlayerHistoryEntry[];
  addShapePlayerBrick: (
    unifiedKey: UnifiedMusicKeysDataKeys,
    baseChord: BaseChordDataKey,
    shapeDataKey: ShapeDataKey,
    semitoneOffsetFromMajorRoot: number,
  ) => void;
  removeShapePlayerBrick: (id: string) => void;
  clearShapePlayerBricks: () => void;
  restoreLastAction: () => void;
  reorderShapePlayerBricks: (oldIndex: number, newIndex: number) => void;
}

export const useShapePlayerStore = create<ShapePlayerState>((set) => ({
  shapePlayerBricks: [],
  shapePlayerHistory: [],

  addShapePlayerBrick: (
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    shapeDataKey,
    semitoneOffsetFromMajorRoot,
  ) => {
    const newBrick: Exact<ShapePlayerBrick, ShapePlayerBrick> = {
      id: crypto.randomUUID(),
      unifiedMusicKeysDataKey,
      baseChordDataKey,
      shapeDataKey,
      semitoneOffsetFromMajorRoot,
    };

    set((state) => ({
      shapePlayerBricks: [...state.shapePlayerBricks, newBrick],
      shapePlayerHistory: [],
    }));
  },

  removeShapePlayerBrick: (idToRemove) => {
    set((state) => {
      const brickIndex = state.shapePlayerBricks.findIndex(
        (b) => b.id === idToRemove,
      );
      const brickToRemove = state.shapePlayerBricks[brickIndex];

      const historyEntry: Exact<
        ShapePlayerHistoryEntry,
        ShapePlayerHistoryEntry
      > = {
        bricks: [brickToRemove],
        type: "SINGLE_REMOVAL",
        originalIndex: brickIndex,
      };

      return {
        shapePlayerBricks: state.shapePlayerBricks.filter(
          (b) => b.id !== idToRemove,
        ),
        shapePlayerHistory: [...state.shapePlayerHistory, historyEntry],
      };
    });
  },

  clearShapePlayerBricks: () => {
    set((state) => {
      if (state.shapePlayerBricks.length === 0) return state;

      const historyEntry: Exact<
        ShapePlayerHistoryEntry,
        ShapePlayerHistoryEntry
      > = {
        bricks: [...state.shapePlayerBricks],
        type: "CLEAN_ALL",
      };

      return {
        shapePlayerBricks: [],
        shapePlayerHistory: [...state.shapePlayerHistory, historyEntry],
      };
    });
  },

  restoreLastAction: () => {
    set((state) => {
      const lastEntry =
        state.shapePlayerHistory[state.shapePlayerHistory.length - 1];
      if (!lastEntry) return state;

      const updatedHistory = state.shapePlayerHistory.slice(0, -1);
      const updatedBricks = [...state.shapePlayerBricks];

      if (lastEntry.type === "CLEAN_ALL") {
        return {
          shapePlayerBricks: lastEntry.bricks,
          shapePlayerHistory: updatedHistory,
        };
      }

      const [restoredBrick] = lastEntry.bricks;
      updatedBricks.splice(lastEntry.originalIndex!, 0, restoredBrick);

      return {
        shapePlayerBricks: updatedBricks,
        shapePlayerHistory: updatedHistory,
      };
    });
  },

  reorderShapePlayerBricks: (oldIndex, newIndex) => {
    set((state) => ({
      shapePlayerBricks: arrayMove(state.shapePlayerBricks, oldIndex, newIndex),
    }));
  },
}));

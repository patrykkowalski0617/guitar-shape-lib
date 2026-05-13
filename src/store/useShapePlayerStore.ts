import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKey,
} from "@/data";

export interface ShapePlayerBrick {
  id: string;
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  shapeDataKey: ShapeDataKey;
  semitoneOffsetFromMajorRoot: number;
  playLength: number;
}

interface ShapePlayerHistoryEntry {
  bricks: ShapePlayerBrick[];
  type: "SINGLE_REMOVAL" | "CLEAN_ALL";
  originalIndex?: number;
}

interface ShapePlayerState {
  shapePlayerBricks: ShapePlayerBrick[];
  shapePlayerHistory: ShapePlayerHistoryEntry[];
  addShapePlayerBrick: (brickData: Omit<ShapePlayerBrick, "id">) => void;
  removeShapePlayerBrick: (id: string) => void;
  clearShapePlayerBricks: () => void;
  restoreLastAction: () => void;
  reorderShapePlayerBricks: (oldIndex: number, newIndex: number) => void;
}

export const useShapePlayerStore = create<ShapePlayerState>((set) => ({
  shapePlayerBricks: [],
  shapePlayerHistory: [],

  addShapePlayerBrick: (brickData) => {
    const newBrick: ShapePlayerBrick = {
      ...brickData,
      id: crypto.randomUUID(),
    };

    set((state) => ({
      shapePlayerBricks: [...state.shapePlayerBricks, newBrick],
      shapePlayerHistory: [],
    }));
  },

  removeShapePlayerBrick: (idToRemove) => {
    set((state) => {
      const brickIndex = state.shapePlayerBricks.findIndex(
        (brick) => brick.id === idToRemove,
      );

      const targetBrick = state.shapePlayerBricks[brickIndex];
      const hasBrick = brickIndex !== -1;

      if (!hasBrick) return state;

      const historyEntry: ShapePlayerHistoryEntry = {
        bricks: [targetBrick],
        type: "SINGLE_REMOVAL",
        originalIndex: brickIndex,
      };

      const updatedBricks = state.shapePlayerBricks.filter(
        (brick) => brick.id !== idToRemove,
      );

      return {
        shapePlayerBricks: updatedBricks,
        shapePlayerHistory: [...state.shapePlayerHistory, historyEntry],
      };
    });
  },

  clearShapePlayerBricks: () => {
    set((state) => {
      const isEmpty = state.shapePlayerBricks.length === 0;
      if (isEmpty) return state;

      const historyEntry: ShapePlayerHistoryEntry = {
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
      const lastEntry = state.shapePlayerHistory.at(-1);
      if (!lastEntry) return state;

      const remainingHistory = state.shapePlayerHistory.slice(0, -1);

      if (lastEntry.type === "CLEAN_ALL") {
        return {
          shapePlayerBricks: lastEntry.bricks,
          shapePlayerHistory: remainingHistory,
        };
      }

      const updatedBricks = [...state.shapePlayerBricks];
      const [restoredBrick] = lastEntry.bricks;
      const insertionIndex = lastEntry.originalIndex ?? 0;

      updatedBricks.splice(insertionIndex, 0, restoredBrick);

      return {
        shapePlayerBricks: updatedBricks,
        shapePlayerHistory: remainingHistory,
      };
    });
  },

  reorderShapePlayerBricks: (oldIndex, newIndex) => {
    set((state) => ({
      shapePlayerBricks: arrayMove(state.shapePlayerBricks, oldIndex, newIndex),
    }));
  },
}));

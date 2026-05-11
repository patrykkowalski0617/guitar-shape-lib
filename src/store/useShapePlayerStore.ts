import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

interface ShapePlayerState {
  shapePlayerBrickIds: string[];
  addShapePlayerBrick: () => void;
  removeShapePlayerBrick: (id: string) => void;
  reorderShapePlayerBricks: (oldIndex: number, newIndex: number) => void;
}

export const useShapePlayerStore = create<ShapePlayerState>((set) => ({
  shapePlayerBrickIds: [],
  addShapePlayerBrick: () => {
    const generatedId = crypto.randomUUID();

    set((state) => ({
      shapePlayerBrickIds: [...state.shapePlayerBrickIds, generatedId],
    }));
  },
  removeShapePlayerBrick: (idToRemove) => {
    set((state) => ({
      shapePlayerBrickIds: state.shapePlayerBrickIds.filter(
        (id) => id !== idToRemove,
      ),
    }));
  },
  reorderShapePlayerBricks: (oldIndex, newIndex) => {
    set((state) => ({
      shapePlayerBrickIds: arrayMove(
        state.shapePlayerBrickIds,
        oldIndex,
        newIndex,
      ),
    }));
  },
}));

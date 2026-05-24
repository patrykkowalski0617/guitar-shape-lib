/*********************
 - call this hook in FretboardCell and get returned isCoordinateSelected to mark clicked notes
 - all notes has relative fretIndex to the first clicked note fretIndex
 - every click copy all coordinates to clipboard
 - pushing R on keyboard clear view
 */

import { create } from "zustand";

type Coordinate = [number, number];

interface ShapeCoordinatesStore {
  coordinates: Coordinate[];
  addShapeCoordinate: (stringIndex: number, fretIndex: number) => void;
  isCoordinateSelected: (stringIndex: number, fretIndex: number) => boolean;
  reset: () => void;
}

const toRelative = (coordinates: Coordinate[]): Coordinate[] => {
  if (coordinates.length === 0) return [];
  const firstFret = coordinates[0][1];
  return coordinates
    .map(([s, f]) => [s, f - firstFret] as Coordinate)
    .sort(([s1, f1], [s2, f2]) => (s1 !== s2 ? s1 - s2 : f1 - f2));
};

export const useGettingShapeByClick = create<ShapeCoordinatesStore>(
  (set, get) => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => {
        if (e.key === "r" || e.key === "R") {
          get().reset();
        }
      });
    }

    return {
      coordinates: [],

      addShapeCoordinate: (stringIndex, fretIndex) => {
        set((state) => {
          const exists = state.coordinates.some(
            ([s, f]) => s === stringIndex && f === fretIndex,
          );

          const updated: Coordinate[] = exists
            ? state.coordinates.filter(
                ([s, f]) => !(s === stringIndex && f === fretIndex),
              )
            : [...state.coordinates, [stringIndex, fretIndex]];

          const relative = toRelative(updated);
          const formatted = JSON.stringify(relative).replace(/\],\[/g, "],[");

          navigator.clipboard.writeText(formatted).catch(console.error);

          return { coordinates: updated };
        });
      },

      isCoordinateSelected: (stringIndex, fretIndex) => {
        return get().coordinates.some(
          ([s, f]) => s === stringIndex && f === fretIndex,
        );
      },

      reset: () => set({ coordinates: [] }),
    };
  },
);

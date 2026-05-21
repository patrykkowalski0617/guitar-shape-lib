import type { FretboardCoordinate } from "@/data";

export const resolveAbsoluteFrets = <T>(
  items: T[],
  getCoords: (item: T) => FretboardCoordinate[],
  setCoords: (
    item: T,
    coords: FretboardCoordinate[],
    octaveOffset: number,
  ) => T,
  getBaseFret: (item: T) => number,
  absoluteOffset: number,
  octaveOffsets: number[],
  fretMin: number,
  fretMax: number,
) =>
  items.flatMap((item) => {
    const baseFret = getBaseFret(item) + absoluteOffset;

    return octaveOffsets
      .map((octaveOffset) => {
        const adjusted = getCoords(item).map(
          (coords) =>
            [
              coords[0],
              coords[1] + baseFret + octaveOffset,
            ] as FretboardCoordinate,
        );
        return {
          item: setCoords(item, adjusted, octaveOffset),
          adjustedBase: baseFret + octaveOffset,
        };
      })
      .filter(
        ({ adjustedBase }) =>
          adjustedBase >= fretMin && adjustedBase <= fretMax,
      )
      .map(({ item }) => item);
  });

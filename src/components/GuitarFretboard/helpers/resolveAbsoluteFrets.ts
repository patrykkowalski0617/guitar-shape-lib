import type { FretboardCoordinate } from "@/data";

export const resolveAbsoluteFrets = <T>(
  items: T[],
  getCoords: (item: T) => FretboardCoordinate[],
  setCoords: (item: T, coords: FretboardCoordinate[]) => T,
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
        return setCoords(item, adjusted);
      })
      .filter((s) =>
        getCoords(s).every(([, fret]) => fret >= fretMin && fret <= fretMax),
      );
  });

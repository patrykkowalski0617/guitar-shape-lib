import type { FretboardCoordinate } from "@/data";

export const addUniqueCoordinates = (
  target: FretboardCoordinate[],
  source: FretboardCoordinate[],
) => {
  const existingKeys = new Set(target.map(([s, f]) => `${s}-${f}`));
  source.forEach(([s, f]) => {
    const key = `${s}-${f}`;
    if (!existingKeys.has(key)) {
      target.push([s, f]);
      existingKeys.add(key);
    }
  });
};

import * as S from "./parts";
import { numberOfFrets } from "../constants";
import type { CAGED_System } from "@/data";

interface FretboardNumericMarkersProps {
  allCAGED_System: CAGED_System[];
  bestMatchCAGED_Systems: CAGED_System[];
}

export default function FretboardNumericMarkers({
  allCAGED_System,
  bestMatchCAGED_Systems,
}: FretboardNumericMarkersProps) {
  const infoCells = Array.from({ length: numberOfFrets });

  const fretToCAGED = new Map<number, string>();
  allCAGED_System.forEach(({ CAGED_NAME, baseFretIndex }) => {
    if (!fretToCAGED.has(baseFretIndex)) {
      fretToCAGED.set(baseFretIndex, CAGED_NAME);
    }
  });

  const bestMatchFretToCAGED = new Map<number, string>();
  const bestMatchFrets = new Set<number>();
  bestMatchCAGED_Systems.forEach(({ CAGED_NAME, baseFretIndex }) => {
    bestMatchFretToCAGED.set(baseFretIndex, CAGED_NAME);
    bestMatchFrets.add(baseFretIndex);
  });

  return (
    <S.FretboardNumericMarkers>
      {infoCells.map((_, index) => {
        const isBestMatch = bestMatchFrets.has(index);
        const cagedName =
          bestMatchFretToCAGED.get(index) ?? fretToCAGED.get(index);

        return (
          <S.Marker key={`info-${index}`} $isBestMatch={isBestMatch}>
            {cagedName}
          </S.Marker>
        );
      })}
    </S.FretboardNumericMarkers>
  );
}

import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import shapes from "@/utils/shapes";

export const STRING_MAP: Record<number, string> = {
  5: "strE",
  4: "strA",
  3: "strD",
  2: "strG",
};

let lastLocation = {
  shapeId: null as string | null,
  stringIdx: null as number | null,
  fretIdx: null as number | null,
};

export const useShapeVariantIterator = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const fretboardCoordinatesVariants = currentShapeId ? shapes[currentShapeId].fretboardCoordinatesVariants : null;

  const setNextShapeVariantLocationData = (stringIdx: number, fretIndex: number) => {
    if (!fretboardCoordinatesVariants) return;

    const stringId = STRING_MAP[stringIdx];
    const variantsOfCurrentString = fretboardCoordinatesVariants[stringId as keyof typeof fretboardCoordinatesVariants];

    if (variantsOfCurrentString) {
      const keys = Object.keys(variantsOfCurrentString);

      const isSameLocation =
        currentShapeId === lastLocation.shapeId &&
        stringIdx === lastLocation.stringIdx &&
        fretIndex === lastLocation.fretIdx;

      let nextIndex = 0;

      if (isSameLocation && currentShapeVariantLocationData) {
        const currentIndex = keys.indexOf(currentShapeVariantLocationData.variantId);
        nextIndex = (currentIndex + 1) % keys.length;
      } else {
        const externalIndex = currentShapeVariantLocationData
          ? keys.indexOf(currentShapeVariantLocationData.variantId)
          : -1;

        nextIndex = externalIndex !== -1 ? (externalIndex + 1) % keys.length : 0;
      }

      lastLocation = { shapeId: currentShapeId, stringIdx, fretIdx: fretIndex };

      const activeVariantId = keys[nextIndex];

      setCurrentShapeVariantLocationData({
        currentShapeId,
        stringId,
        fretIdx: fretIndex,
        variantId: activeVariantId,
      });
    }
  };

  return { setNextShapeVariantLocationData };
};

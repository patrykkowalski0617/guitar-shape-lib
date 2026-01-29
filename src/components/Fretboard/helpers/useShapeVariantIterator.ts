import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import shapes from "@/utils/shapes";

export const STRING_MAP: Record<number, string> = {
  5: "strE",
  4: "strA",
  3: "strD",
  2: "strG",
};

let currentStep = 0;
let lastLocation = {
  shapeId: null as string | null,
  stringIdx: null as number | null,
  fretIdx: null as number | null,
};

export const useShapeVariantIterator = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const setCurrentShapeVariantLocationData = useMusicStore(
    (state) => state.setCurrentShapeVariantLocationData,
  );

  const coordinatesVariants = currentShapeId ? shapes[currentShapeId].coordinatesVariants : null;

  const setNextShapeVariantLocationData = (stringIdx: number, fretIndex: number) => {
    if (!coordinatesVariants) return;

    const isSameLocation =
      currentShapeId === lastLocation.shapeId &&
      stringIdx === lastLocation.stringIdx &&
      fretIndex === lastLocation.fretIdx;

    if (!isSameLocation) {
      currentStep = 0;
      lastLocation = { shapeId: currentShapeId, stringIdx, fretIdx: fretIndex };
    }

    const stringId = STRING_MAP[stringIdx];
    const variantsOfCurrentString =
      coordinatesVariants[stringId as keyof typeof coordinatesVariants];

    if (variantsOfCurrentString) {
      const keys = Object.keys(variantsOfCurrentString);
      const activeVariantId = keys[currentStep % keys.length];

      setCurrentShapeVariantLocationData({
        currentShapeId,
        stringId,
        fretIdx: fretIndex,
        variantId: activeVariantId,
      });

      currentStep++;
    }
  };

  return {
    setNextShapeVariantLocationData,
  };
};

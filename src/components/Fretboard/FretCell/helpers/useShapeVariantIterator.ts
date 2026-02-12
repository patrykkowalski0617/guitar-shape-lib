import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import shapes from "@/utils/shapes";

export const STRING_MAP: Record<number, string> = {
  5: "strE",
  4: "strA",
  3: "strD",
  2: "strG",
};

export const useShapeVariantIterator = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const setNextShapeVariantLocationData = (stringIdx: number, fretIndex: number) => {
    if (!currentShapeId) return;

    const fretboardCoordinatesVariants = shapes[currentShapeId].fretboardCoordinatesVariants;
    const stringId = STRING_MAP[stringIdx];
    const variantsOfCurrentString = fretboardCoordinatesVariants[stringId as keyof typeof fretboardCoordinatesVariants];

    if (!variantsOfCurrentString) return;

    const variantKeys = Object.keys(variantsOfCurrentString);

    const isMatchingLocation =
      currentShapeVariantLocationData?.stringId === stringId &&
      currentShapeVariantLocationData?.fretIdx === fretIndex &&
      currentShapeVariantLocationData?.currentShapeId === currentShapeId;

    let nextIndex = 0;

    if (isMatchingLocation && currentShapeVariantLocationData) {
      const currentIndex = variantKeys.indexOf(currentShapeVariantLocationData.variantId);
      nextIndex = currentIndex !== -1 ? (currentIndex + 1) % variantKeys.length : 0;
    }

    const activeVariantId = variantKeys[nextIndex];

    setCurrentShapeVariantLocationData({
      currentShapeId,
      stringId,
      fretIdx: fretIndex,
      variantId: activeVariantId,
    });
  };

  return { setNextShapeVariantLocationData };
};

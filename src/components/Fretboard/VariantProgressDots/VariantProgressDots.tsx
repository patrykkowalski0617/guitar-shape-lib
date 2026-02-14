import * as S from "./parts";
import shapes from "@/utils/shapes";
import { STRING_MAP } from "../FretCell/helpers/useShapeVariantIterator";
import { useControlsStore } from "@/store/useControlsStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useMusicStore } from "@/store/useMusicStore";
import type { StringIndex } from "../FretboardRow/FretboardRow";

interface Props {
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function VariantProgressDots({ stringIndex, fretIndex }: Props) {
  const { learned, toggleLearned } = useProgressStore();
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const { currentShapeVariantLocationData, setCurrentShapeVariantLocationData } = useMusicStore();

  const stringId = STRING_MAP[stringIndex];
  const currentShape = currentShapeId ? shapes[currentShapeId] : null;
  const variants =
    currentShape?.fretboardCoordinatesVariants?.[stringId as keyof typeof currentShape.fretboardCoordinatesVariants];

  if (!variants || !currentShapeId) return null;

  const handleDotClick = (variantId: string, dotId: string, isActive: boolean) => () => {
    if (isActive) {
      toggleLearned(dotId);
      return;
    }

    setCurrentShapeVariantLocationData({
      currentShapeId,
      stringId,
      fretIdx: fretIndex,
      variantId,
    });
  };

  return (
    <S.DotsWrapper>
      {Object.entries(variants).map(([variantId]) => {
        const dotId = `${currentShapeId}-${stringId}-${variantId}`;

        const isActive =
          currentShapeVariantLocationData?.variantId === variantId &&
          currentShapeVariantLocationData?.fretIdx === fretIndex &&
          currentShapeVariantLocationData?.stringId === stringId;

        return (
          <S.Dot
            key={dotId}
            $isLearned={learned.includes(dotId)}
            $isActive={isActive}
            onClick={handleDotClick(variantId, dotId, isActive)}
          />
        );
      })}
    </S.DotsWrapper>
  );
}

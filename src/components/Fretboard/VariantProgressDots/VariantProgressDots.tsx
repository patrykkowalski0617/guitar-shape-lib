import * as S from "./parts";
import { STRING_MAP } from "../FretCell/helpers/useShapeVariantIterator";
import shapes from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";
import { useProgressStore } from "@/store/useProgressStore";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import { useMusicStore } from "@/store/useMusicStore";

export default function VariantProgressDots({
  stringIndex,
  fretIndex,
}: {
  stringIndex: StringIndex;
  fretIndex: number;
}) {
  const { learned } = useProgressStore();
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);

  const stringId = STRING_MAP[stringIndex];
  const fretboardCoordinatesVariants = currentShapeId ? shapes[currentShapeId].fretboardCoordinatesVariants : null;

  const variantsOfCurrentString = fretboardCoordinatesVariants?.[stringId as keyof typeof fretboardCoordinatesVariants];

  if (!variantsOfCurrentString) return null;

  return (
    <S.DotsWrapper>
      {Object.entries(variantsOfCurrentString).map(([variantKey]) => {
        const dotId = `${currentShapeId}-${stringId}-${variantKey}`;

        return (
          <S.Dot
            key={dotId}
            $isLearned={learned.includes(dotId)}
            $isActive={
              currentShapeVariantLocationData?.variantId === variantKey &&
              fretIndex === currentShapeVariantLocationData.fretIdx &&
              stringId === currentShapeVariantLocationData?.stringId
            }
          />
        );
      })}
    </S.DotsWrapper>
  );
}

import * as S from "./parts";
import { STRING_MAP } from "../helpers/useShapeVariantIterator";
import shapes from "@/utils/shapesNew";
import { useControlsStore } from "@/store/useControlsStore";
import { useCurrentShapeVariantProgressId } from "@/hooks/useCurrentShapeVariantProgressId";
import { useProgressStore } from "@/store/useProgressStore";

export const VariantProgressDots = ({ stringIndex }: { stringIndex: number }) => {
  const { learned } = useProgressStore();

  const currentVariantProgressId = useCurrentShapeVariantProgressId();

  const currentShapeId = useControlsStore((state) => state.currentShapeId);

  const stringId = STRING_MAP[stringIndex];
  const coordinatesVariants = currentShapeId ? shapes[currentShapeId].coordinatesVariants : null;

  const variantsOfCurrentString =
    coordinatesVariants?.[stringId as keyof typeof coordinatesVariants];

  if (!variantsOfCurrentString) return null;

  return (
    <S.DotsWrapper>
      {Object.entries(variantsOfCurrentString).map(([variantKey]) => {
        const dotId = `${currentShapeId}-${stringId}-${variantKey}`;
        return (
          <S.Dot
            key={dotId}
            $isLearned={learned.includes(dotId)}
            $isActive={currentVariantProgressId === dotId}
          />
        );
      })}
    </S.DotsWrapper>
  );
};

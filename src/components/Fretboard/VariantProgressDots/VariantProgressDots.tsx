import * as S from "./parts";
import { useProgressStore } from "@/store/useProgressStore";
import { useMusicStore } from "@/store/useMusicStore";
import { STRING_MAP } from "../helpers/useShapeVariantIterator";
import shapes from "@/utils/shapesNew";
import { useControlsStore } from "@/store/useControlsStore";

interface VariantProgressDotsProps {
  variants: { id: string }[];
  isCurrentActiveRoot: boolean;
  stringIndex: number;
}

export const VariantProgressDots = ({
  isCurrentActiveRoot,
  stringIndex,
}: VariantProgressDotsProps) => {
  const learned = useProgressStore((state) => state.learned);
  const learning = useProgressStore((state) => state.learning);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeVariantLocationData = useMusicStore(
    (state) => state.currentShapeVariantLocationData,
  );

  const stringKey = STRING_MAP[stringIndex];
  const coordinatesVariants = currentShapeId ? shapes[currentShapeId].coordinatesVariants : null;

  const variantsOfCurrentString =
    coordinatesVariants?.[stringKey as keyof typeof coordinatesVariants];

  if (!variantsOfCurrentString) return null;

  return (
    <S.DotsWrapper>
      {Object.entries(variantsOfCurrentString).map(([variantKey]) => {
        // const isLearned = learned.includes(v.id);
        // const isLearning = learning.includes(v.id);

        return (
          <S.Dot
            key={variantKey}
            $isLearned={false}
            $isLearning={false}
            $isActive={
              variantKey === currentShapeVariantLocationData?.variantId && isCurrentActiveRoot
            }
          />
        );
      })}
    </S.DotsWrapper>
  );
};

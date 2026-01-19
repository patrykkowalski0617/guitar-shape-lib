import * as S from "./parts";
import { useProgressStore } from "@/store/useProgressStore";
import { useMusicStore } from "@/store/useMusicStore";

interface VariantProgressDotsProps {
  variants: { id: string }[];
  isCurrentActiveRoot: boolean;
}

export const VariantProgressDots = ({
  variants,
  isCurrentActiveRoot,
}: VariantProgressDotsProps) => {
  const learned = useProgressStore((state) => state.learned);
  const learning = useProgressStore((state) => state.learning);
  const activeShapePoint = useMusicStore((state) => state.activeShapePoint);

  if (variants.length === 0) return null;

  return (
    <S.DotsWrapper>
      {variants.map((v, index) => {
        const isLearned = learned.includes(v.id);
        const isLearning = learning.includes(v.id);
        const isActiveVariant =
          isCurrentActiveRoot &&
          activeShapePoint &&
          activeShapePoint.variantIdx % variants.length === index;

        return (
          <S.Dot
            key={v.id}
            $isLearned={isLearned}
            $isLearning={isLearning}
            $isActive={!!isActiveVariant}
          />
        );
      })}
    </S.DotsWrapper>
  );
};

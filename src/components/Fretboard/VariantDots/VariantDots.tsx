import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as S from "./parts";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import { useVariantDots } from "./hooks/useVariantDots";

interface Props {
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function VariantDots({ stringIndex, fretIndex }: Props) {
  const {
    dots,
    isVisible,
    currentActiveValue,
    handleValueChange,
    handleMouseLeave,
  } = useVariantDots({ stringIndex, fretIndex });

  if (!isVisible) return null;

  return (
    <S.DotsWrapper
      type="single"
      value={currentActiveValue}
      onValueChange={handleValueChange}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={handleMouseLeave}
    >
      {dots.map((dot) => (
        <ToggleGroupPrimitive.Item
          key={dot.dotId}
          value={dot.variantId}
          asChild
        >
          <S.Dot
            as="button"
            $isActive={dot.isActive}
            $isUserList={dot.isUserList}
          >
            {dot.displayIndex}
          </S.Dot>
        </ToggleGroupPrimitive.Item>
      ))}
    </S.DotsWrapper>
  );
}

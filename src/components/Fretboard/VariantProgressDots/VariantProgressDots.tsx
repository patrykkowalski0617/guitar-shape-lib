import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as S from "./parts";
import { shapes } from "@/data";
import { useControlsStore } from "@/store/useControlsStore";
import { useProgressStore } from "@/store/useProgressStore";
import { useMusicStore } from "@/store/useMusicStore";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import { STRING_ID_MAP } from "../helpers/constants";
import { toast } from "sonner";

interface Props {
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function VariantProgressDots({ stringIndex, fretIndex }: Props) {
  const { learned, toggleLearned } = useProgressStore();
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const { currentShapeVariantLocationData, setCurrentShapeVariantLocationData } = useMusicStore();

  const stringId = STRING_ID_MAP[stringIndex];
  const currentShape = currentShapeId ? shapes[currentShapeId] : null;
  const variants =
    currentShape?.fretboardCoordinatesVariants?.[stringId as keyof typeof currentShape.fretboardCoordinatesVariants];

  if (!variants || !currentShapeId) return null;

  const activeVariantId = currentShapeVariantLocationData?.variantId;
  const isCorrectLocation =
    currentShapeVariantLocationData?.fretIndex === fretIndex && currentShapeVariantLocationData?.stringId === stringId;

  const handleToggleLearned = (dotId: string) => {
    const isAdding = !learned.includes(dotId);
    toggleLearned(dotId);

    toast(isAdding ? "Added to 'learned'." : "Removed from 'learned'.", {
      duration: 5000,
    });
  };

  const onValueChange = (newVariantId: string) => {
    if (!newVariantId) {
      if (activeVariantId && isCorrectLocation) {
        handleToggleLearned(`${currentShapeId}-${stringId}-${activeVariantId}`);
      }
      return;
    }

    setCurrentShapeVariantLocationData({
      shapeId: currentShapeId,
      stringId,
      fretIndex,
      variantId: newVariantId,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (e.currentTarget.contains(document.activeElement)) {
        (document.activeElement as HTMLElement).blur();
      }
    }
  };

  const clearFocus = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <S.DotsWrapper
      type="single"
      value={isCorrectLocation ? activeVariantId : ""}
      onValueChange={onValueChange}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      onMouseLeave={clearFocus}
    >
      {Object.entries(variants).map(([variantId], i) => {
        const dotId = `${currentShapeId}-${stringId}-${variantId}`;
        const isActive = activeVariantId === variantId && isCorrectLocation;
        const isLearned = learned.includes(dotId);

        return (
          <ToggleGroupPrimitive.Item key={dotId} value={variantId} asChild>
            <S.Dot as="button" $isLearned={isLearned} $isActive={isActive}>
              {i + 1}
            </S.Dot>
          </ToggleGroupPrimitive.Item>
        );
      })}
    </S.DotsWrapper>
  );
}

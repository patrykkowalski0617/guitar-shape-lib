import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as S from "./parts";
import { shapes, type StringVariants, type VariantId } from "@/data";
import { getValidVariants } from "@/utils";
import { useMusicStore, useProgressStore, useControlsStore, usePlayerStore } from "@/store";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import { STRING_ID_MAP } from "../helpers/constants";
import { toast } from "sonner";

interface Props {
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function VariantProgressDots({ stringIndex, fretIndex }: Props) {
  const { learned, toggleLearned } = useProgressStore();
  const shapeId = useControlsStore((state) => state.shapeId);
  const { shapeVariantLocationData, setShapeVariantLocationData } = useMusicStore();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const stringId = STRING_ID_MAP[stringIndex];
  const currentShape = shapeId ? shapes[shapeId] : null;
  const allVariants =
    currentShape?.fretboardCoordinatesVariants?.[stringId as keyof typeof currentShape.fretboardCoordinatesVariants];

  if (!allVariants || !shapeId) return null;

  const validVariants = getValidVariants(fretIndex, allVariants as StringVariants);

  if (validVariants.length === 0) return null;

  const activeVariantId = shapeVariantLocationData?.variantId;
  const isCorrectLocation =
    shapeVariantLocationData?.fretIndex === fretIndex && shapeVariantLocationData?.stringId === stringId;

  const handleToggleLearned = (dotId: string) => {
    const isAdding = !learned.includes(dotId);
    toggleLearned(dotId);
    toast(isAdding ? "Added to 'learned'." : "Removed from 'learned'.", { duration: 3000 });
  };

  const onValueChange = (newVariantId: VariantId) => {
    if (!newVariantId) {
      if (activeVariantId && isCorrectLocation) {
        handleToggleLearned(`${shapeId}-${stringId}-${activeVariantId}`);
      }
      return;
    }

    setShapeVariantLocationData({
      shapeId: shapeId,
      stringId,
      fretIndex,
      variantId: newVariantId,
    });
  };

  return (
    !isPlaying && (
      <S.DotsWrapper
        type="single"
        value={isCorrectLocation ? activeVariantId : ""}
        onValueChange={onValueChange}
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={() => {
          if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        }}
      >
        {validVariants.map(([variantId], i) => {
          const dotId = `${shapeId}-${stringId}-${variantId}`;
          const isActive = activeVariantId === variantId && isCorrectLocation;
          const isLearned = learned.includes(dotId);

          return (
            <ToggleGroupPrimitive.Item key={dotId} value={variantId} asChild>
              <S.Dot as="button" $isActive={isActive} $isLearned={isLearned}>
                {i + 1}
              </S.Dot>
            </ToggleGroupPrimitive.Item>
          );
        })}
      </S.DotsWrapper>
    )
  );
}

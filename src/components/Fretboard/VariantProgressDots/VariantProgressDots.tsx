import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as S from "./parts";
import { shapes, type StringVariants, type VariantId } from "@/data";
import { getValidVariants } from "@/utils";
import { useMusicStore, useProgressStore, useControlsStore, usePlayerStore } from "@/store";
import type { StringIndex } from "../FretboardRow/FretboardRow";
import { STRING_ID_MAP } from "../helpers/constants";
import { toast } from "sonner";
import { USER_LIST_MESSAGES } from "@/data/constants";

interface Props {
  stringIndex: StringIndex;
  fretIndex: number;
}

export default function VariantProgressDots({ stringIndex, fretIndex }: Props) {
  const { userList, toggleUserList } = useProgressStore();
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

  const handleToggleUserList = (dotId: string) => {
    const isAdding = !userList.includes(dotId);
    toggleUserList(dotId);
    toast(isAdding ? USER_LIST_MESSAGES.ADDED : USER_LIST_MESSAGES.REMOVED, { duration: 3000 });
  };

  const onValueChange = (newVariantId: VariantId) => {
    if (!newVariantId) {
      if (activeVariantId && isCorrectLocation) {
        handleToggleUserList(`${shapeId}-${stringId}-${activeVariantId}`);
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
          const isUserList = userList.includes(dotId);

          return (
            <ToggleGroupPrimitive.Item key={dotId} value={variantId} asChild>
              <S.Dot as="button" $isActive={isActive} $isUserList={isUserList}>
                {i + 1}
              </S.Dot>
            </ToggleGroupPrimitive.Item>
          );
        })}
      </S.DotsWrapper>
    )
  );
}

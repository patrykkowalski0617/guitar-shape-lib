import { shapes, type VariantId, type StringVariants } from "@/data";
import { getValidVariants } from "@/utils";
import {
  useMusicStore,
  useProgressStore,
  useControlsStore,
  usePlayerStore,
} from "@/store";
import type { StringIndex } from "../../FretboardRow/FretboardRow";
import { STRING_ID_MAP } from "../../helpers/constants";

interface UseVariantDotsParams {
  stringIndex: StringIndex;
  fretIndex: number;
}

export function useVariantDots({
  stringIndex,
  fretIndex,
}: UseVariantDotsParams) {
  const { userList } = useProgressStore();
  const shapeId = useControlsStore((state) => state.shapeId);
  const { shapeVariantLocationData, setShapeVariantLocationData } =
    useMusicStore();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const stringId = STRING_ID_MAP[stringIndex];
  const currentShape = shapeId ? shapes[shapeId] : null;
  const allVariants =
    currentShape?.fretboardCoordinatesVariants?.[
      stringId as keyof typeof currentShape.fretboardCoordinatesVariants
    ];

  const validVariants =
    shapeId && allVariants
      ? getValidVariants(fretIndex, allVariants as StringVariants)
      : [];

  const activeVariantId = shapeVariantLocationData?.variantId;
  const isCorrectLocation =
    shapeVariantLocationData?.fretIndex === fretIndex &&
    shapeVariantLocationData?.stringId === stringId;

  const currentActiveValue = isCorrectLocation ? activeVariantId : "";

  const handleValueChange = (newVariantId: VariantId) => {
    if (!newVariantId || !shapeId) return;

    setShapeVariantLocationData({
      shapeId,
      stringId,
      fretIndex,
      variantId: newVariantId,
    });
  };

  const handleMouseLeave = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const dots = validVariants.map(([variantId], index) => {
    const dotId = `${shapeId}-${stringId}-${variantId}`;
    const isActive = activeVariantId === variantId && isCorrectLocation;
    const isUserList = userList.includes(dotId);

    return {
      dotId,
      variantId,
      displayIndex: index + 1,
      isActive,
      isUserList,
    };
  });

  return {
    dots,
    isVisible: !isPlaying && dots.length > 0,
    currentActiveValue,
    handleValueChange,
    handleMouseLeave,
  };
}

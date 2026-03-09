import { useState } from "react";
import { useProgressStore, useMusicStore } from "@/store";
import { toast } from "sonner";
import { USER_LIST_MESSAGES } from "@/data/constants";
import type { ShapeLocation } from "../helpers/getOrderedShapeLocations";

interface UseStepSliderLogicProps {
  value: number[] | undefined;
  options: ShapeLocation[];
}

export function useStepSliderLogic({
  value,
  options,
}: UseStepSliderLogicProps) {
  const [highlightedId, setHighlightedId] = useState<string | number | null>(
    null,
  );

  const { userList, toggleUserList } = useProgressStore();
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );

  const currentValue = value?.[0] ?? 0;
  const effectiveMax = options.length;

  const handleToggleAction = () => {
    const isValueEmpty = currentValue === 0;
    if (isValueEmpty) return;

    const currentOption = options[currentValue - 1];
    if (!currentOption?.id) {
      toast(USER_LIST_MESSAGES.SELECT_PROMPT);
      return;
    }

    const compositeId = shapeVariantLocationData
      ? `${shapeVariantLocationData.shapeId}-${shapeVariantLocationData.stringId}-${shapeVariantLocationData.variantId}`
      : null;

    if (!compositeId) return;

    const isFavorite = userList.includes(compositeId);
    toggleUserList(compositeId);
    setHighlightedId(currentOption.id);

    const notification = isFavorite
      ? USER_LIST_MESSAGES.REMOVED
      : USER_LIST_MESSAGES.ADDED;
    toast(notification);
  };

  const clearHighlight = () => setHighlightedId(null);

  return {
    currentValue,
    effectiveMax,
    highlightedId,
    handleToggleAction,
    clearHighlight,
  };
}

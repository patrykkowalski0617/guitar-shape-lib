import { useControlsStore, useMusicStore } from "@/store";
import { isGlobalRole } from "@/utils";
import { useShapeOptions } from "./useShapeOptions";

const NONE_SHAPE_VALUE = "none";

export function useShapeSelection() {
  const roleId = useControlsStore((state) => state.roleId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );

  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  const options = useShapeOptions();

  const isShapeActive = shapeId !== null && shapeSemitoneOffsetFromC !== null;
  const currentShapeValue = isShapeActive
    ? `${shapeId}|${shapeSemitoneOffsetFromC}`
    : NONE_SHAPE_VALUE;

  const showNoneOption = isGlobalRole(roleId);

  const noneOptionLabel = "Solo shape";

  const applySelectedShape = (value: string) => {
    const [id, offsetStr] = value.split("|");
    const offset = parseInt(offsetStr, 10);
    setShape(id, offset);
  };

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);

    if (value === NONE_SHAPE_VALUE) {
      setShape(null, null);
      return;
    }

    applySelectedShape(value);
  };

  return {
    currentShapeValue,
    handleValueChange,
    options,
    noneOption: {
      shouldShow: showNoneOption,
      label: noneOptionLabel,
      value: NONE_SHAPE_VALUE,
    },
  };
}

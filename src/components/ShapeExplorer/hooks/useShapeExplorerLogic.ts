import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { getNotes } from "@/utils";
import { getOrderedShapeLocations } from "../helpers/getOrderedShapeLocations";

export const useShapeExplorerLogic = () => {
  const setIsShapeSliderHold = useControlsStore(
    (state) => state.setIsShapeSliderHold,
  );
  const shapeDataKey = useControlsStore((state) => state.shapeDataKey);
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitoneOffsetFromMajorTonicRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorTonicRoot,
  );
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );

  const notes = getNotes({ firstNote: unifiedMusicKeysDataKey });
  const rootNoteIndex =
    semitoneOffsetFromMajorTonicRoot !== null
      ? semitoneOffsetFromMajorTonicRoot % 12
      : null;
  const rootNoteName =
    rootNoteIndex !== null ? notes[rootNoteIndex].sharpNoteName : null;

  const options = getOrderedShapeLocations(shapeDataKey, rootNoteName);

  const matchingOptionIndex = shapeVariantDataKeys
    ? options.findIndex(
        (opt) =>
          opt.fretIndex === shapeVariantDataKeys.fretIndex &&
          opt.stringId === shapeVariantDataKeys.stringId &&
          opt.variantDataKey === shapeVariantDataKeys.variantDataKey,
      )
    : -1;

  const currentIndex = matchingOptionIndex !== -1 ? matchingOptionIndex + 1 : 0;

  const isDisabled = !shapeDataKey || options.length === 0;
  const sliderValue = isDisabled ? [0] : [currentIndex];
  const isVisible = !isPlaying;

  const handleValueChange = (values: number[]) => {
    const selectedValue = values[0];
    const newLocationData =
      selectedValue === 0 ? null : options[selectedValue - 1];
    // @ts-expect-error: Unreachable code error
    const { shapeDataKey, stringId, fretIndex, variantDataKey } =
      newLocationData;

    setShapeVariantDataKeys({
      shapeDataKey,
      stringId,
      fretIndex,
      variantDataKey,
    });
  };

  const handleMouseDown = () => {
    setIsShapeSliderHold(true);
  };
  const handleMouseUp = () => {
    setIsShapeSliderHold(false);
  };

  return {
    shapeDataKey,
    options,
    sliderValue,
    isDisabled,
    isVisible,
    handleValueChange,
    handleMouseDown,
    handleMouseUp,
  };
};

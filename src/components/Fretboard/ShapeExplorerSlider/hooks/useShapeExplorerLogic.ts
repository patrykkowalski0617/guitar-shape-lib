import {
  useControlsStore,
  useMusicStore,
  useProgressStore,
  usePlayerStore,
} from "@/store";
import { getNotes } from "@/utils";
import { getOrderedShapeLocations } from "../helpers/getOrderedShapeLocations";

export const useShapeExplorerLogic = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const { userList } = useProgressStore();
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  const notes = getNotes({ firstNote: tuneKeyId });
  const rootNoteIndex =
    shapeSemitoneOffsetFromC !== null ? shapeSemitoneOffsetFromC % 12 : null;
  const rootNoteName =
    rootNoteIndex !== null ? notes[rootNoteIndex].sharpNoteName : null;

  const options = getOrderedShapeLocations(shapeId, rootNoteName, userList);

  const matchingOptionIndex = shapeVariantLocationData
    ? options.findIndex(
        (opt) =>
          opt.fretIndex === shapeVariantLocationData.fretIndex &&
          opt.stringId === shapeVariantLocationData.stringId &&
          opt.variantId === shapeVariantLocationData.variantId,
      )
    : -1;

  const currentIndex = matchingOptionIndex !== -1 ? matchingOptionIndex + 1 : 0;

  const userListIndexes = options
    .map((opt, i) => (opt.isUserList ? i + 1 : null))
    .filter((v): v is number => v !== null);

  const isDisabled = !shapeId || options.length === 0;
  const sliderValue = isDisabled ? [0] : [currentIndex];
  const isVisible = !isPlaying;

  const handleValueChange = (values: number[]) => {
    const selectedValue = values[0];
    const newLocationData =
      selectedValue === 0 ? null : options[selectedValue - 1];
    setShapeVariantLocationData(newLocationData);
  };

  return {
    options,
    sliderValue,
    userListIndexes,
    isDisabled,
    isVisible,
    handleValueChange,
  };
};

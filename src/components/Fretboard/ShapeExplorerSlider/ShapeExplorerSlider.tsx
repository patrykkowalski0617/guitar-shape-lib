import {
  useControlsStore,
  useMusicStore,
  useProgressStore,
  usePlayerStore,
} from "@/store";
import { getNotes } from "@/utils";
import { getOrderedShapeLocations } from "./helpers/getOrderedShapeLocations";
import * as S from "./parts";
import { StepSlider } from "@/components/ui/StepSlider";

export default function ShapeExplorerSlider() {
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

  const rootNoteName =
    shapeSemitoneOffsetFromC !== null
      ? getNotes({ firstNote: tuneKeyId })[shapeSemitoneOffsetFromC % 12]
          .sharpNoteName
      : null;

  const options = getOrderedShapeLocations(shapeId, rootNoteName, userList);

  const foundIdx = shapeVariantLocationData
    ? options.findIndex(
        (opt) =>
          opt.fretIndex === shapeVariantLocationData.fretIndex &&
          opt.stringId === shapeVariantLocationData.stringId &&
          opt.variantId === shapeVariantLocationData.variantId,
      )
    : -1;

  const currentIndex = foundIdx !== -1 ? foundIdx + 1 : 0;

  const userListIndexes = options
    .map((opt, i) => (opt.isUserList ? i + 1 : null))
    .filter((v): v is number => v !== null);

  const disabled = !shapeId || options.length === 0;

  return (
    <S.ShapeExplorerWrapper $isVisible={!isPlaying}>
      <StepSlider
        key={disabled ? "disabled" : "enabled"}
        value={disabled ? [0] : [currentIndex]}
        max={options.length}
        step={1}
        userListIndexes={userListIndexes}
        onValueChange={(v) => {
          const val = v[0];
          setShapeVariantLocationData(val === 0 ? null : options[val - 1]);
        }}
        disabled={disabled}
      />
    </S.ShapeExplorerWrapper>
  );
}

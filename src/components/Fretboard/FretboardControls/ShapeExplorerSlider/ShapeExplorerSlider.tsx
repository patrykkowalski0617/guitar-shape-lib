import { useMemo } from "react";
import { useControlsStore, useMusicStore, useProgressStore, usePlayerStore } from "@/store";
import { getNotes } from "@/utils";
import { getOrderedShapeLocations } from "./helpers/getOrderedShapeLocations";
import { DiscreteSlider } from "@/components/ui/DiscreteSlider";
import * as S from "./parts";

export function ShapeExplorerSlider() {
  const shapeId = useControlsStore((state) => state.shapeId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore((state) => state.shapeSemitoneOffsetFromC);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const { learned } = useProgressStore();
  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);

  const rootNoteName = useMemo(() => {
    if (shapeSemitoneOffsetFromC === null) return null;
    return getNotes({ firstNote: tuneKeyId })[shapeSemitoneOffsetFromC % 12].sharpNoteName;
  }, [tuneKeyId, shapeSemitoneOffsetFromC]);

  const options = useMemo(
    () => getOrderedShapeLocations(shapeId, rootNoteName, learned),
    [shapeId, rootNoteName, learned],
  );

  const currentIndex = useMemo(() => {
    if (!shapeVariantLocationData) return 0;
    const foundIdx = options.findIndex(
      (opt) =>
        opt.fretIndex === shapeVariantLocationData.fretIndex &&
        opt.stringId === shapeVariantLocationData.stringId &&
        opt.variantId === shapeVariantLocationData.variantId,
    );
    return foundIdx !== -1 ? foundIdx + 1 : 0;
  }, [shapeVariantLocationData, options]);

  const learnedIndexes = useMemo(
    () => options.map((opt, i) => (opt.isLearned ? i + 1 : null)).filter((v): v is number => v !== null),
    [options],
  );
  const disabled = !shapeId || options.length === 0;

  return (
    <S.ShapeExplorerWrapper $isVisible={!isPlaying}>
      <DiscreteSlider
        key={disabled ? "disabled" : "enabled"}
        value={disabled ? [0] : [currentIndex]}
        max={options.length}
        step={1}
        learnedIndexes={learnedIndexes}
        onValueChange={(v) => {
          const val = v[0];
          setShapeVariantLocationData(val === 0 ? null : options[val - 1]);
        }}
        disabled={disabled}
      />
    </S.ShapeExplorerWrapper>
  );
}

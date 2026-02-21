import { useMemo } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { useProgressStore } from "@/store/useProgressStore";
import { getNotes } from "@/utils";
import { getOrderedShapeLocations } from "./helpers/getOrderedShapeLocations";
import { DiscreteSlider } from "@/components/ui/DiscreteSlider";
import * as S from "./parts";

export function ShapeExplorerSlider() {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const offset = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);

  const { learned } = useProgressStore();
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const rootNoteName = useMemo(() => {
    if (offset === null) return null;
    return getNotes({ firstNote: currentKeyId })[offset % 12].sharpNoteName;
  }, [currentKeyId, offset]);

  const options = useMemo(
    () => getOrderedShapeLocations(currentShapeId, rootNoteName, learned),
    [currentShapeId, rootNoteName, learned],
  );

  const currentIndex = useMemo(() => {
    if (!currentShapeVariantLocationData) return 0;
    const foundIdx = options.findIndex(
      (opt) =>
        opt.fretIndex === currentShapeVariantLocationData.fretIndex &&
        opt.stringId === currentShapeVariantLocationData.stringId &&
        opt.variantId === currentShapeVariantLocationData.variantId,
    );
    return foundIdx !== -1 ? foundIdx + 1 : 0;
  }, [currentShapeVariantLocationData, options]);

  const learnedIndexes = useMemo(
    () => options.map((opt, i) => (opt.isLearned ? i + 1 : null)).filter((v): v is number => v !== null),
    [options],
  );
  const disabled = !currentShapeId || options.length === 0;

  return (
    <S.Wrapper>
      <DiscreteSlider
        key={disabled ? "disabled" : "enabled"}
        value={disabled ? [0] : [currentIndex]}
        max={options.length}
        step={1}
        learnedIndexes={learnedIndexes}
        onValueChange={(v) => {
          const val = v[0];
          setCurrentShapeVariantLocationData(val === 0 ? null : options[val - 1]);
        }}
        disabled={disabled}
      />
    </S.Wrapper>
  );
}

import { useMemo, useState, useEffect, useRef } from "react";
import { useControlsStore, useMusicStore, useProgressStore, usePlayerStore } from "@/store";
import { getNotes } from "@/utils";
import { getOrderedShapeLocations } from "./helpers/getOrderedShapeLocations";
import { StepSlider } from "@/components/ui/StepSlider";
import * as S from "./parts";

export function ShapeExplorerSlider() {
  const shapeId = useControlsStore((state) => state.shapeId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore((state) => state.shapeSemitoneOffsetFromC);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const { learned } = useProgressStore();
  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);

  const [animatingIndexes, setAnimatingIndexes] = useState<number[]>([]);

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

  const prevLearnedIndexesRef = useRef<number[]>(learnedIndexes);
  const hasInitializedData = useRef(false);

  useEffect(() => {
    if (!hasInitializedData.current && learnedIndexes.length > 0) {
      prevLearnedIndexesRef.current = learnedIndexes;
      hasInitializedData.current = true;
      return;
    }

    const newlyAdded = learnedIndexes.filter((idx) => !prevLearnedIndexesRef.current.includes(idx));

    if (newlyAdded.length > 0 && hasInitializedData.current) {
      const frame = requestAnimationFrame(() => {
        setAnimatingIndexes(newlyAdded);
      });

      const timer = setTimeout(() => {
        setAnimatingIndexes([]);
      }, 600);

      prevLearnedIndexesRef.current = learnedIndexes;
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }

    prevLearnedIndexesRef.current = learnedIndexes;
  }, [learnedIndexes]);

  const disabled = !shapeId || options.length === 0;

  return (
    <S.ShapeExplorerWrapper $isVisible={!isPlaying}>
      <StepSlider
        value={disabled ? [0] : [currentIndex]}
        max={options.length}
        step={1}
        learnedIndexes={learnedIndexes}
        animatingIndexes={animatingIndexes}
        onValueChange={(v) => {
          const val = v[0];
          setShapeVariantLocationData(val === 0 ? null : options[val - 1]);
        }}
        disabled={disabled}
      />
    </S.ShapeExplorerWrapper>
  );
}

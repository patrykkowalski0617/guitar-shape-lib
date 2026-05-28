import { useMemo, useCallback, useEffect } from "react";
import { useShapePlayerStore } from "@/store";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";
import * as S from "./parts";

interface RangeValue {
  start: number;
  end: number;
}

export const BricksMultiRangeSlider = () => {
  const isListHasOneElement = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length < 2,
  );
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );
  const playbackRange = useShapePlayerStore((s) => s.playbackRange);
  const setPlaybackRange = useShapePlayerStore((s) => s.setPlaybackRange);

  const totalBricksCount = guitarShapePlayerBricks.length;

  const brickIndexes = useMemo(() => {
    const createIndexArray = (_: unknown, index: number) => index;
    return Array.from({ length: totalBricksCount }, createIndexArray);
  }, [totalBricksCount]);

  useEffect(() => {
    const hasNoBricks = totalBricksCount === 0;
    if (hasNoBricks) return;

    const isRangeUnset = !playbackRange;
    const isRangeOutOfBounds =
      playbackRange &&
      (playbackRange.end >= totalBricksCount ||
        playbackRange.start >= totalBricksCount);

    const shouldResetRange = isRangeUnset || isRangeOutOfBounds;

    if (shouldResetRange) {
      setPlaybackRange({
        start: 0,
        end: totalBricksCount - 1,
      });
    }
  }, [totalBricksCount, playbackRange, setPlaybackRange]);

  const handleChange = useCallback(
    ({ start, end }: RangeValue) => {
      setPlaybackRange({ start, end });
    },
    [setPlaybackRange],
  );

  const hasNoBricksToDisplay = totalBricksCount === 0;
  if (hasNoBricksToDisplay) return null;

  const activeRange = playbackRange ?? { start: 0, end: totalBricksCount - 1 };

  return (
    <S.MultiRangeSliderWrapper $isDisbled={isListHasOneElement}>
      <MultiRangeSlider
        values={brickIndexes}
        range={activeRange}
        onChange={handleChange}
        orientation="vertical"
      />
    </S.MultiRangeSliderWrapper>
  );
};

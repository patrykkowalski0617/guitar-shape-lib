import { useMemo, useCallback, useEffect } from "react";
import { useShapePlayerStore } from "@/store";
import MultiRangeSlider from "@/components/ui/MultiRangeSlider/MultiRangeSlider/MultiRangeSlider";

interface RangeValue {
  start: number;
  end: number;
}

export const BricksMultiRangeSlider = () => {
  const guitarShapePlayerBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks,
  );
  const playbackRange = useShapePlayerStore((state) => state.playbackRange);
  const setPlaybackRange = useShapePlayerStore(
    (state) => state.setPlaybackRange,
  );

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
    <MultiRangeSlider
      values={brickIndexes}
      range={activeRange}
      onChange={handleChange}
      orientation="vertical"
    />
  );
};

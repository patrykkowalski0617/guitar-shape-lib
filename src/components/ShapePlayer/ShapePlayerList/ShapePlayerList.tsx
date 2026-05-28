import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShapePlayerStore } from "@/store";
import { ShapePlayerBrick } from "../ShapePlayerBrick/ShapePlayerBrick";
import * as S from "./parts";
import { usePlayingBricksEngine } from "./hooks/usePlayingBricksEngine";
import { BricksMultiRangeSlider } from "../BricksMultiRangeSlider/BricksMultiRangeSlider";
import { UNIFIED_MUSIC_KEYS } from "@/data";

export const ShapePlayerList = () => {
  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );
  const brickIds = guitarShapePlayerBricks.map((b) => b.id);
  const playbackRange = useShapePlayerStore((s) => s.playbackRange);

  usePlayingBricksEngine();

  return (
    <S.ShapePlayerListWrapper>
      <S.BricksMultiRangeSliderWraprer>
        <BricksMultiRangeSlider />
      </S.BricksMultiRangeSliderWraprer>
      <SortableContext items={brickIds} strategy={verticalListSortingStrategy}>
        <S.ShapePlayerBricksList>
          {guitarShapePlayerBricks.map((guitarShapePlayerBrick, index) => {
            const isWithinRange = playbackRange
              ? index >= playbackRange.start && index <= playbackRange.end
              : true;

            const key =
              UNIFIED_MUSIC_KEYS[
                guitarShapePlayerBrick.unifiedMusicKeysDataKey
              ];
            const currentKeyLabel = `${key.majorName}/${key.relativeMinorName}/${guitarShapePlayerBrick.isMajorMode}`;
            const prevBrick = guitarShapePlayerBricks[index - 1];
            const prevKey = prevBrick
              ? UNIFIED_MUSIC_KEYS[prevBrick.unifiedMusicKeysDataKey]
              : null;
            const prevKeyLabel = prevKey
              ? `${prevKey.majorName}/${prevKey.relativeMinorName}/${prevBrick.isMajorMode}`
              : null;
            const isDuplicateKey = currentKeyLabel === prevKeyLabel;

            return (
              <ShapePlayerBrick
                key={guitarShapePlayerBrick.id}
                id={guitarShapePlayerBrick.id}
                isWithinRange={isWithinRange}
                isDuplicateKey={isDuplicateKey}
              />
            );
          })}
        </S.ShapePlayerBricksList>
      </SortableContext>
    </S.ShapePlayerListWrapper>
  );
};

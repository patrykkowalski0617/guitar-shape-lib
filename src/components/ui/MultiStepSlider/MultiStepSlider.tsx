import * as S from "./parts";
import { type MultiStepSliderProps } from "./constants";
import { useMultiStepSliderLogic } from "./hooks/useMultiStepSliderLogic";
import { calculatePercent } from "./utils";
import { InteractionZone } from "./InteractionZone";

export function MultiStepSlider(props: MultiStepSliderProps) {
  const {
    trackRef,
    sortedValues,
    firstVal,
    lastVal,
    range,
    isVertical,
    isDragging,
    previewValue,
    setPreviewValue,
    handleTrackPointerDown,
    handlePointerMove,
    handleThumbPointerDown,
    handleCutStart,
    handleCutEnd,
  } = useMultiStepSliderLogic(props);

  const {
    max,
    min = 0,
    thumbSize = 32,
    disabled = false,
    effectiveMax,
    onBeforeValueChange,
  } = props;
  const limitValue = effectiveMax ?? max;

  return (
    <S.SliderRoot
      $isVertical={isVertical}
      onPointerDown={handleTrackPointerDown(disabled || isDragging)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPreviewValue(null)}
    >
      <S.SliderTrack
        ref={trackRef}
        $isVertical={isVertical}
        $thumbSize={thumbSize}
      >
        {Array.from({ length: limitValue + 1 }, (_, i) => (
          <S.Tick
            key={i}
            $tickPos={(i / limitValue) * 100}
            $isVertical={isVertical}
          />
        ))}

        {previewValue && !isDragging && (
          <S.SliderThumb
            $isVertical={isVertical}
            $startPos={calculatePercent(Math.min(...previewValue), min, range)}
            $totalWidth={calculatePercent(
              Math.max(...previewValue) - Math.min(...previewValue),
              0,
              range,
            )}
            $thumbSize={thumbSize}
            $isPreview
          />
        )}

        <S.SliderThumb
          onPointerDown={handleThumbPointerDown}
          $isVertical={isVertical}
          $startPos={calculatePercent(firstVal, min, range)}
          $totalWidth={calculatePercent(lastVal - firstVal, 0, range)}
          $thumbSize={thumbSize}
          $isDragging={isDragging}
          $hasActivePreview={!!previewValue && !isDragging}
        >
          <S.InteractionContainer
            $isVertical={isVertical}
            $thumbSize={thumbSize}
            $isDragging={isDragging}
          >
            {sortedValues.map((val, index) => (
              <InteractionZone
                key={val}
                val={val}
                index={index}
                total={sortedValues.length}
                {...{
                  isVertical,
                  thumbSize,
                  firstVal,
                  lastVal,
                  onBeforeValueChange,
                  handleCutStart,
                  handleCutEnd,
                  setPreviewValue,
                }}
              />
            ))}
          </S.InteractionContainer>
        </S.SliderThumb>
      </S.SliderTrack>
    </S.SliderRoot>
  );
}

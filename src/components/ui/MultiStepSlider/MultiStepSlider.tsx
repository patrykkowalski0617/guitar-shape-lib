import * as S from "./parts";
import { type MultiStepSliderProps } from "./constants";
import { useMultiStepSliderLogic } from "./hooks/useMultiStepSliderLogic";
import { calculatePercent } from "./utils";
import { RangeChangeZone } from "./RangeChangeZone/RangeChangeZone";

export function MultiStepSlider(props: MultiStepSliderProps) {
  const {
    trackRef,
    firstVal,
    lastVal,
    sliderRange,
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
            $startPos={calculatePercent(
              Math.min(...previewValue),
              min,
              sliderRange,
            )}
            $totalWidth={calculatePercent(
              Math.max(...previewValue) - Math.min(...previewValue),
              0,
              sliderRange,
            )}
            $thumbSize={thumbSize}
            $isPreview
          />
        )}

        <S.SliderThumb
          onPointerDown={handleThumbPointerDown}
          $isVertical={isVertical}
          $startPos={calculatePercent(firstVal, min, sliderRange)}
          $totalWidth={calculatePercent(lastVal - firstVal, 0, sliderRange)}
          $thumbSize={thumbSize}
          $isDragging={isDragging}
          $hasActivePreview={!!previewValue && !isDragging}
        />

        <RangeChangeZone
          limitValue={limitValue}
          isVertical={isVertical}
          thumbSize={thumbSize}
          isDragging={isDragging}
          firstVal={firstVal}
          lastVal={lastVal}
          disabled={disabled}
          onBeforeValueChange={onBeforeValueChange}
          handleCutStart={handleCutStart}
          handleCutEnd={handleCutEnd}
          setPreviewValue={setPreviewValue}
          handleTrackPointerDown={handleTrackPointerDown}
        />
      </S.SliderTrack>
    </S.SliderRoot>
  );
}

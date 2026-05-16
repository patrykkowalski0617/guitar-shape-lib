import React from "react";
import * as S from "./parts";
import { useMultiSlider } from "./useMultiSlider";
import { SegmentedRangeSlider } from "../SegmentedRangeSlider/SegmentedRangeSlider";

export const MultiSlider: React.FC = () => {
  const {
    ranges,
    configs,
    masterValues,
    masterRange,
    onMasterChange,
    onSliderAChange,
    onSliderBChange,
  } = useMultiSlider();

  return (
    <S.Container>
      <S.Label>Master</S.Label>
      <SegmentedRangeSlider
        values={masterValues}
        range={masterRange}
        onChange={onMasterChange}
      />
      <S.Divider />
      <S.Label>A</S.Label>
      <SegmentedRangeSlider
        values={configs.A}
        range={ranges.A}
        onChange={onSliderAChange}
      />
      <S.Label>B</S.Label>
      <SegmentedRangeSlider
        values={configs.B}
        range={ranges.B}
        onChange={onSliderBChange}
      />
    </S.Container>
  );
};

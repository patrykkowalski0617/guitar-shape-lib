import { type JSX } from "react";
import * as S from "./parts";
import { useControlsStore } from "@/store/useControlsStore";
import { numberOfKeys, firstAIndex } from "../helpers/constants";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { getHighlightMusicFuntion } from "../helpers/scaleLogic";

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const activeScaleSteps = useControlsStore((state) => state.activeScaleSteps);
  const currentMusicFunctionId = useControlsStore((state) => state.currentMusicFunctionId);

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  return (
    <S.TemplateWrapper
      $firstAIndex={firstAIndex}
      $numberOfKeys={numberOfKeys}
      $templateOffset={templateOffset}
    >
      {activeScaleSteps.map((step, index, arr) => (
        <S.Marker
          key={`${step}-${index}`}
          $step={step}
          $numberOfKeys={numberOfKeys}
          $isVisible={isMajorMode ? index >= 2 : index <= arr.length - 3}
          $isHarmonicMinor={!isMajorMode && index % 7 === 6}
          $isHighlightMusicFunction={getHighlightMusicFuntion(
            index,
            isMajorMode,
            currentMusicFunctionId
          )}
        />
      ))}
    </S.TemplateWrapper>
  );
}

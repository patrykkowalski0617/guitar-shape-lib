import { type JSX } from "react";
import * as S from "./parts";
import { useMusicStore } from "@/store/useMusicStore";
import { numberOfKeys, firstAIndex } from "../helpers/constants";
import { UNIFIED_MUSIC_KEYS } from "@/utils";

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const activeScaleSteps = useMusicStore((state) => state.activeScaleSteps);
  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  return (
    <S.TemplateWrapper
      $firstAIndex={firstAIndex}
      $numberOfKeys={numberOfKeys}
      $templateOffset={templateOffset}
    >
      {activeScaleSteps.map((step, index, arr) => (
        <S.Marker
          key={step}
          $step={step}
          $numberOfKeys={numberOfKeys}
          $isVisible={isMajorMode ? index >= 2 : index <= arr.length - 3}
          $isHarmonicMinor={!isMajorMode && (index === 6 || index === 13)}
        />
      ))}
    </S.TemplateWrapper>
  );
}

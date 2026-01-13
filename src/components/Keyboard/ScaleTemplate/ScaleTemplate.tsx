import { type JSX } from "react";
import * as S from "./parts";
import { useMusicStore } from "@/store/useMusicStore";
import { numberOfKeys, firstAIndex } from "../helpers/constants";
import { MINOR_MAJOR_TEMPLATE_STEPS, UNIFIED_MUSIC_KEYS } from "@/utils";

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  return (
    <S.TemplateWrapper
      $firstAIndex={firstAIndex}
      $numberOfKeys={numberOfKeys}
      $templateOffset={templateOffset}
    >
      {MINOR_MAJOR_TEMPLATE_STEPS.map((step, index) => (
        <S.Marker
          key={step}
          $step={step}
          $numberOfKeys={numberOfKeys}
          $isVisible={isMajorMode ? index >= 2 : index <= 6}
          $isHarmonicMinor={!isMajorMode && index === 6}
        />
      ))}
    </S.TemplateWrapper>
  );
}

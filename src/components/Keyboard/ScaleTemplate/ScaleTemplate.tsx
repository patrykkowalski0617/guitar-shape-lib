import { type JSX } from "react";
import * as S from "./parts";
import { useMusicStore } from "@/store/useMusicStore";
import { numberOfKeys, firstAIndex } from "../helpers/constants";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { getHighlightRole } from "../helpers/scaleLogic";

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const activeScaleSteps = useMusicStore((state) => state.activeScaleSteps);
  const currentMusicFunctionId = useMusicStore((state) => state.currentMusicFunctionId);
  const expansionTimeoutId = useMusicStore((state) => state.expansionTimeoutId); // <--- DODANE

  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;
  const isExpanded = expansionTimeoutId !== null;

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
          $isHighlightRole={getHighlightRole(
            index,
            isMajorMode,
            currentMusicFunctionId,
            isExpanded
          )}
        />
      ))}
    </S.TemplateWrapper>
  );
}

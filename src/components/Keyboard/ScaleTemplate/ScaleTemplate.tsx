import { type JSX } from "react";
import * as S from "./parts";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { numberOfKeys, firstAIndex } from "../helpers/constants";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { getHighlightRole } from "../helpers/scaleLogic";

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const activeScaleSteps = useMusicStore((state) => state.activeScaleSteps);
  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;
  let roleCounter = 0;

  return (
    <S.TemplateWrapper
      $firstAIndex={firstAIndex}
      $numberOfKeys={numberOfKeys}
      $templateOffset={templateOffset}
    >
      {activeScaleSteps.map((step, index, arr) => {
        const role = getHighlightRole(index, isMajorMode, currentRoleId);
        const intervalLabel = role !== "none" ? `${roleCounter++ * 2 + 1}` : "";
        return (
          <S.Marker
            key={`${step}-${index}`}
            $step={step}
            $numberOfKeys={numberOfKeys}
            $isVisible={isMajorMode ? index >= 2 : index <= arr.length - 3}
            $isHarmonicMinor={!isMajorMode && index % 7 === 6 && currentRoleId === "dominant"}
            $isHighlightRole={role}
            $roleInterval={intervalLabel}
          />
        );
      })}
    </S.TemplateWrapper>
  );
}

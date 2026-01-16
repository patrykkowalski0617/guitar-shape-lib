import { type JSX } from "react";
import * as S from "./parts";
import { useControlsStore } from "@/store/useControlsStore";
import { numberOfKeys, firstAIndex } from "../helpers/constants";
import { UNIFIED_MUSIC_KEYS } from "@/utils";
import { useActiveScale } from "@/hooks/useActiveScale/useActiveScale";

export default function ScaleTemplate(): JSX.Element {
  const { fullScaleMetadata } = useActiveScale();
  const { currentKeyId } = useControlsStore();
  const templateOffset = UNIFIED_MUSIC_KEYS[currentKeyId].offsetFromC;

  return (
    <S.TemplateWrapper
      $firstAIndex={firstAIndex}
      $numberOfKeys={numberOfKeys}
      $templateOffset={templateOffset}
    >
      {fullScaleMetadata.map((meta) => (
        <S.Marker
          key={meta.index}
          $step={meta.adjustedStep}
          $numberOfKeys={numberOfKeys}
          $isVisible={meta.isVisible}
          $isHighlightRole={meta.role}
          $roleInterval={meta.intervalLabel}
        />
      ))}
    </S.TemplateWrapper>
  );
}

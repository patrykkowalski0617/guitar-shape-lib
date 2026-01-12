import { type JSX } from "react";
import * as S from "./parts";
import { useMusicStore } from "@/store/useMusicStore";
import { numberOfKeys, firstAIndex } from "../constants";

const TEMPLATE_STEPS = [0, 2, 3, 5, 7, 8, 10, 12, 14];

export default function ScaleTemplate(): JSX.Element {
  const isMajorMode = useMusicStore((state) => state.isMajorMode);

  return (
    <S.TemplateWrapper $firstAIndex={firstAIndex} $numberOfKeys={numberOfKeys}>
      {TEMPLATE_STEPS.map((step, index) => (
        <S.Marker
          key={step}
          $step={step}
          $numberOfKeys={numberOfKeys}
          $isVisible={isMajorMode ? index >= 2 : index <= 6}
          $isHarmonicG={!isMajorMode && index === 6}
        />
      ))}
    </S.TemplateWrapper>
  );
}

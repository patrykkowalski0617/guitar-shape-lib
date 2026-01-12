import { type JSX } from "react";
import * as S from "./parts";
import { useMusicStore } from "@/store/useMusicStore";
import { keysOffset, numberOfKeys } from "../constants";

export default function ScaleTemplate(): JSX.Element {
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const firstAIndex = Array.from({ length: 12 }).findIndex((_, i) => (i + keysOffset) % 12 === 9);

  const templateSteps = [0, 2, 3, 5, 7, 8, 10, 12, 14];

  return (
    <S.TemplateWrapper $firstAIndex={firstAIndex} $numberOfKeys={numberOfKeys}>
      {templateSteps.map((step, index) => (
        <S.Marker
          key={index}
          $step={step}
          $numberOfKeys={numberOfKeys}
          $isVisible={isMajorMode ? index >= 2 : index <= 6}
          $isHarmonicG={!isMajorMode && index === 6}
        />
      ))}
    </S.TemplateWrapper>
  );
}

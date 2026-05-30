import { type RefObject, type JSX } from "react";
import * as S from "./parts";
import { useStringGlow } from "./useStringGlow";

interface StringGlowProps {
  isVisibleString: boolean;
  rowRef: RefObject<HTMLDivElement | null>;
}

export default function StringGlow({
  isVisibleString,
  rowRef,
}: StringGlowProps): JSX.Element {
  const containerRef = useStringGlow(isVisibleString, rowRef);

  return <S.GlowContainer ref={containerRef} />;
}

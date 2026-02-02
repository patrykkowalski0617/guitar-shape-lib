import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

export const highlightedColor = "var(--muted-foreground)";
export const unHighlightedColor = "var(--muted)";

const BaseLabel = styled.div<{
  $areAnimationsOn: boolean;
  $isHighlighted: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  color: ${unHighlightedColor};
  will-change: opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn ? `opacity ${transitionTime}ms ease-in-out` : "none"};
`;

export const LabelWrapperBase = css<{ $areAnimationsOn: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LabelStatusProps {
  $isEnharmonicNote: boolean;
  $isFlatTune: boolean;
}

export const MainLabel = styled(BaseLabel)<LabelStatusProps>`
  opacity: ${({ $isEnharmonicNote, $isFlatTune }) => (!$isEnharmonicNote || !$isFlatTune ? 1 : 0)};
`;

export const OptionalLabel = styled(BaseLabel)<LabelStatusProps>`
  opacity: ${({ $isFlatTune }) => ($isFlatTune ? 1 : 0)};
`;

import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

export type LabelOrientation = "vertical" | "horizontal";

interface StyledNoteLabelProps {
  $isFlatTune: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
  $orientation: LabelOrientation;
  $isShapeNote: boolean;
  $areAnimationsOn: boolean;
}

const highlightedColor = "var(--muted-foreground)";
const unHighlightedColor = "var(--muted)";

const getStaticStyles = (isHighlighted: boolean) => css`
  font-size: 12px;
  height: 20px;
  line-height: 1;
  font-weight: bold;
  color: ${isHighlighted ? highlightedColor : unHighlightedColor};
`;

const getLabelStyles = (
  isActive: boolean,
  isHighlighted: boolean,
  multiplier: number,
  orientation: LabelOrientation,
  isShapeNote: boolean,
) => {
  const y = isActive ? 10 * multiplier : -5 * multiplier;
  const x = isActive ? 5 * multiplier : -4 * multiplier;
  const transform = orientation === "vertical" ? `translateY(${y}px)` : `translate(${x}px, 0)`;
  const shouldHighlight =
    (isActive && isHighlighted) || (orientation === "vertical" && isShapeNote);

  return css`
    height: 20px;
    line-height: 1;
    font-size: ${isActive ? "12px" : "9px"};
    color: ${shouldHighlight ? highlightedColor : unHighlightedColor};
    opacity: ${isActive ? 1 : 0};
    font-weight: ${isActive ? "bold" : "normal"};
    transform: ${transform};
  `;
};

export const Wrapper = styled.div<StyledNoteLabelProps>`
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $orientation }) => ($orientation === "vertical" ? "column" : "row")};
  height: ${({ $orientation }) => ($orientation === "vertical" ? "40px" : "20px")};
  width: ${({ $orientation }) => ($orientation === "vertical" ? "auto" : "30px")};
  top: ${({ $orientation, $isShapeNote }) =>
    $orientation === "vertical" && $isShapeNote ? "20px" : "0"};
  will-change: top;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn ? `top ${transitionTime}ms ease-in-out` : "none"};
  .mainLabel,
  .optionalLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform, opacity, font-size, color;
    transition: ${({ $areAnimationsOn }) =>
      $areAnimationsOn
        ? `transform ${transitionTime}ms ease-in-out, 
           opacity ${transitionTime}ms ease-in-out, 
           font-size ${transitionTime}ms ease-in-out, 
           color ${transitionTime}ms ease-in-out`
        : "none"};
  }

  .mainLabel {
    ${({ $isFlatTune, $isEnharmonicNote, $isHighlighted, $orientation, $isShapeNote }) =>
      !$isEnharmonicNote
        ? getStaticStyles($isHighlighted)
        : getLabelStyles(!$isFlatTune, $isHighlighted, 1, $orientation, $isShapeNote)}
  }

  .optionalLabel {
    ${({ $isFlatTune, $isHighlighted, $orientation, $isShapeNote }) =>
      getLabelStyles($isFlatTune, $isHighlighted, -1, $orientation, $isShapeNote)}
  }
`;

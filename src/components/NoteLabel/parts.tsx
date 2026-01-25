import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

export type LabelOrientation = "vertical" | "horizontal";

interface StyledNoteLabelProps {
  $isFlatTune: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
  $orientation: LabelOrientation;
  $isShapeNote: boolean;
  $isTuneNote: boolean;
  $areAnimationsOn: boolean;
}

const highlightedColor = "var(--muted-foreground)";
const unHighlightedColor = "var(--muted)";

const getStaticStyles = (isHighlighted: boolean) => css`
  color: ${isHighlighted ? highlightedColor : unHighlightedColor};
`;

const getLabelStyles = (
  isActive: boolean,
  isHighlighted: boolean,
  multiplier: number,
  orientation: LabelOrientation,
  isShapeNote: boolean,
) => {
  const y = isActive ? 9 * multiplier : -5 * multiplier;
  const x = isActive ? 8 * multiplier : -4 * multiplier;
  const transform = orientation === "vertical" ? `translateY(${y}px)` : `translate(${x}px, 0)`;
  const shouldHighlight =
    (isActive && isHighlighted) || (orientation === "vertical" && isShapeNote);

  return css`
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
  height: ${({ $orientation }) => ($orientation === "vertical" ? "30px" : "20px")};
  width: ${({ $orientation }) => ($orientation === "vertical" ? "auto" : "30px")};
  top: ${({ $orientation, $isShapeNote }) =>
    $orientation === "vertical" && $isShapeNote ? "20px" : "0"};
  opacity: ${({ $isHighlighted, $orientation, $isTuneNote, $isShapeNote }) =>
    $isShapeNote ||
    ($isHighlighted && $orientation === "vertical") ||
    ($isTuneNote && $orientation === "horizontal")
      ? "1"
      : "0"};
  will-change: top, opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn
      ? `opacity ${transitionTime}ms ease-in-out ,top ${transitionTime}ms ease-in-out`
      : "none"};
  .mainLabel,
  .optionalLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 2;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    font-weight: bold;
    ${({ $orientation }) =>
      $orientation === "vertical" &&
      css`
        background: #000000bb;
        box-shadow: 0 0 8px var(--background);
      `}
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

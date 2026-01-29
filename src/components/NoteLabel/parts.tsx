import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

export type LabelOrientation = "keyboard" | "fretboard";

interface StyledNoteLabelProps {
  $isFlatTune: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
  $targetComponent: LabelOrientation;
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
  targetComponent: LabelOrientation,
  isShapeNote: boolean,
) => {
  const y = isActive ? 9 * multiplier : -5 * multiplier;
  const x = isActive ? 8 * multiplier : -4 * multiplier;
  const transform = targetComponent === "keyboard" ? `translateY(${y}px)` : `translate(${x}px, 0)`;
  const shouldHighlight =
    (isActive && isHighlighted) || (targetComponent === "keyboard" && isShapeNote);

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
  flex-direction: ${({ $targetComponent }) => ($targetComponent === "keyboard" ? "column" : "row")};
  height: ${({ $targetComponent }) => ($targetComponent === "keyboard" ? "30px" : "20px")};
  width: ${({ $targetComponent }) => ($targetComponent === "keyboard" ? "auto" : "30px")};
  top: ${({ $targetComponent, $isShapeNote }) =>
    $targetComponent === "keyboard" && $isShapeNote ? "20px" : "0"};
  opacity: ${({ $isHighlighted, $targetComponent, $isTuneNote, $isShapeNote }) =>
    $isShapeNote ||
    ($isHighlighted && $targetComponent === "keyboard") ||
    ($isTuneNote && $targetComponent === "fretboard")
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
    ${({ $targetComponent }) =>
      $targetComponent === "keyboard" &&
      css`
        background: #000000bb;
        box-shadow: 0 0 8px var(--background);
        border: 1px solid color-mix(in oklab, var(--accent) 70%, #000);
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
    ${({ $isFlatTune, $isEnharmonicNote, $isHighlighted, $targetComponent, $isShapeNote }) =>
      !$isEnharmonicNote
        ? getStaticStyles($isHighlighted)
        : getLabelStyles(!$isFlatTune, $isHighlighted, 1, $targetComponent, $isShapeNote)}
  }

  .optionalLabel {
    ${({ $isFlatTune, $isHighlighted, $targetComponent, $isShapeNote }) =>
      getLabelStyles($isFlatTune, $isHighlighted, -1, $targetComponent, $isShapeNote)}
  }
`;

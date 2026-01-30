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

const TARGET_COMPONENT_CONFIG = {
  keyboard: css`
    flex-direction: column;
    height: 30px;
    width: auto;

    .mainLabel,
    .optionalLabel {
      background: #000000bb;
      box-shadow: 0 0 8px var(--background);
      border: 1px solid color-mix(in oklab, var(--accent) 70%, #000);
    }
  `,
  fretboard: css`
    flex-direction: row;
    height: 20px;
    width: 30px;
  `,
};

const getLabelStyles = (
  isActive: boolean,
  isHighlighted: boolean,
  multiplier: number,
  targetComponent: LabelOrientation,
  isShapeNote: boolean,
) => {
  const isKeyboard = targetComponent === "keyboard";
  const y = isActive ? 9 * multiplier : 0 * multiplier;
  const x = isActive ? 12 * multiplier : 0 * multiplier;

  const transform = isKeyboard ? `translateY(${y}px)` : `translate(${x}px, 0)`;
  const shouldHighlight = (isActive && isHighlighted) || (isKeyboard && isShapeNote);

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

  ${({ $targetComponent }) => TARGET_COMPONENT_CONFIG[$targetComponent]}

  top: ${({ $targetComponent, $isShapeNote }) =>
    $targetComponent === "keyboard" && $isShapeNote ? "20px" : "0"};

  opacity: ${({ $isHighlighted, $targetComponent, $isTuneNote, $isShapeNote }) => {
    const isKeyboard = $targetComponent === "keyboard";
    const isFretboard = $targetComponent === "fretboard";
    return $isShapeNote || (isKeyboard && $isHighlighted) || (isFretboard && $isTuneNote)
      ? "1"
      : "0";
  }};

  will-change: top, opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn
      ? `opacity ${transitionTime}ms ease-in-out, top ${transitionTime}ms ease-in-out`
      : "none"};

  .mainLabel,
  .optionalLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    height: 25px;
    width: 25px;
    line-height: 26px;
    border-radius: 100%;
    font-weight: bold;
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
        ? css`
            color: ${$isHighlighted ? highlightedColor : unHighlightedColor};
          `
        : getLabelStyles(!$isFlatTune, $isHighlighted, 1, $targetComponent, $isShapeNote)}
  }

  .optionalLabel {
    ${({ $isFlatTune, $isHighlighted, $targetComponent, $isShapeNote }) =>
      getLabelStyles($isFlatTune, $isHighlighted, -1, $targetComponent, $isShapeNote)}
  }
`;

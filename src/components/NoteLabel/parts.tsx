import styled, { css } from "styled-components";
import { transitionTime } from "@/utils/constants";

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
    width: auto;
    .mainLabel,
    .optionalLabel {
      background: color-mix(in oklab, var(--background) 70%, transparent);
      box-shadow: 0 0 8px var(--background);
      border: 1px solid color-mix(in oklab, var(--accent) 70%, transparent);
      top: 0;
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
  targetComponent: LabelOrientation,
  isShapeNote: boolean,
) => {
  const isKeyboard = targetComponent === "keyboard";
  const shouldHighlight = (isActive && isHighlighted) || (isKeyboard && isShapeNote);

  return css`
    color: ${shouldHighlight ? highlightedColor : unHighlightedColor};
    opacity: ${isActive ? 1 : 0};
  `;
};

export const Wrapper = styled.div<StyledNoteLabelProps>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $targetComponent }) => TARGET_COMPONENT_CONFIG[$targetComponent]}

  top: ${({ $targetComponent, $isShapeNote }) =>
    $targetComponent === "keyboard" && $isShapeNote ? "25px" : "0"};

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
    width: 25px;
    height: 25px;
    border-radius: 100%;
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    line-height: 26px;
    will-change: opacity, font-size, color;
    transition: ${({ $areAnimationsOn }) =>
      $areAnimationsOn
        ? css`
            opacity ${transitionTime}ms ease-in-out, 
            font-size ${transitionTime}ms ease-in-out, 
            color ${transitionTime}ms ease-in-out
          `
        : "none"};
  }

  .mainLabel {
    ${({ $isFlatTune, $isEnharmonicNote, $isHighlighted, $targetComponent, $isShapeNote }) =>
      !$isEnharmonicNote
        ? css`
            color: ${$isHighlighted ? highlightedColor : unHighlightedColor};
          `
        : getLabelStyles(!$isFlatTune, $isHighlighted, $targetComponent, $isShapeNote)}
  }

  .optionalLabel {
    ${({ $isFlatTune, $isHighlighted, $targetComponent, $isShapeNote }) =>
      getLabelStyles($isFlatTune, $isHighlighted, $targetComponent, $isShapeNote)}
  }
`;

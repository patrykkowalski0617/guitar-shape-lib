import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

export type LabelOrientation = "vertical" | "horizontal";

interface StyledNoteLabelProps {
  $isFlatKey: boolean;
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
) => {
  const valVertY = isActive ? 10 * multiplier : -5 * multiplier;
  const valHorX = isActive ? 5 * multiplier : -4 * multiplier;
  const valHorY = 0;
  const transform =
    orientation === "vertical"
      ? `translateY(${valVertY}px)`
      : `translate(${valHorX}px, ${valHorY}px)`;

  return css`
    height: 20px;
    line-height: 1;
    font-size: ${isActive ? "12px" : "9px"};
    color: ${isActive && isHighlighted ? highlightedColor : unHighlightedColor};
    opacity: ${isActive ? 1 : 0};
    font-weight: ${isActive ? "bold" : "normal"};
    transform: ${transform};
  `;
};

export const Wrapper = styled.div<StyledNoteLabelProps>`
  z-index: 1;
  position: relative;
  height: ${({ $orientation }) => ($orientation === "vertical" ? "40px" : "20px")};
  width: ${({ $orientation }) => ($orientation === "vertical" ? "auto" : "30px")};
  display: flex;
  flex-direction: ${({ $orientation }) => ($orientation === "vertical" ? "column" : "row")};
  align-items: center;
  justify-content: center;
  top: ${({ $orientation, $isShapeNote }) =>
    $orientation === "vertical" && $isShapeNote ? "20px" : "0"};
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn ? `top ${transitionTime}ms ease-in-out` : "none"};
  .mainLabel,
  .optionalLabel {
    transition: ${({ $areAnimationsOn }) =>
      $areAnimationsOn
        ? `transform ${transitionTime}ms ease-in-out, 
           opacity ${transitionTime}ms ease-in-out, 
           font-size ${transitionTime}ms ease-in-out, 
           color ${transitionTime}ms ease-in-out`
        : "none"};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mainLabel {
    ${({ $isFlatKey, $isEnharmonicNote, $isHighlighted, $orientation }) =>
      !$isEnharmonicNote
        ? getStaticStyles($isHighlighted)
        : getLabelStyles(!$isFlatKey, $isHighlighted, 1, $orientation)}
  }

  .optionalLabel {
    ${({ $isFlatKey, $isHighlighted, $orientation }) =>
      getLabelStyles($isFlatKey, $isHighlighted, -1, $orientation)}
  }
`;

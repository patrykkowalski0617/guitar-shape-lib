import { transitionStepTime } from "@/components/Keyboard/helpers/constants";
import styled, { css } from "styled-components";

export type LabelOrientation = "vertical" | "horizontal";

interface StyledNoteLabelProps {
  $isFlatKey: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
  $orientation: LabelOrientation;
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
  orientation: LabelOrientation
) => {
  const valY = isActive ? 10 * multiplier : -5 * multiplier;
  const valX = isActive ? 2 * multiplier : -3 * multiplier;
  const transform = orientation === "vertical" ? `translateY(${valY}px)` : `translateX(${valX}px)`;

  return css`
    height: 20px;
    line-height: 1;
    font-size: ${isActive ? "12px" : "9px"};
    color: ${isActive && isHighlighted ? highlightedColor : unHighlightedColor};
    font-weight: ${isActive ? "bold" : "normal"};
    transform: ${transform};
  `;
};

export const Wrapper = styled.div<StyledNoteLabelProps>`
  z-index: 1;
  position: relative;
  height: ${({ $orientation }) => ($orientation === "vertical" ? "40px" : "20px")};
  width: ${({ $orientation }) => ($orientation === "vertical" ? "auto" : "30px")};
  margin-top: ${({ $orientation }) => ($orientation === "vertical" ? "10px" : "0")};
  display: flex;
  flex-direction: ${({ $orientation }) => ($orientation === "vertical" ? "column" : "row")};
  align-items: center;
  justify-content: center;
  user-select: none;

  .mainLabel,
  .optionalLabel {
    transition: ${transitionStepTime}ms ease-in-out;
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

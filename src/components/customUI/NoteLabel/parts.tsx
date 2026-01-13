import styled, { css } from "styled-components";

interface StyledNoteLabelProps {
  $isFlatKey: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
}

const highlightedColor = "var(--foreground)";
const unHighlightedColor = "var(--muted-foreground)";

const getStaticStyles = (isHighlighted: boolean) => css`
  font-size: 12px;
  opacity: 1;
  transform: translateY(0);
  height: 20px;
  line-height: 1;
  font-weight: bold;
  color: ${isHighlighted ? highlightedColor : unHighlightedColor};
`;

const getLabelStyles = (isActive: boolean, isHighlighted: boolean, multiplier: number) => css`
  height: 20px;
  line-height: 1;
  font-size: ${isActive ? "12px" : "9px"};
  color: ${isActive && isHighlighted ? highlightedColor : unHighlightedColor};
  opacity: ${isActive ? "1" : "0.6"};
  font-weight: ${isActive ? "bold" : "normal"};
  transform: translateY(${isActive ? 9.5 * multiplier : -5 * multiplier}px);
`;

export const Wrapper = styled.div<StyledNoteLabelProps>`
  z-index: 1;
  position: relative;
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .mainLabel,
  .optionalLabel {
    transition: all 0.1s 1.2s;
  }
  .mainLabel {
    ${({ $isFlatKey, $isEnharmonicNote, $isHighlighted }) =>
      !$isEnharmonicNote
        ? getStaticStyles($isHighlighted)
        : getLabelStyles(!$isFlatKey, $isHighlighted, 1)}
  }
  .optionalLabel {
    ${({ $isFlatKey, $isHighlighted }) => getLabelStyles($isFlatKey, $isHighlighted, -1)}
  }
`;

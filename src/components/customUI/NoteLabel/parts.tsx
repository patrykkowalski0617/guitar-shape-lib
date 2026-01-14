import styled, { css } from "styled-components";

interface StyledNoteLabelProps {
  $isFlatKey: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
}

const highlightedColor = "var(--muted-foreground)";
const unHighlightedColor = "var(--muted)";

const getStaticStyles = (isHighlighted: boolean) => css`
  font-size: 12px;
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
  font-weight: ${isActive ? "bold" : "normal"};
  transform: translateY(${isActive ? 10 * multiplier : -5 * multiplier}px);
`;

export const Wrapper = styled.div<StyledNoteLabelProps>`
  z-index: 1;
  position: relative;
  height: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .mainLabel,
  .optionalLabel {
    transition: 300ms ease-in-out;
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

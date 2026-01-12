import styled, { css } from "styled-components";

interface StyledNoteLabelProps {
  $isFlatKey: boolean;
  $isEnharmonicNote: boolean;
}

const getLabelStyles = (isActive: boolean, multiplier: number) => css`
  height: 20px;
  line-height: 1;
  font-size: ${isActive ? "12px" : "9px"};
  opacity: ${isActive ? "1" : "0.5"};
  font-weight: ${isActive ? "bold" : "normal"};
  transform: translateY(${isActive ? 10 * multiplier : -4 * multiplier}px);
`;

const staticStyles = css`
  font-size: 12px;
  opacity: 1;
  transform: translateY(0);
  height: 19px;
  line-height: 1;
  font-weight: bold;
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
    ${({ $isFlatKey, $isEnharmonicNote }) =>
      !$isEnharmonicNote ? staticStyles : getLabelStyles(!$isFlatKey, 1)}
  }

  .optionalLabel {
    ${({ $isFlatKey }) => getLabelStyles($isFlatKey, -1)}
  }
`;

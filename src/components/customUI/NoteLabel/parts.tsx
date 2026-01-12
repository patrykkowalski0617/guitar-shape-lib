import styled, { css } from "styled-components";

interface StyledNoteLabelProps {
  $isFlatKey: boolean;
  $isEnharmonicNote: boolean;
}

const activeStyles = css`
  font-size: 12px;
  opacity: 1;
`;

const inactiveStyles = css`
  font-size: 7px;
  opacity: 0.7;
`;

export const Wrapper = styled.div<StyledNoteLabelProps>`
  z-index: 1;
  position: relative;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .mainLabel,
  .optionalLabel {
    transition: font-size 0.2s 0.8s, opacity 0.2s 0.8s;
  }

  .mainLabel {
    ${({ $isFlatKey, $isEnharmonicNote }) =>
      $isEnharmonicNote && $isFlatKey ? inactiveStyles : activeStyles}
  }

  .optionalLabel {
    ${({ $isFlatKey }) => ($isFlatKey ? activeStyles : inactiveStyles)}
  }
`;

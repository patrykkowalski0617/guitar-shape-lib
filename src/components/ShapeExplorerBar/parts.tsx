import styled, { css } from "styled-components";

export const ShapeExplorerBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  gap: 20px;
`;

export const Section = styled.div<{ $isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 16px;
  flex-direction: row;
  interpolate-size: allow-keywords;
  transition: 0.2s;
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      width: 0;
      padding: 0;
      display: none;
      overflow: hidden;
    `}
`;

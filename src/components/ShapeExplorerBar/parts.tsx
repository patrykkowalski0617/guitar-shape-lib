import { animationDuration } from "@/constants";
import styled, { css } from "styled-components";

export const ShapeExplorerBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

export const ShapeExplorerSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 30px;
`;

export const Section = styled.div<{ $isDisabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  interpolate-size: allow-keywords;
  transition:
    width ${animationDuration},
    margin ${animationDuration},
    height ${animationDuration},
    opacity ${animationDuration} ${animationDuration};
  width: auto;
  height: auto;
  opacity: 1;
  margin: 0 50px;
  ${({ $isDisabled }) =>
    $isDisabled === true &&
    css`
      width: 0;
      height: 0;
      overflow: hidden;
      flex-basis: 0;
      opacity: 0;
      margin: 0;
    `};
`;

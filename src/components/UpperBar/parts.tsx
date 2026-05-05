import { animationDuration } from "@/constants";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
`;

export const Section = styled.div<{ $isDisabled?: boolean }>`
  interpolate-size: allow-keywords;
  transition:
    width ${animationDuration} ${animationDuration},
    margin ${animationDuration} ${animationDuration},
    opacity ${animationDuration};
  width: fit-content;
  height: auto;
  opacity: 1;
  ${({ $isDisabled }) =>
    $isDisabled === true &&
    css`
      width: 0;
      height: 0;
      opacity: 0;
      margin: 0;
    `};
`;

export const BaseChordToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 600px;
  flex: 1 1 0;
`;

export const BottomRow = styled.div`
  display: flex;
  width: 100%;
`;

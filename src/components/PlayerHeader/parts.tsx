import styled, { css } from "styled-components";
import { space } from "../ui";

export const PlayerHeaderWrapper = styled.div<{ $isListEmpty: boolean }>`
  ${({ $isListEmpty }) => css`
    padding-left: 90px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: ${$isListEmpty ? "center" : "space-between"};
    gap: ${space._3};
  `}
`;

export const Buttons = styled.div`
  display: flex;
  gap: ${space._3};
`;

export const SliderWrapper = styled.div`
  flex-grow: 1;
  max-width: 500px;
`;

export const CounterPlaceHolder = styled.div`
  min-width: 250px;
`;

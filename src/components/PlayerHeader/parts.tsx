import styled, { css } from "styled-components";
import { space } from "../ui";

export const PlayerHeaderWrapper = styled.div<{ $isListEmpty: boolean }>`
  ${({ $isListEmpty }) => css`
    padding: 0 50px 0 120px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: ${$isListEmpty ? "center" : "space-between"};
    gap: ${space._3};
    height: 50px;
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

export const MasterTargetNotesSelectWrapper = styled.div`
  width: auto;
`;

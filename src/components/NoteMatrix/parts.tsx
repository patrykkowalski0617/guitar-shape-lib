import { noteCommon } from "@/components/NoteLabel/constants";
import styled, { css } from "styled-components";

export const NoteMatrixSection = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  gap: 6px;
  position: relative;
  justify-content: space-between;
  width: fit-content;
  margin: 0 5px;
`;

export const Note = styled.div<{
  $isSharedNote?: boolean;
  $isTargetNote?: boolean;
}>`
  ${noteCommon}
  opacity: 0.25;

  ${({ $isSharedNote }) =>
    $isSharedNote &&
    css`
      opacity: 1;
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: default;
  box-shadow: 2px 2px 2px 0 var(--background);
  user-select: none;
`;

export const NoteWrapper = styled.div`
  position: relative;
`;

export const IntervalContainer = styled.div`
  font-size: 11px;
  text-align: center;
  position: absolute;
  width: 100%;
  top: -22px;
`;

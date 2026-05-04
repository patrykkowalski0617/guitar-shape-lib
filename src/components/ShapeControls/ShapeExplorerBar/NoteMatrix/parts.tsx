import { noteCommon } from "@/components/NoteLabel/constants";
import styled, { css } from "styled-components";

export const NerdSection = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
`;

export const NerdSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RowTitle = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 16px;
`;

export const NotesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const Note = styled.div<{ $isVisible: boolean }>`
  ${noteCommon}
  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      opacity: 0.2;
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: default;
`;

export const NoteWrapper = styled.div`
  position: relative;
`;

export const IntervalContainer = styled.div`
  font-size: 10px;
  text-align: center;
  position: absolute;
  width: 100%;
  top: -17px;
  opacity: 0.7;
`;

import { noteCommon } from "@/components/NoteLabel/constants";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import { glassEffectShadow } from "@/constants";
import { Label } from "@/parts";
import styled, { css } from "styled-components";

export const NoteMatrixSection = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  border: 1px solid color-mix(in oklab, var(--instrument) 20%, transparent);
  border-radius: calc(${instrumentElBRadius} + 2px);
  padding: 8px;
  gap: 4px;
  position: relative;
  ${glassEffectShadow}
`;

export const NoteMatrixSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled(Label)`
  position: absolute;
  top: -23px;
  text-align: left;
`;

export const RowTitle = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 8px;
  opacity: 0.7;
`;

export const NotesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const Note = styled.div<{
  $isVisible: boolean;
  $isSharedNote?: boolean;
}>`
  ${noteCommon}
  opacity: 0.5;
  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      opacity: 0.2;
    `}
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
`;

export const NoteWrapper = styled.div`
  position: relative;
`;

export const IntervalContainer = styled.div`
  font-size: 10px;
  text-align: center;
  position: absolute;
  width: 100%;
  top: -26px;
  opacity: 0.7;
`;

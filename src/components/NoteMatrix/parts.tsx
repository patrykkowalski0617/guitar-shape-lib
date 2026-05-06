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
  gap: calc(var(--spacing) * 4);
  position: relative;
  background-color: color-mix(in oklab, var(--foreground) 5%, transparent);
  ${glassEffectShadow}
  min-width: 550px;
  justify-content: space-between;
  width: fit-content;
`;

export const NoteMatrixSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing));
  width: 100%;
`;

export const Title = styled(Label)`
  position: absolute;
  top: -23px;
`;

export const RowTitle = styled.div<{ $isStateReady: boolean }>`
  height: 100%;
  flex: 1 1 0;
  margin-right: 8px;
  opacity: 0.7;
  text-align: center;
  ${({ $isStateReady }) =>
    !$isStateReady &&
    css`
      opacity: 0.2;
    `}
`;

export const NotesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: calc(var(--spacing));
`;

export const Note = styled.div<{
  $isVisible: boolean;
  $isSharedNote?: boolean;
  $isSelected?: boolean;
}>`
  ${noteCommon}
  opacity: 0.5;
  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      opacity: 0.1;
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
  box-shadow: 2px 2px 2px 0 var(--background);
`;

export const NoteWrapper = styled.div`
  position: relative;
`;

export const IntervalContainer = styled.div`
  font-size: 12px;
  text-align: center;
  position: absolute;
  width: 100%;
  top: -28px;
  opacity: 0.7;
`;

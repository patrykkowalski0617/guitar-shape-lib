import { noteCommon } from "@/components/NoteLabel/constants";
import { instrumentElBRadius } from "@/components/Piano/constants";
import { glassEffectShadow } from "@/constants";
import styled, { css } from "styled-components";

export const NoteMatrixSection = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  border: 1px solid color-mix(in oklab, var(--instrument) 20%, transparent);
  border-radius: calc(${instrumentElBRadius} + 2px);
  padding: 8px;
  gap: var(--spacing);
  position: relative;
  background-color: color-mix(in oklab, var(--foreground) 5%, transparent);
  ${glassEffectShadow}
  justify-content: space-between;
  width: fit-content;
  margin: 0 5px;
`;

export const Note = styled.div<{
  $isSharedNote?: boolean;
  $isSelected?: boolean;
}>`
  ${noteCommon}
  opacity: 0.5;

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
  font-size: 12px;
  text-align: center;
  position: absolute;
  width: 100%;
  top: -28px;
  opacity: 0.7;
`;

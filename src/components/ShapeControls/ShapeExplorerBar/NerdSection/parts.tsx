import styled, { css } from "styled-components";

export const NerdSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

export const NerdSectionRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 20px;
`;

export const RowTitle = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const NotesRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Note = styled.div<{ $isVisible: boolean }>`
  ${({ $isVisible }) =>
    !$isVisible &&
    css`
      opacity: 0;
    `}

  width: 20px;
  justify-content: center;
  align-items: center;
`;

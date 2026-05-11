import styled from "styled-components";

export const RowWrapper = styled.div<{ $isCurrent?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  &:hover {
    opacity: 1;
  }
`;

export const KeyLabel = styled.span`
  min-width: 80px;
`;

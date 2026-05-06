import styled from "styled-components";

export const ShapeExplorerBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  gap: calc(var(--spacing) * 16);
`;

export const ShapeExplorerSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: calc(var(--spacing) * 8);
`;

export const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  white-space: nowrap;
`;

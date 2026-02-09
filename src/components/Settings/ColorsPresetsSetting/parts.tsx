import { type CSSProperties } from "react";
import styled from "styled-components";

export const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin: 0;
`;

export const Dot = styled.div<{ $color: CSSProperties["color"]; $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $color }) => $color};
  border-radius: 6px;
  border: 1px solid var(--accent-foreground);
`;

export const PresetsGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
  flex-wrap: wrap;
`;

import { type CSSProperties } from "react";
import styled from "styled-components";

export const DotsContainer = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;
  padding: 0;
  margin: 0;
`;

export const Dot = styled.div<{ $color: CSSProperties["color"]; $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $color }) => $color};
  border-radius: 6px;
  border: 2px solid var(--background);
`;

export const PresetsGrid = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
  flex-wrap: wrap;
`;

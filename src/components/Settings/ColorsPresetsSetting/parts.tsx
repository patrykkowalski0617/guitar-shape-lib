import { type CSSProperties } from "react";
import styled from "styled-components";

export const DotsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-around;
  padding: 4px 16px;
  border-radius: 6px;
  max-width: 200px;
  margin: -2px auto;
`;

export const ColorContainer = styled.div`
  display: flex;
  gap: 0 12px;
`;

export const Dot = styled.div<{ $color: CSSProperties["color"]; $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $color }) => $color};
  border-radius: 6px;
  border: 1px solid var(--accent);
`;

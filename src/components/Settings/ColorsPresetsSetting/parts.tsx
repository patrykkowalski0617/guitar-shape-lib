import { Button as Btn } from "@/components/ui/button";
import { type CSSProperties } from "react";
import styled from "styled-components";

export const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-around;
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
  flex-wrap: wrap;
  gap: 8px;
`;

export const Button = styled(Btn)`
  flex: 1 1 0;
`;

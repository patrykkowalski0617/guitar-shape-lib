import styled from "styled-components";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface PianoProps {
  $numberOfKeys: number;
}

export const Piano = styled.div<PianoProps>`
  user-select: none;
  display: flex;
  padding: 4px 0 2px 0;
  gap: 0;
`;

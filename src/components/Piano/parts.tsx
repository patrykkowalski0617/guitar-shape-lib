import styled from "styled-components";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface PianoProps {
  $numberOfKeys: number;
}

export const Piano = styled.div<PianoProps>`
  user-select: none;
  display: flex;
  padding-bottom: 4px;
  padding-left: 18px;
  padding-right: 0px;
  width: fit-content;
`;

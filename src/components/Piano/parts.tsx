import styled from "styled-components";
import { pianoBgColor } from "./PianoKey/parts/constants";
import type { BlackKeyTypes } from "./PianoKey/parts/blackKeys";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B" | BlackKeyTypes;

interface PianoProps {
  $numberOfKeys: number;
}

export const Piano = styled.div<PianoProps>`
  user-select: none;
  display: flex;
  padding: 10px 2px 2px;
  gap: 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0 0 10px;
    background-color: ${pianoBgColor};
  }
`;

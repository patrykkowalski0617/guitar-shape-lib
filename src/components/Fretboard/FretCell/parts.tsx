import { KeyAndFretStyles } from "@/components/customUI/Boards/parts";
import styled from "styled-components";

interface FretProps {
  $numberOfFrets: number;
}

export const Fret = styled.div<FretProps>`
  width: ${({ $numberOfFrets }) => `calc(100% / ${$numberOfFrets})`};
  padding: 2px;
`;

interface NoteProps {
  $isHighlighted: boolean;
  $isActiveNote: boolean;
}

export const Note = styled.div<NoteProps>`
  ${KeyAndFretStyles}
  box-shadow: inset 0 0px 2px 0px var(--input);
  opacity: 0.75;
  border-radius: 4px;
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(1.6)" : "none")};
  will-change: filter;
  background-color: var(--background);
  @media (max-width: 1000px) {
    height: 20px;
  }
`;

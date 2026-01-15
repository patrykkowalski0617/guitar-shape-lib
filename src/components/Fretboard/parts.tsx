import styled from "styled-components";
import { transitionStepTime } from "../Keyboard/helpers/constants";

export const Fretboard = styled.div`
  margin-top: 20px;
`;

export const FretboardRow = styled.div`
  display: flex;
  flex-direction: row;
`;

interface FretProps {
  $numberOfFrets: number;
}

export const Fret = styled.div<FretProps>`
  width: ${({ $numberOfFrets }) => `calc(100% / ${$numberOfFrets})`};
  padding: 2px;
`;

interface NoteProps {
  $isHighlighted: boolean;
}

export const Note = styled.div<NoteProps>`
  transition: ${transitionStepTime}ms;
  background: ${({ $isHighlighted }) => ($isHighlighted ? "gold" : "black")};
  border-radius: 4px;
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

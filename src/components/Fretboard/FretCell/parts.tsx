import { KeyAndFretStyles } from "@/components/customUI/Boards/parts";
import { roleColors, type HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";
import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

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
  $isShapeRootNote: boolean;
  $isShapeNote: boolean;
  $isDevNote: boolean;
  $isHighlightRole: HighlightRole;
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
  background-color: var(--background);
  will-change: filter, box-shadow;
  transition: box-shadow ${transitionTime}ms ease-in-out;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(1.6)" : "none")};
  outline: ${({ $isShapeNote }) => ($isShapeNote ? "2px solid red" : "none")};
  background-color: ${({ $isDevNote }) => ($isDevNote ? "red" : "none")};
  ${({ $isHighlighted, $isHighlightRole }) => {
    const color = roleColors[$isHighlightRole as keyof typeof roleColors];
    return (
      $isHighlighted &&
      css`
        border-color: ${color};
        box-shadow: inset 0 -5px 10px 0px ${color};
      `
    );
  }}
  @media (max-width: 1000px) {
    height: 20px;
  }
`;

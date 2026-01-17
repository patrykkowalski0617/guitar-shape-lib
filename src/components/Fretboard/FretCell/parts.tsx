import { KeyAndFretStyles } from "@/components/customUI/Boards/parts";
import { roleColors, type HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";
import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

interface FretProps {
  $numberOfFrets: number;
  $isDevNote: boolean;
  $isShapeNote: boolean;
  $isLockedNote: boolean;
}

export const Fret = styled.div<FretProps>`
  width: ${({ $numberOfFrets }) => `calc(100% / ${$numberOfFrets})`};
  margin: 2px;
  border-radius: 4px;
  background-color: ${({ $isDevNote }) => ($isDevNote ? "orange !important" : "var(--background)")};
  box-shadow: ${({ $isShapeNote }) =>
    $isShapeNote ? "inset 0 -5px 10px 0px var(--input)" : "none"};
  outline: ${({ $isLockedNote }) => ($isLockedNote ? "2px solid var(--primary)" : "")};
  outline-offset: 2px;
`;

interface NoteProps {
  $isHighlighted: boolean;
  $isActiveNote: boolean;
  $isShapeRootNote: boolean;
  $isShapeNote: boolean;
  $isHighlightRole: HighlightRole;
}

export const Note = styled.div<NoteProps>`
  ${KeyAndFretStyles}
  box-shadow: inset 0 0px 2px 0px var(--input);
  border-radius: 4px;
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  will-change: filter, box-shadow;
  transition: box-shadow ${transitionTime}ms ease-in-out;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(1.6)" : "none")};
  opacity: ${({ $isShapeNote }) => ($isShapeNote ? "1" : "0.75")};
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

import { KeyAndFretStyles } from "@/components/Boards/parts";
import { roleColors, type HighlightRole } from "@/utils/roleColors";
import type { RoleId } from "@/utils";
import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

interface FretProps {
  $numberOfFrets: number;
  $isDevNote: boolean;
  $isShapeNote: boolean;
  $isLockedNote: boolean;
  $lockedRoleId: RoleId | null;
}

export const Fret = styled.div<FretProps>`
  width: ${({ $numberOfFrets }) => `calc(100% / ${$numberOfFrets})`};
  margin: 2px;
  border-radius: 4px;
  background-color: ${({ $isDevNote }) => ($isDevNote ? "orange !important" : "var(--background)")};
  box-shadow: ${({ $isShapeNote }) => $isShapeNote && "inset 0 -5px 8px 0px var(--input)"};
  ${({ $isLockedNote, $lockedRoleId }) => {
    if (!$isLockedNote) return null;
    const color = roleColors[($lockedRoleId as HighlightRole) || "none"];
    return css`
      outline: 2px solid ${color};
      z-index: 10;
      @media (min-width: 768px) {
        outline-offset: 2px;
      }
    `;
  }}
`;

interface NoteProps {
  $isHighlighted: boolean;
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isHighlightRole: HighlightRole;
  $areAnimationsOn: boolean;
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
  position: relative;
  z-index: 20;
  will-change: filter, box-shadow;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn && `box-shadow ${transitionTime}ms ease-in-out`};
  filter: ${({ $isActiveNote }) => $isActiveNote && "brightness(1.5)"};
  opacity: ${({ $isShapeNote }) => ($isShapeNote ? "1" : "0.7")};
  border-width: ${({ $isShapeNote }) => ($isShapeNote ? "3px" : "1px")};
  ${({ $isHighlighted, $isHighlightRole }) => {
    if (!$isHighlighted) return null;

    const color = roleColors[$isHighlightRole];
    return css`
      border-color: ${color};
      box-shadow: inset 0 -2px 5px 0px ${color};
    `;
  }}
`;

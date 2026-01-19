import { KeyAndFretStyles } from "@/components/customUI/Boards/parts";
import { roleColors, type HighlightRole } from "@/components/Keyboard/helpers/scaleLogic";
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
  box-shadow: ${({ $isShapeNote }) =>
    $isShapeNote ? "inset 0 -5px 10px 0px var(--input)" : "none"};
  ${({ $isLockedNote, $lockedRoleId }) => {
    if (!$isLockedNote) return "";
    const roleKey =
      $lockedRoleId && $lockedRoleId in roleColors ? ($lockedRoleId as HighlightRole) : "none";
    const color = roleColors[roleKey];

    return css`
      outline: 2px solid ${color};
      @media (min-width: 768px) {
        outline-offset: 2px;
      }
      z-index: 10;
    `;
  }}
`;

interface NoteProps {
  $isHighlighted: boolean;
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isHighlightRole: HighlightRole;
}

export const Note = styled.div<NoteProps>`
  ${KeyAndFretStyles}
  box-shadow: inset 0 0px 2px 0px var(--input);
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 20;
  will-change: filter, box-shadow;
  transition: box-shadow ${transitionTime}ms ease-in-out;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(1.5)" : "none")};
  opacity: ${({ $isShapeNote }) => ($isShapeNote ? "1" : "0.7")};
  border-width: ${({ $isShapeNote }) => ($isShapeNote ? "3px" : "1px")};
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
  height: 26px;
`;

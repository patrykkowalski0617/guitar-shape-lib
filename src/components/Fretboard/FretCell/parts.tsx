import { instrumentElBRadius, PianoKeyAndFretStyles } from "@/parts";
import { roleColors, type HighlightRole } from "@/utils/roleColors";
import type { RoleId } from "@/utils";
import styled, { css } from "styled-components";
import { fretboardTransitionTime } from "./helpers/constants";

export const Fret = styled.div<{
  $isLockedNote: boolean;
  $lockedRoleId: RoleId | null;
}>`
  flex: 1;
  width: 0;
  margin: 4px;
  border-radius: ${instrumentElBRadius};
  position: relative;
  ${({ $isLockedNote, $lockedRoleId }) => {
    if (!$isLockedNote) return null;
    const color = roleColors[($lockedRoleId as HighlightRole) || "none"];
    return css`
      outline: 3px solid ${color};
      outline-offset: 2px;
    `;
  }}
`;

export const Note = styled.div<{
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isShapeRootNote: boolean;
  $isTuneNote: boolean;
  $highlightRole: HighlightRole;
  $areAnimationsOn: boolean;
}>`
  ${PianoKeyAndFretStyles}
  box-shadow: inset 0 0px 6px 0px var(--input);
  border-radius: ${instrumentElBRadius};
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
  cursor: ${({ $isShapeRootNote }) => ($isShapeRootNote ? "pointer" : "default")};
  will-change: box-shadow, opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn &&
    `box-shadow ${fretboardTransitionTime}ms ease-in-out, 
    opacity ${fretboardTransitionTime}ms ease-in-out`};
  opacity: ${({ $isTuneNote, $isShapeNote, $isShapeRootNote }) =>
    $isShapeNote ? "1" : $isShapeRootNote ? "0.7" : $isTuneNote ? "0.5" : "0.15"};
  filter: ${({ $isActiveNote }) => $isActiveNote && "brightness(1.5)"};
  border-width: ${({ $isShapeNote }) => ($isShapeNote ? "3px" : "1px")};
  ${({ $isShapeNote, $highlightRole }) => {
    if ($isShapeNote) {
      const color = roleColors[$highlightRole];
      return css`
        border-color: ${color};
        box-shadow: inset 0 0px 8px 0px ${color};
      `;
    }
  }}
  &:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 6px;
    z-index: 10;
  }
`;

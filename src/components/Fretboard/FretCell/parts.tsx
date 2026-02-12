import { instrumentElBRadius } from "@/parts";
import { roleColors, type HighlightRole } from "@/utils/roleColors";
import type { RoleId } from "@/utils";
import styled, { css } from "styled-components";
import { fretboardTransitionTime } from "./helpers/constants";
import { transitionTime } from "@/utils/constants";

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
  $isRoleSelected: boolean;
}>`
  border: 1px solid var(--border);
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
  transition: ${({ $isActiveNote }) =>
    !$isActiveNote &&
    `box-shadow ${fretboardTransitionTime}ms ease-in-out, 
    opacity ${transitionTime}ms ease-in-out`};
  opacity: ${({ $isShapeNote, $isShapeRootNote, $isRoleSelected, $isTuneNote, $isActiveNote }) => {
    if (($isActiveNote && !$isRoleSelected) || $isShapeNote || $isShapeRootNote || (!$isRoleSelected && $isTuneNote))
      return "1";

    if ($isActiveNote || $isTuneNote) return "0.4";

    return "0";
  }};
  filter: ${({ $isActiveNote, $isTuneNote }) => ($isActiveNote && $isTuneNote ? "brightness(1.5)" : "")};
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

import { PianoKeyAndFretStyles } from "@/parts";
import { roleColors, type HighlightRole } from "@/utils/roleColors";
import type { RoleId } from "@/utils";
import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";

export const LockedEffectWrapper = styled.div<{
  $isLockedNote: boolean;
  $lockedRoleId: RoleId | null;
}>`
  flex: 1;
  width: 0;
  margin: 4px;
  border-radius: 4px;
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

export const Fret = styled.div<{
  $isShapeNote: boolean;
  $isShapeRootNoteWithVariants: boolean;
  $isTuneNote: boolean;
  $areAnimationsOn: boolean;
}>`
  width: 100%;
  border-radius: 4px;
  box-shadow: ${({ $isShapeNote }) => $isShapeNote && "inset 0 2px 8px 0px var(--input)"};
  opacity: ${({ $isTuneNote, $isShapeNote, $isShapeRootNoteWithVariants }) =>
    $isShapeNote ? "1" : $isShapeRootNoteWithVariants ? "0.7" : $isTuneNote ? "0.5" : "0.15"};
  will-change: opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn && `opacity ${transitionTime}ms ease-in-out`};
  cursor: ${({ $isShapeRootNoteWithVariants }) =>
    $isShapeRootNoteWithVariants ? "pointer" : "default"};
  &:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 6px;
    z-index: 10;
  }
`;

export const Note = styled.div<{
  $isShapeRootNote: boolean;
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $highlightRole: HighlightRole;
  $areAnimationsOn: boolean;
}>`
  ${PianoKeyAndFretStyles}
  box-shadow: inset 0 0px 6px 0px var(--input);
  border-radius: 4px;
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
  will-change: filter, box-shadow;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn && `box-shadow ${transitionTime}ms ease-in-out`};
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
`;

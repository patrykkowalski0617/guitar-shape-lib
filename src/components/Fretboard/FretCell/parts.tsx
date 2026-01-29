import { KeyAndFretStyles } from "@/components/BoardsWrapper/parts";
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
  margin: 2px;
  border-radius: 4px;
  position: relative;
  ${({ $isLockedNote, $lockedRoleId }) => {
    if (!$isLockedNote) return null;
    const color = roleColors[($lockedRoleId as HighlightRole) || "none"];
    return css`
      outline: 2px solid ${color};
      @media (min-width: 768px) {
        outline-offset: 2px;
      }
    `;
  }}
`;

interface FretProps {
  $isDevNote: boolean;
  $isShapeNote: boolean;
  $isShapeRootNoteWithVariants: boolean;
  $isTuneNote: boolean;
  $areAnimationsOn: boolean;
}

export const Fret = styled.div<FretProps>`
  width: 100%;
  border-radius: 4px;
  background-color: ${({ $isDevNote }) => ($isDevNote ? "orange !important" : "var(--background)")};
  box-shadow: ${({ $isShapeNote }) => $isShapeNote && "inset 0 -5px 8px 0px var(--input)"};
  opacity: ${({ $isTuneNote, $isShapeNote }) => ($isTuneNote || $isShapeNote ? "1" : "0.2")};
  will-change: opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn && `opacity ${transitionTime}ms ease-in-out`};

  cursor: ${({ $isShapeRootNoteWithVariants }) =>
    $isShapeRootNoteWithVariants ? "pointer" : "default"};
  &:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 4px;
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
  ${KeyAndFretStyles}
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
  opacity: ${({ $isShapeNote }) => ($isShapeNote ? "1" : "0.5")};
  border-width: ${({ $isShapeNote }) => ($isShapeNote ? "3px" : "1px")};
  ${({ $isShapeRootNote, $highlightRole }) => {
    if (!$isShapeRootNote) return null;

    const color = roleColors[$highlightRole];
    return css`
      border-color: ${color};
      box-shadow: inset 0 -2px 5px 0px ${color};
    `;
  }}
`;

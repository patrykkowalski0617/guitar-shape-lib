import { instrumentElBRadius } from "@/parts";
import { roleColors, type HighlightRole } from "@/data/roleColors";
import styled, { css } from "styled-components";
import { fretboardTransitionTime } from "./helpers/constants";
import { transitionTime } from "@/data/constants";
import { DotsWrapper } from "@/components/Fretboard/VariantProgressDots/parts";
import { activeDotsStyles } from "@/components/Fretboard/VariantProgressDots/constants";
import type { RoleId } from "@/data/roles";

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
  &:hover ${DotsWrapper} {
    ${activeDotsStyles}
  }
`;

export const Note = styled.div<{
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isShapeRootNote: boolean;
  $isTuneNote: boolean;
  $highlightRole: HighlightRole;
  $isShapeSelected: boolean;
  $isRoleSelected: boolean;
}>`
  border: 1px solid color-mix(in oklab, var(--border) 85%, transparent);
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
  transition: ${({ $isShapeSelected }) =>
    $isShapeSelected &&
    `box-shadow ${fretboardTransitionTime}ms ease-in-out, 
    opacity ${transitionTime}ms ease-in-out,
    border ${transitionTime}ms ease-in-out,
    filter ${transitionTime}ms ease-in-out`};
  opacity: ${({ $isShapeNote, $isShapeRootNote, $isShapeSelected, $isRoleSelected, $isTuneNote, $isActiveNote }) => {
    if (($isActiveNote && !$isShapeSelected) || $isShapeNote || $isShapeRootNote || (!$isShapeSelected && $isTuneNote))
      return "1";

    if ($isActiveNote || $isTuneNote || !$isRoleSelected) return "0.5";

    return "0";
  }};
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(2) contrast(5)" : "")};
  border-width: ${({ $isShapeNote, $isActiveNote }) => ($isShapeNote || $isActiveNote ? "3px" : "1px")};
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

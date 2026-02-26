import { instrumentElBRadius } from "@/parts";
import styled, { css } from "styled-components";
import { DotsWrapper } from "@/components/Fretboard/VariantProgressDots/parts";
import { activeDotsStyles } from "@/components/Fretboard/VariantProgressDots/constants";

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  width: 0;
  height: 28px;
  padding: 1px;
  &:hover ${DotsWrapper} {
    ${activeDotsStyles}
  }
`;

export const Fret = styled.div<{
  $isLockedNote: boolean;
}>`
  height: 100%;
  border-radius: ${instrumentElBRadius};
  ${({ $isLockedNote }) => {
    if (!$isLockedNote) return null;

    return css`
      outline: 2px solid var(--primary-foreground);
      padding: 2px;
    `;
  }}
`;

export const Note = styled.div<{
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isShapeRootNote: boolean;
  $isTuneNote: boolean;
  $isShapeSelected: boolean;
  $shouldMarkTuneNotes: boolean;
  $isLockedNote: boolean;
  $transitionTime: number;
}>`
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
  border: 1px solid color-mix(in oklab, var(--border) 85%, transparent);
  border-radius: ${instrumentElBRadius};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 20;
  cursor: ${({ $isShapeRootNote }) => ($isShapeRootNote ? "pointer" : "default")};
  will-change: box-shadow, opacity;
  transition:
    box-shadow ${({ $transitionTime }) => $transitionTime}ms ease-in-out,
    opacity ${({ $transitionTime }) => $transitionTime}ms ease-in-out;
  opacity: ${({
    $isShapeNote,
    $isShapeRootNote,
    $isShapeSelected,
    $isTuneNote,
    $isActiveNote,
    $shouldMarkTuneNotes,
  }) => {
    if (
      ($isActiveNote && !$isShapeSelected) ||
      $isShapeNote ||
      $isShapeRootNote ||
      (!$isShapeSelected && $isTuneNote) ||
      (!$shouldMarkTuneNotes && !$isShapeSelected)
    )
      return "1";

    if ($isActiveNote || $isTuneNote || !$shouldMarkTuneNotes || $isTuneNote) return "0.4";

    return "0";
  }};
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(3)" : "")};
  border-width: ${({ $isShapeNote }) => ($isShapeNote ? "3px" : "1px")};
  ${({ $isShapeNote }) => {
    if ($isShapeNote) {
      return css`
        border-color: var(--primary);
        box-shadow: inset 0 0px 8px 0px var(--primary);
      `;
    }
  }}
`;

import { instrumentElBRadius } from "@/parts";
import styled, { css } from "styled-components";

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  width: 0;
  height: 30px;
  padding: 1px;
`;

export const Fret = styled.div<{
  $isLockedNote: boolean;
}>`
  height: 100%;
  border-radius: ${instrumentElBRadius};
  ${({ $isLockedNote }) => {
    if (!$isLockedNote) return null;

    return css`
      outline: 2px solid var(--secondary-foreground);
      padding: 2px;
    `;
  }}
`;

export const Note = styled.div<{
  $opacity: number;
  $brightness: number;
  $isShapeNote: boolean;
  $isBaseChordNote: boolean;
}>`
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
  border: 1px solid color-mix(in oklab, var(--border) 85%, transparent);
  border-radius: ${instrumentElBRadius};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: box-shadow, opacity;
  opacity: ${({ $opacity }) => $opacity};
  filter: ${({ $brightness }) =>
    $brightness > 1 ? `brightness(${$brightness})` : "none"};
  border-width: ${({ $isShapeNote, $isBaseChordNote }) =>
    $isShapeNote || $isBaseChordNote ? "3px" : "1px"};

  ${({ $isShapeNote, $isBaseChordNote }) => {
    if ($isShapeNote) {
      return css`
        border-color: var(--secondary);
        box-shadow: inset 0 0px 8px 0px var(--accent);
      `;
    } else if ($isBaseChordNote) {
      return css`
        box-shadow: inset 0 0px 8px 0px var(--accent);
      `;
    }
  }}
`;

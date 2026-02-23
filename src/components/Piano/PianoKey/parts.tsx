import styled, { css } from "styled-components";
import { instrumentBRadius, instrumentElBRadius } from "@/parts";
import { transitionTime } from "@/data/constants";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

const pianoKeyShapes: Record<KeyShape, ReturnType<typeof css>> = {
  // prettier-ignore
  C: css`&::after {right: -70%;}`,
  // prettier-ignore
  D: css`&::after {left: -40%;right: -40%;}`,
  // prettier-ignore
  E: css`&::after {left: -70%;}`,
  // prettier-ignore
  F: css`&::after {right: -80%;}`,
  // prettier-ignore
  G: css`&::after {left: -30%; right: -55%;}`,
  // prettier-ignore
  A: css`&::after {left: -55%; right: -30%;}`,
  // prettier-ignore
  B: css`&::after {left: -80%;}`,
};

const commonStyleForKey = css`
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  will-change: box-shadow, border-color, filter;
  transition:
    box-shadow ${transitionTime}ms ease-in-out,
    filter ${transitionTime}ms ease-in-out,
    border-color ${transitionTime}ms ease-in-out;
`;

const whitePianoKey = css`
  z-index: 1;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: color-mix(in oklab, var(--accent) 25%, var(--background));
    ${commonStyleForKey}
  }
  &:not(:last-child)::after {
    border-right: none;
  }
  height: 125px;
  padding-top: 11px; //- 1px difference to compensate border of black key
`;

const blackPianoKey = css`
  background-color: var(--background);
  z-index: 2;
  ${commonStyleForKey}
  height: 75px;
  padding-top: 10px;
`;

export const Key = styled.div<{
  $isRoleSelected: boolean;
  $isShapeSelected: boolean;
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyShape;
  $isHighlighted?: boolean;
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isRoleNote: boolean;
}>`
  flex: 1;
  width: 0;
  position: relative;
  display: flex;
  justify-content: center;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(2)" : "")};

  ${({ $isWhitePianoKey }) => ($isWhitePianoKey ? whitePianoKey : blackPianoKey)}

  ${({ $pianoKeyShape }) => $pianoKeyShape && pianoKeyShapes[$pianoKeyShape]}

  ${({ $isShapeNote, $isHighlighted, $isWhitePianoKey, $isRoleNote, $isRoleSelected }) => {
    if (!$isHighlighted && !$isRoleSelected) return null;
    const color = $isShapeNote ? "var(--primary)" : "var(--accent)";

    const shadow = $isWhitePianoKey ? `inset 0 -23px 35px -4px ${color}` : `inset 0 -17px 20px 0px ${color}`;
    const target = $isWhitePianoKey ? css`&::after` : css`&`;

    return css`
      ${target} {
        ${$isRoleNote || !$isRoleSelected || $isShapeNote ? `box-shadow: ${shadow};` : ""}
      }
    `;
  }}

${({ $isWhitePianoKey }) => {
    const target = $isWhitePianoKey ? css`&::after` : css`&`;
    return css`
      ${target} {
        border: 1px solid var(--background);
      }
    `;
  }}

  &:first-child::after {
    border-radius: ${instrumentBRadius} 0 ${instrumentElBRadius} ${instrumentElBRadius};
  }
  &:last-child::after {
    border-radius: 0 ${instrumentBRadius} ${instrumentElBRadius} ${instrumentElBRadius};
  }
`;

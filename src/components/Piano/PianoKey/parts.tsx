import styled, { css } from "styled-components";
import { KeyAndFretStyles } from "@/components/BoardsWrapper/parts";
import { transitionTime } from "@/utils/constants";
import { roleColors, type HighlightRole } from "../../../utils/roleColors";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyProps {
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyShape;
  $isHighlighted?: boolean;
  $highlightRole: HighlightRole;
  $isActive: boolean;
  $areAnimationsOn: boolean;
}

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
  G: css`&::after {left: -30%;right: -55%;}`,
  // prettier-ignore
  A: css`&::after {left: -55%;right: -30%;}`,
  // prettier-ignore
  B: css`&::after {left: -80%;}`,
};

export const keyBRadius = "4px";
export const pianoBRadius = "var(--radius-lg)";

const commonStyleForKey = (areAnimationsOn: boolean) => css`
  ${KeyAndFretStyles}
  box-shadow: inset 0 0px 3px 0px var(--input);
  border-radius: 0 0 ${keyBRadius} ${keyBRadius};
  will-change: box-shadow, border-color;
  transition: ${areAnimationsOn
    ? `box-shadow ${transitionTime}ms ease-in-out, border-color ${transitionTime}ms ease-in-out`
    : "none"};
`;

const whitePianoKey = (areAnimationsOn: boolean) => css`
  height: 110px;
  z-index: 1;
  border-radius: 0 0 ${keyBRadius} ${keyBRadius};
  padding-top: 6px; //- 1px difference to compensate border of black key
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--card);
    ${commonStyleForKey(areAnimationsOn)}
  }
  &:not(:last-child)::after {
    border-right: none;
  }

  @media (min-width: 768px) {
    height: 120px;
    padding-top: 11px; //- 1px difference to compensate border of black key
  }
`;

const blackPianoKey = (areAnimationsOn: boolean) => css`
  background-color: var(--background);
  height: 67px;
  z-index: 2;
  padding-top: 5px;
  ${commonStyleForKey(areAnimationsOn)}

  @media (min-width: 768px) {
    height: 75px;
    padding-top: 10px;
  }
`;

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  filter: ${({ $isActive }) => ($isActive ? "brightness(1.5)" : "")};

  ${({ $isWhitePianoKey, $areAnimationsOn }) =>
    $isWhitePianoKey ? whitePianoKey($areAnimationsOn) : blackPianoKey($areAnimationsOn)}

  ${({ $pianoKeyShape }) => $pianoKeyShape && pianoKeyShapes[$pianoKeyShape]}
  
  ${({ $isHighlighted, $isWhitePianoKey, $highlightRole }) => {
    if (!$isHighlighted) return null;
    const color = roleColors[$highlightRole];

    const shadow = $isWhitePianoKey
      ? `inset 0 -23px 35px -4px ${color}`
      : `inset 0 -17px 20px 0px ${color}`;
    const target = $isWhitePianoKey ? css`&::after` : css`&`;

    return css`
      ${target} {
        border-color: ${color};
        box-shadow: ${shadow};
      }
    `;
  }}

  &:first-child::after {
    border-radius: ${pianoBRadius} 0 ${keyBRadius} ${keyBRadius};
  }
  &:last-child::after {
    border-radius: 0 ${pianoBRadius} ${keyBRadius} ${keyBRadius};
  }
`;

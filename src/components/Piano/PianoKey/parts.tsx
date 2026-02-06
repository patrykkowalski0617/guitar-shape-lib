import styled, { css } from "styled-components";
import { instrumentBRadius, instrumentElBRadius, PianoKeyAndFretStyles } from "@/parts";
import { transitionTime } from "@/utils/constants";
import { roleColors, type HighlightRole } from "../../../utils/roleColors";
import { NoteWrapper } from "@/components/NoteLabel/parts";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyProps {
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyShape;
  $isHighlighted?: boolean;
  $highlightRole: HighlightRole;
  $isActiveNote: boolean;
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

const commonStyleForKey = (areAnimationsOn: boolean) => css`
  ${PianoKeyAndFretStyles}
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  will-change: box-shadow, border-color;
  transition: ${areAnimationsOn
    ? `box-shadow ${transitionTime}ms ease-in-out, border-color ${transitionTime}ms ease-in-out`
    : "none"};
`;

const whitePianoKey = (areAnimationsOn: boolean) => css`
  height: 110px;
  z-index: 1;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  padding-top: 6px; //- 1px difference to compensate border of black key
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--background);
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
  display: flex;
  justify-content: center;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(1.5)" : "")};

  ${({ $isWhitePianoKey, $areAnimationsOn }) =>
    $isWhitePianoKey ? whitePianoKey($areAnimationsOn) : blackPianoKey($areAnimationsOn)}

  ${({ $pianoKeyShape }) => $pianoKeyShape && pianoKeyShapes[$pianoKeyShape]}
  
  ${({ $isHighlighted, $isWhitePianoKey, $highlightRole }) => {
    if (!$isHighlighted) return null;
    const color = roleColors[$highlightRole];

    const shadow = $isWhitePianoKey ? `inset 0 -23px 35px -4px ${color}` : `inset 0 -17px 20px 0px ${color}`;
    const target = $isWhitePianoKey ? css`&::after` : css`&`;

    return css`
      ${target} {
        border-color: ${color};
        box-shadow: ${shadow};
      }
    `;
  }}

  &:first-child::after {
    border-radius: ${instrumentBRadius} 0 ${instrumentElBRadius} ${instrumentElBRadius};
  }
  &:last-child::after {
    border-radius: 0 ${instrumentBRadius} ${instrumentElBRadius} ${instrumentElBRadius};
  }
  &:hover {
    ${NoteWrapper} {
      opacity: 1;
    }
  }
`;

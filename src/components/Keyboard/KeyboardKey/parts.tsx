import styled, { css } from "styled-components";
import { type HighlightRole, roleColors } from "../helpers/scaleLogic";
import { transitionStepTime } from "../helpers/constants";
import { KeyAndFretStyles } from "@/components/customUI/Boards/parts";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyProps {
  $isWhiteKey: boolean;
  $keyShape?: KeyShape;
  $isHighlighted?: boolean;
  $isHighlightRole: HighlightRole;
  $isActiveNote: boolean;
}

const keyShapes: Record<KeyShape, ReturnType<typeof css>> = {
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

const keyBorderRadius = "4px";

const commonStyleForKey = css`
  ${KeyAndFretStyles}
  border-radius: 0 0 ${keyBorderRadius} ${keyBorderRadius};
  transition: box-shadow ${transitionStepTime}ms ease-in-out,
    border-color ${transitionStepTime}ms ease-in-out;
`;

const whiteKey = css`
  height: 180px;
  z-index: 1;
  border-radius: 0 0 ${keyBorderRadius} ${keyBorderRadius};
  padding-top: 1px;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--card);
    ${commonStyleForKey}
  }
  &:not(:last-child)::after {
    border-right: none;
  }
`;

const blackKey = css`
  background-color: var(--background);
  height: 110px;
  z-index: 2;
  ${commonStyleForKey}
`;

const keyboardBorderRadius = "var(--radius-xl) ";

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  cursor: pointer;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(1.5)" : "")};

  ${({ $isWhiteKey }) => ($isWhiteKey ? whiteKey : blackKey)}

  ${({ $keyShape }) => $keyShape && keyShapes[$keyShape]}
  

  ${({ $isHighlighted, $isWhiteKey, $isHighlightRole }) => {
    const color = roleColors[$isHighlightRole];
    return (
      $isHighlighted &&
      ($isWhiteKey
        ? css`
            &::after {
              border-color: ${color};
              box-shadow: inset 0 -23px 35px -4px ${color};
              transition: box-shadow ${transitionStepTime}ms ease-in-out,
                border-color ${transitionStepTime}ms ease-in-out;
            }
          `
        : css`
            border-color: ${color};
            box-shadow: inset 0 -17px 20px 0px ${color};
            transition: box-shadow ${transitionStepTime}ms ease-in-out,
              border-color ${transitionStepTime}ms ease-in-out;
          `)
    );
  }}

  &:first-child::after {
    border-radius: ${keyboardBorderRadius} 0 ${keyBorderRadius} ${keyBorderRadius};
  }
  &:last-child::after {
    border-radius: 0 ${keyboardBorderRadius} ${keyBorderRadius} ${keyBorderRadius};
  }
`;

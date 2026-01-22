import styled, { css } from "styled-components";
import { KeyAndFretStyles } from "@/components/Boards/parts";
import { transitionTime } from "@/utils/constants";
import { roleColors, type HighlightRole } from "../../../utils/roleColors";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyProps {
  $isWhiteKey: boolean;
  $keyShape?: KeyShape;
  $isHighlighted?: boolean;
  $highlightRole: HighlightRole;
  $isActive: boolean;
  $areAnimationsOn: boolean;
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

const commonStyleForKey = (areAnimationsOn: boolean) => css`
  ${KeyAndFretStyles}
  box-shadow: inset 0 0px 3px 0px var(--input);
  border-radius: 0 0 ${keyBorderRadius} ${keyBorderRadius};
  transition: ${areAnimationsOn
    ? `box-shadow ${transitionTime}ms ease-in-out, border-color ${transitionTime}ms ease-in-out`
    : "none"};
`;

const whiteKey = (areAnimationsOn: boolean) => css`
  height: 80px;
  z-index: 1;
  border-radius: 0 0 ${keyBorderRadius} ${keyBorderRadius};
  padding-top: 1px; //- 1px difference to compensate border of black key
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
    height: 130px;
    padding-top: 11px; //- 1px difference to compensate border of black key
  }
`;

const blackKey = (areAnimationsOn: boolean) => css`
  background-color: var(--background);
  height: 45px;
  z-index: 2;
  padding-top: 0px;
  ${commonStyleForKey(areAnimationsOn)}

  @media (min-width: 768px) {
    height: 80px;
    padding-top: 10px;
  }
`;

const keyboardBorderRadius = "var(--radius-lg)";

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  cursor: pointer;
  filter: ${({ $isActive }) => ($isActive ? "brightness(1.5)" : "")};

  ${({ $isWhiteKey, $areAnimationsOn }) =>
    $isWhiteKey ? whiteKey($areAnimationsOn) : blackKey($areAnimationsOn)}

  ${({ $keyShape }) => $keyShape && keyShapes[$keyShape]}
  
  ${({ $isHighlighted, $isWhiteKey, $highlightRole, $areAnimationsOn }) => {
    const color = roleColors[$highlightRole];
    return (
      $isHighlighted &&
      ($isWhiteKey
        ? css`
            &::after {
              border-color: ${color};
              box-shadow: inset 0 -23px 35px -4px ${color};
              transition: ${$areAnimationsOn
                ? `box-shadow ${transitionTime}ms ease-in-out, border-color ${transitionTime}ms ease-in-out`
                : "none"};
            }
          `
        : css`
            border-color: ${color};
            box-shadow: inset 0 -17px 20px 0px ${color};
            transition: ${$areAnimationsOn
              ? `box-shadow ${transitionTime}ms ease-in-out, border-color ${transitionTime}ms ease-in-out`
              : "none"};
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

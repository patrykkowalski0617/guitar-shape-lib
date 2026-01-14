import styled, { css } from "styled-components";
import {
  KEY_PADDING,
  KEY_WIDTH_CSS,
  LEFT_PADDING_FACTOR,
  RIGHT_PADDING_FACTOR,
  transitionStepTime,
} from "./helpers/constants";
import { type HighlightMusicFuntion, musicFunctionColors } from "./helpers/scaleLogic";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyboardProps {
  $numberOfKeys: number;
}

interface KeyProps {
  $isWhiteKey: boolean;
  $keyShape?: KeyShape;
  $isHighlighted?: boolean;
  $isHighlightMusicFunction: HighlightMusicFuntion;
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

export const KeyboardWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
  padding: 0 2px 0 1px;
`;

export const Keyboard = styled.div<KeyboardProps>`
  display: flex;
  position: relative;
  padding-left: ${({ $numberOfKeys }) =>
    `calc(${KEY_WIDTH_CSS($numberOfKeys)} * ${KEY_PADDING} * ${LEFT_PADDING_FACTOR})`};
  padding-right: ${({ $numberOfKeys }) =>
    `calc(${KEY_WIDTH_CSS($numberOfKeys)} * ${KEY_PADDING} * ${RIGHT_PADDING_FACTOR})`};
`;

const keyBorderRadius = "4px";

const commonStyleForKey = css`
  border: 1px solid var(--border);
  border-radius: 0 0 ${keyBorderRadius} ${keyBorderRadius};
  box-shadow: inset 0 0px 3px 0px var(--input);
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
  ${({ $isWhiteKey }) => ($isWhiteKey ? whiteKey : blackKey)}

  ${({ $keyShape }) => $keyShape && keyShapes[$keyShape]}
  
  &:hover {
    filter: brightness(1.5);
  }

  ${({ $isHighlighted, $isWhiteKey, $isHighlightMusicFunction }) => {
    const color = musicFunctionColors[$isHighlightMusicFunction];
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

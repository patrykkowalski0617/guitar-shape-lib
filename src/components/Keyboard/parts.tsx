import styled, { css } from "styled-components";
import {
  KEY_PADDING,
  KEY_WIDTH_CSS,
  LEFT_PADDING_FACTOR,
  RIGHT_PADDING_FACTOR,
} from "./helpers/constants";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyboardProps {
  $numberOfKeys: number;
}

interface KeyProps {
  $isWhiteKey: boolean;
  $keyShape?: KeyShape;
  $isHighlighted?: boolean;
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

const whiteKey = css`
  height: 180px;
  z-index: 1;
  color: var(--secondary);
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: 0 0 5px 5px;
  }
  &:not(:last-child)::after {
    border-right: none;
  }
`;

const blackKey = css`
  background-color: var(--muted);
  border: 1px solid var(--border);
  height: 110px;
  z-index: 2;
  border-radius: 0 0 5px 5px;
  box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.05);
`;

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  ${({ $isWhiteKey }) => ($isWhiteKey ? whiteKey : blackKey)}
  ${({ $keyShape }) => $keyShape && keyShapes[$keyShape]}

  ${({ $isWhiteKey, $isHighlighted }) =>
    $isHighlighted &&
    ($isWhiteKey
      ? css`
          &::after {
            background: linear-gradient(to bottom, #eeeeee 0%, var(--accent) 100%);
          }
        `
      : css`
          background-color: var(--accent);
          border-color: var(--secondary);
          box-shadow: 0 0 5px var(--accent);
        `)}
`;

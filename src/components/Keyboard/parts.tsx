import styled, { css } from "styled-components";
import { KEY_PADDING, KEY_WIDTH_CSS, LEFT_PADDING_FACTOR, RIGHT_PADDING_FACTOR } from "./constants";

export type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyboardProps {
  $numberOfKeys: number;
}
interface KeyProps {
  $isWhiteKey: boolean;
  $keyShape?: KeyShape;
}

const keyShapes: Record<KeyShape, ReturnType<typeof css>> = {
  C: css`
    &::after {
      right: -66.6%;
    }
  `,
  D: css`
    &::after {
      left: -33.3%;
      right: -33.3%;
    }
  `,
  E: css`
    &::after {
      left: -66.6%;
    }
  `,
  F: css`
    &::after {
      right: -75%;
    }
  `,
  G: css`
    &::after {
      left: -25%;
      right: -50%;
    }
  `,
  A: css`
    &::after {
      left: -50%;
      right: -25%;
    }
  `,
  B: css`
    &::after {
      left: -75%;
    }
  `,
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
  color: black;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: white;
    border: 1px solid black;
    border-radius: 0 0 5px 5px;
  }
  &:not(:last-child)::after {
    border-right: none;
  }
`;

const blackKey = css`
  background-color: black;
  color: white;
  height: 110px;
  z-index: 2;
  border-radius: 0 0 5px 5px;
`;

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  ${({ $isWhiteKey }) => ($isWhiteKey ? whiteKey : blackKey)}
  ${({ $keyShape }) => $keyShape && keyShapes[$keyShape]}
`;

import styled, { css } from "styled-components";

type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

interface KeyboardProps {
  numberOfKeys: number;
}

interface KeyProps {
  isWhiteKey: boolean;
  keyShape?: KeyShape;
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

export const Keyboard = styled.div<KeyboardProps>`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  max-width: 900px;
  position: relative;
  padding-right: ${({ numberOfKeys }) => `calc(100% / ${numberOfKeys} / 2)`};
  padding-top: 50px;
`;

const whiteKey = css`
  height: 150px;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    left: 1px;
    right: 1px;
    height: 15px;
    background-color: red;
    top: -17px;
    border-radius: 5px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid black;
    border-radius: 0 0 5px 5px;
  }
  &:not(:last-child)::after {
    border-right: none;
  }
`;

const blackKey = css`
  border-radius: 0 0 5px 5px;
  background-color: black;
  height: 90px;
  z-index: 2;
  color: white;
`;

export const Key = styled.div<KeyProps>`
  flex: 1;
  width: 0;
  position: relative;
  box-sizing: border-box;
  ${({ isWhiteKey }) => (isWhiteKey ? whiteKey : blackKey)}
  ${({ keyShape }) => keyShape && keyShapes[keyShape]}
`;

export const NoteLabel = styled.span`
  z-index: 50;
  position: relative;
  font-size: 12px;
`;

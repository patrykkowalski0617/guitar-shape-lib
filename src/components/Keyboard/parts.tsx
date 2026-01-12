import styled, { css } from "styled-components";

type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

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
  max-width: 700px;
  margin: auto;
  /* position: relative;
  padding-top: 20px; */
`;

export const Keyboard = styled.div<KeyboardProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: ${({ $numberOfKeys }) => `calc(100% / (${$numberOfKeys} + 0.75) * 0.75)`};
`;

const whiteKey = css`
  height: 150px;
  z-index: 1;
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
  ${({ $isWhiteKey }) => ($isWhiteKey ? whiteKey : blackKey)}
  ${({ $keyShape }) => $keyShape && keyShapes[$keyShape]}
`;

export const NoteLabel = styled.span`
  z-index: 50;
  position: relative;
  font-size: 12px;
`;

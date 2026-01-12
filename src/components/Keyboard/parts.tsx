import styled, { css } from "styled-components";

export const Keyboard = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  max-width: 900px;
  position: relative;
  padding-right: ${({ numberOfKeys }) => `calc(100% / ${numberOfKeys} / 2)`};
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

const CShape = css`
  &::after {
    right: -67%;
  }
`;

const DShape = css`
  &::after {
    left: -33%;
    right: -33%;
  }
`;
const EShape = css`
  &::after {
    left: -67%;
  }
`;

const AShape = css`
  &::after {
    left: -50%;
    right: -22%;
  }
`;
const GShape = css`
  &::after {
    left: -22%;
    right: -50%;
  }
`;

const FShape = css`
  &::after {
    right: -78%;
  }
`;

const BShape = css`
  &::after {
    left: -78%;
  }
`;

export const Key = styled.div`
  flex: 1;
  width: 0;
  position: relative;
  box-sizing: border-box;
  ${({ isWhiteKey }) => (isWhiteKey ? whiteKey : blackKey)}
  ${({ isCKeyShape }) => isCKeyShape && CShape}
  ${({ isDKeyShape }) => isDKeyShape && DShape}
  ${({ isEKeyShape }) => isEKeyShape && EShape}
  ${({ isFKeyShape }) => isFKeyShape && FShape}
  ${({ isGKeyShape }) => isGKeyShape && GShape}
  ${({ isAKeyShape }) => isAKeyShape && AShape}
  ${({ isBKeyShape }) => isBKeyShape && BShape}
`;

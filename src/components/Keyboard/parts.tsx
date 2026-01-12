import styled, { css } from "styled-components";

export const Keyboard = styled.div`
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
    height: 20px;
    background-color: red;
    top: -20px;
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

const CShape = css`
  &::after {
    right: -66.6%;
  }
`;

const DShape = css`
  &::after {
    left: -33.3%;
    right: -33.3%;
  }
`;

const EShape = css`
  &::after {
    left: -66.6%;
  }
`;

const FShape = css`
  &::after {
    right: -75%;
  }
`;

const GShape = css`
  &::after {
    left: -25%;
    right: -50%;
  }
`;

const AShape = css`
  &::after {
    left: -50%;
    right: -25%;
  }
`;

const BShape = css`
  &::after {
    left: -75%;
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

import styled, { css } from "styled-components";

export const Keyboard = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  max-width: 700px;
`;

const whiteKey = css`
  background-color: white;
  height: 150px;
`;
const blackKey = css`
  background-color: black;
  height: 90px;
  color: white;
  position: relative;
  z-index: 1;
`;

const leftShape = css`
  background-color: red;
  // musi być o połowę szerokości szerszy po prawej
`;
const midleShape = css`
  background-color: green;
  // musi być o połowę szerokości szerszy po prawej i lewej
`;
const rightShape = css`
  background-color: yellow;
  // musi być o połowę szerokości szerszy po lewej
`;

export const Key = styled.div`
  width: calc(100% / 24);
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
  ${({ isWhiteKey }) => (isWhiteKey ? whiteKey : blackKey)}
  ${({ isLeftShape }) => (isLeftShape ? leftShape : "")}
  ${({ isMidleShape }) => (isMidleShape ? midleShape : "")}
  ${({ isRightShape }) => (isRightShape ? rightShape : "")}
`;

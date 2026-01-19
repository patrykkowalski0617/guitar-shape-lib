import styled, { keyframes } from "styled-components";

export const HeaderWrapper = styled.header`
  background-color: var(--primary);
  max-width: 1300px;
  margin: 0 auto;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  width: 100%;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px 0;
  margin: auto;
  width: 100%;
`;

const shakeIt = keyframes`
  0%   { transform: rotate(-1deg) translate(0, -2px); }
  10%  { transform: rotate(1deg)  translate(-5px, -5px); }
  20%  { transform: rotate(-1deg) translate(5px, 3px); }
  30%  { transform: rotate(0deg)  translate(-8px, 2px); }
  40%  { transform: rotate(1deg)  translate(8px, -4px); }
  50%  { transform: rotate(-1deg) translate(-10px, 6px); }
  60%  { transform: rotate(1deg)  translate(10px, -6px); }
  70%  { transform: rotate(-1deg) translate(-7px, -3px); }
  80%  { transform: rotate(1deg)  translate(7px, 4px); }
  90%  { transform: rotate(-1deg) translate(-4px, 8px); }
  100% { transform: rotate(-1deg) translate(0, -2px); }
`;

export const TitleWrapper = styled.div`
  color: var(--foreground);
  transform: rotate(-2deg) translateY(-2px);
  margin: 0 40px;
  &:hover {
    animation: ${shakeIt} 0.15s linear forwards 3;
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  text-align: center;
  display: inline;
`;

export const Subtitle = styled.p`
  text-align: right;
  font-size: 14px;
  line-height: 0.5;
  font-weight: bold;
`;

export const HeaderSide = styled.div`
  right: 10px;
  position: absolute;
`;

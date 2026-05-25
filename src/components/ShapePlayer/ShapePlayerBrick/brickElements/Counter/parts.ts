import styled, { css } from "styled-components";

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 30px;
  gap: 4px;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  box-sizing: border-box;
`;

export const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(197, 48, 28, 0.6);
  font-size: 14px;
  cursor: pointer;
  padding: 0 2px;
  height: 100%;
  transition: color 0.2s;

  &:hover:not(:disabled) {
    color: #ffe0c8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const BeatsContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  gap: 4px;
`;

interface BeatIndicatorProps {
  $isActive: boolean;
}

export const BeatIndicator = styled.div<BeatIndicatorProps>`
  flex: 1;
  height: 100%;
  border-radius: 2px;
  background-color: rgba(30, 10, 5, 0.6);
  border: 1px solid rgba(197, 48, 28, 0.1);
  box-shadow:
    0px 0px 0px rgba(220, 74, 55, 0),
    0px 0px 0px rgba(195, 55, 35, 0);
  transition:
    box-shadow 0.3s ease-out,
    border 4s ease-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transition: none;
      background-color: #ffe0c8;
      border: 1px solid #c5301c;
      box-shadow:
        0px 0px 16px rgb(234, 69, 44),
        0px 0px 30px rgba(200, 48, 28, 0.4);
    `}
`;
